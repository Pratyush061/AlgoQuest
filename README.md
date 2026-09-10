# AlgoQuest

A gamified Data Structures and Algorithms learning platform that helps students practice DSA problems with an AI-powered chat assistant, streak tracking, and a clean, mobile-friendly interface. Built with React, TypeScript, Firebase, and Google Gemini AI, and packaged as an Android app using Capacitor.

## Features

- **AI Chat Assistant** — powered by Google Gemini, the assistant provides hints, explanations, and step-by-step guidance for DSA problems without giving away the full solution.
- **Question batches** — curated problem sets organized by topic and difficulty, presented in an interactive card-based UI.
- **Streak tracking** — a visual streak tree motivates consistent daily practice by tracking consecutive days of problem-solving.
- **Authentication** — Firebase Authentication with secure user sign-up and login.
- **Data persistence** — Firestore stores user progress, streaks, and chat history in real time.
- **Cross-platform** — deployed as a web app on Vercel and packaged as a native Android app via Capacitor.

## Tech stack

| Component | Technology |
|---|---|
| Frontend | React + TypeScript + Vite |
| AI assistant | Google Gemini API |
| Backend / Auth / DB | Firebase (Auth, Firestore, Storage) |
| Mobile packaging | Capacitor (Android) |
| Deployment | Vercel (web), Android (APK) |

## Project structure

```
AlgoQuest/
├── App.tsx                    # Main application component
├── components/
│   ├── ChatAssistant.tsx      # Gemini-powered AI chat interface
│   ├── QuestionBatch.tsx      # Problem set cards and navigation
│   ├── StreakTree.tsx         # Visual streak tracker
│   ├── Layout.tsx             # Page layout wrapper
│   └── ErrorBoundary.tsx      # Error handling
├── services/
│   ├── authService.ts         # Firebase authentication logic
│   └── geminiService.ts       # Google Gemini API integration
├── constants.ts               # Problem data and app constants
├── types.ts                   # TypeScript type definitions
├── firestore.rules            # Firestore security rules
├── capacitor.config.ts        # Capacitor (Android) configuration
├── android/                   # Native Android project (Capacitor)
├── vercel.json                # Vercel deployment config
└── vite.config.ts             # Vite build configuration
```

## Quick start

### Prerequisites

- Node.js 18+ and npm
- A Firebase project with Authentication and Firestore enabled
- A Google Gemini API key

### Local development

```bash
# Clone the repository
git clone https://github.com/Pratyush061/AlgoQuest.git
cd AlgoQuest

# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

### Environment variables

Set the following in your Vercel project settings (or `.env` for local dev). Values can be found in your `firebase-applet-config.json`:

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_FIREBASE_DATABASE_ID` | Firestore database ID (usually `(default)`) |
| `VITE_GEMINI_API_KEY` | Google Gemini API key |

### Deploying to Vercel

1. Create a free account at [Vercel.com](https://vercel.com) and connect it to your GitHub account.
2. Click **Add New Project** and import this repository.
3. Vercel will automatically detect this as a **Vite/React** project.
4. Expand the **Environment Variables** section and add the variables listed above.
5. Click **Deploy**. A `vercel.json` file is included for SPA routing.

### Building the Android app

```bash
# Build the web assets
npm run build

# Sync with Capacitor
npx cap sync

# Open in Android Studio
npx cap open android
```

## Firestore security rules

The included `firestore.rules` file defines access control — authenticated users can read/write their own data, and question sets are readable by all authenticated users.
