# AlgoQuest

Gamified Data Structures and Algorithms learning platform.

## Pushing to GitHub

1. In the AI Studio editor, click the **Project Menu** (three dots) in the top-left or use the Export option.
2. Select **Export to GitHub**.
3. Authenticate with your GitHub account if you haven't already.
4. Choose a repository name (e.g., `algoquest-dsa`) and decide whether it should be public or private.
5. Click **Push to GitHub**.

## Deploying to Vercel

1. Create a free account at [Vercel.com](https://vercel.com/) and connect it to your GitHub account.
2. Click **Add New Project** and import the repository you just created.
3. Vercel will automatically detect that this is a **Vite/React** project. 
4. **Environment Variables:** Before clicking deploy, expand the **Environment Variables** section and add the following variables. (You can find these values inside your local `firebase-applet-config.json`):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_DATABASE_ID` (usually `(default)` unless specified otherwise)
   - `VITE_GEMINI_API_KEY`: (If you are using Gemini directly from the client. **Note:** AI Studio passes it as `GEMINI_API_KEY` to Vite, but for client-side Vercel deployments, ensure it's handled securely or you use the VITE_ prefix as configured).
5. Click **Deploy**. Vercel will build and publish your app.
6. A `vercel.json` file is already included in this repository to handle Single Page Application (SPA) routing, so direct links to different pages will work flawlessly.

## Local Development

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```
