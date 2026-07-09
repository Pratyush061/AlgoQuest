
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc,
  collection,
  getDocFromServer
} from "firebase/firestore";
import { User, UserProgress, TreeType } from '../types';

const getFirebaseConfig = () => {
  const configs = import.meta.glob('../firebase-applet-config.json', { eager: true });
  const localConfig = configs['../firebase-applet-config.json'];
  
  if (localConfig) {
    return (localConfig as any).default;
  }
  
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || "(default)"
  };
};

const firebaseConfig = getFirebaseConfig();

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo: auth?.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

let app: any = null;
let auth: any = null;
let db: any = null;

try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  } else {
    console.error("⚠️ Firebase configuration missing: Please set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID environment variables.");
  }
} catch (e) {
  console.error("Firebase initialization failed:", e);
}

const TREE_TYPES: TreeType[] = ['Mango', 'Orange', 'Banana', 'Apple'];

const getFriendlyErrorMessage = (error: any): string => {
  const code = error?.code || '';
  switch (code) {
    case 'auth/invalid-credential':
      return "Hmm, we couldn't find an account with those details. Try again or tap 'Sign Up' below to create a new one!";
    case 'auth/user-not-found':
      return "No account exists for this email. Would you like to create one?";
    case 'auth/wrong-password':
      return "Incorrect password. Please try again or reset it.";
    case 'auth/email-already-in-use':
      return "This email is already registered! Try logging in instead.";
    case 'auth/weak-password':
      return "Password should be at least 6 characters long.";
    case 'auth/invalid-email':
      return "Please enter a valid email address.";
    case 'auth/network-request-failed':
      return "Connectivity issue. Please check your internet connection.";
    default:
      return "Something went wrong. Please try again or check your details.";
  }
};

export const authService = {
  async signUp(email: string, password: string): Promise<{ success: boolean, error?: string }> {
    try {
      if (!auth) throw new Error("Firebase Auth not initialized. Please check your environment variables.");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const initialProgress: UserProgress = {
        userId: firebaseUser.uid,
        solvedQuestionIds: [],
        totalXP: 0,
        spentXP: 0,
        level: 1,
        streak: 1,
        bonusGrowth: 0,
        fertilizerInventory: {},
        lastLoginDate: new Date().toISOString(),
        preferredLanguage: 'TypeScript',
        badges: [],
        topicScores: {},
        reviewList: [],
        dailyXP: {},
        treeType: TREE_TYPES[Math.floor(Math.random() * TREE_TYPES.length)],
        solutions: {}
      };

      await setDoc(doc(db, "users", firebaseUser.uid), initialProgress);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: getFriendlyErrorMessage(error) };
    }
  },

  async login(email: string, password: string): Promise<{ success: boolean, user?: User, error?: string }> {
    try {
      if (!auth) throw new Error("Firebase Auth not initialized. Please check your environment variables.");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      return { 
        success: true, 
        user: { email: firebaseUser.email || '', id: firebaseUser.uid } 
      };
    } catch (error: any) {
      return { success: false, error: getFriendlyErrorMessage(error) };
    }
  },

  async logout() {
    if (auth) {
      await signOut(auth);
    }
  },

  onAuthChange(callback: (user: User | null) => void) {
    if (!auth) {
      callback(null);
      return () => {};
    }
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        callback({ email: firebaseUser.email || '', id: firebaseUser.uid });
      } else {
        callback(null);
      }
    });
  },

  async getUserProgress(userId: string): Promise<UserProgress | null> {
    if (!db) return null;
    const path = `users/${userId}`;
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProgress;
        if (!data.treeType) {
          data.treeType = TREE_TYPES[Math.floor(Math.random() * TREE_TYPES.length)];
        }
        if (data.spentXP === undefined) data.spentXP = 0;
        if (data.bonusGrowth === undefined) data.bonusGrowth = 0;
        if (data.fertilizerInventory === undefined) data.fertilizerInventory = {};
        if (data.solutions === undefined) data.solutions = {};
        return data;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  },

  async saveUserProgress(userId: string, progress: UserProgress) {
    if (!db) return;
    const path = `users/${userId}`;
    try {
      await setDoc(doc(db, "users", userId), progress, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }
};
