
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "Something went wrong.";
      try {
        const errorInfo = JSON.parse(this.state.error?.message || '{}');
        if (errorInfo.error === "Missing or insufficient permissions.") {
          errorMessage = "You don't have permission to access this data. Please make sure you are logged in correctly.";
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-2xl border border-red-100 dark:border-red-900/30">
            <div className="text-5xl mb-6">⚠️</div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-4">Application Error</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
              {errorMessage}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-700 transition-all"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
