
import React from 'react';
import { UserProgress } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: UserProgress;
  onToggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onToggleTheme }) => {
  const xpBalance = user.totalXP - (user.spentXP || 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 px-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg rotate-3">
            AQ
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">AlgoQuest</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full border border-orange-200 dark:border-orange-800">
              <span>🔥</span> {user.streak}d Streak
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full border border-indigo-200 dark:border-indigo-800">
              <span>✨</span> {xpBalance} XP
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
              <span>🏆</span> Level {user.level}
            </div>
          </div>
          
          <button 
            onClick={onToggleTheme}
            className="p-2 w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-lg"
            aria-label="Toggle dark mode"
          >
            <span className="dark:hidden">🌙</span>
            <span className="hidden dark:inline">☀️</span>
          </button>
          
          <div className="w-10 h-10 rounded-full bg-indigo-500 border-2 border-white dark:border-slate-700 shadow-md flex items-center justify-center text-white font-semibold">
            {user.userId.substring(0, 2).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 text-sm">
        <p>© 2024 AlgoQuest - Gamified DSA Preparation</p>
      </footer>
    </div>
  );
};

export default Layout;
