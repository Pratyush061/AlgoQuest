
import React, { useState, useEffect, useMemo } from 'react';
import { UserProgress, User, Difficulty, TopicStatus } from './types';
import { TOPICS, QUESTIONS, BADGES, XP_PER_QUESTION } from './constants';
import Layout from './components/Layout';
import QuestionBatch from './components/QuestionBatch';
import ChatAssistant from './components/ChatAssistant';
import StreakTree from './components/StreakTree';
import { authService } from './services/authService';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const UNLOCK_THRESHOLD = 7;

const STORE_ITEMS = [
  { id: 'f1', name: 'Nitrogen Shot', description: 'Small growth kick', cost: 500, boost: 10, icon: '🧪' },
  { id: 'f2', name: 'Super Compost', description: 'Advanced nutrition', cost: 1500, boost: 35, icon: '💩' },
  { id: 'f3', name: 'Golden Elixir', description: 'Legendary serum', cost: 4000, boost: 100, icon: '🏺' },
  { id: 'f4', name: 'Mythic Ambrosia', description: 'Ultimate growth catalyst', cost: 6500, boost: 150, icon: '🌟' },
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0]);
  const [view, setView] = useState<'dashboard' | 'learning' | 'badges' | 'store'>('dashboard');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('algoquest_theme') as 'light' | 'dark') || 'light';
  });
  
  // Auth Form State
  const [isSignUp, setIsSignUp] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    setIsMounted(true);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('algoquest_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const getISTDateString = (dateInput: string | Date) => {
    const d = new Date(dateInput);
    const istTime = new Date(d.getTime() + (5.5 * 60 * 60 * 1000));
    return istTime.toISOString().split('T')[0];
  };

  useEffect(() => {
    const unsubscribe = authService.onAuthChange(async (activeUser) => {
      if (activeUser) {
        setCurrentUser(activeUser);
        const progress = await authService.getUserProgress(activeUser.id);
        if (progress) {
          handleStreakLogic(progress);
        }
      } else {
        setCurrentUser(null);
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser && user) {
      authService.saveUserProgress(currentUser.id, user);
    }
  }, [user, currentUser]);

  const handleStreakLogic = (parsed: UserProgress) => {
    const now = new Date();
    const todayIST = getISTDateString(now);
    const lastIST = getISTDateString(parsed.lastLoginDate);

    if (todayIST !== lastIST) {
      const lastDateObj = new Date(lastIST);
      const todayDateObj = new Date(todayIST);
      const diffTime = todayDateObj.getTime() - lastDateObj.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        parsed.streak += 1;
      } else if (diffDays > 1) {
        parsed.streak = 1;
      }
      parsed.lastLoginDate = now.toISOString();
    }
    setUser(parsed);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    
    if (isSignUp) {
      const res = await authService.signUp(authEmail, authPass);
      if (!res.success) {
        setAuthError(res.error || 'Failed to sign up');
        setLoading(false);
      }
    } else {
      const res = await authService.login(authEmail, authPass);
      if (!res.success) {
        setAuthError(res.error || 'Failed to login');
        setLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    await authService.logout();
  };

  const handleComplete = (id: string, time: number) => {
    const q = QUESTIONS.find(q => q.id === id);
    if (!q || !user) return;

    setUser(prev => {
      if (!prev) return null;
      const xpGain = XP_PER_QUESTION[q.difficulty];
      const newXP = prev.totalXP + xpGain;
      const newLevel = Math.floor(newXP / 1000) + 1;
      const todayIST = getISTDateString(new Date());
      
      const updatedDailyXP = { ...prev.dailyXP };
      updatedDailyXP[todayIST] = (updatedDailyXP[todayIST] || 0) + xpGain;

      if (newLevel > prev.level) {
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }

      const newSolved = prev.solvedQuestionIds.includes(id) 
        ? prev.solvedQuestionIds 
        : [...prev.solvedQuestionIds, id];

      let newBadges = [...prev.badges];
      if (newSolved.length === 1 && !newBadges.some(b => b.id === 'b1')) {
        newBadges.push(BADGES[0]);
      }
      
      return {
        ...prev,
        totalXP: newXP,
        level: newLevel,
        solvedQuestionIds: newSolved,
        badges: newBadges,
        dailyXP: updatedDailyXP,
        lastLoginDate: new Date().toISOString()
      };
    });
  };

  const handleUndone = (id: string) => {
    const q = QUESTIONS.find(q => q.id === id);
    if (!q || !user) return;

    setUser(prev => {
      if (!prev) return null;
      const xpLoss = XP_PER_QUESTION[q.difficulty];
      const newXP = Math.max(0, prev.totalXP - xpLoss);
      const newLevel = Math.floor(newXP / 1000) + 1;
      const todayIST = getISTDateString(new Date());
      
      const updatedDailyXP = { ...prev.dailyXP };
      if (updatedDailyXP[todayIST]) {
        updatedDailyXP[todayIST] = Math.max(0, updatedDailyXP[todayIST] - xpLoss);
      }

      const newSolved = prev.solvedQuestionIds.filter(sid => sid !== id);
      
      return {
        ...prev,
        totalXP: newXP,
        level: newLevel,
        solvedQuestionIds: newSolved,
        dailyXP: updatedDailyXP
      };
    });
  };

  const handleSaveSolution = (id: string, approach: 'brute' | 'better' | 'optimal', text: string) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      const newSolutions = { ...prev.solutions };
      const currentQ = newSolutions[id] || {};
      newSolutions[id] = { ...currentQ, [approach]: text };
      return { ...prev, solutions: newSolutions };
    });
  };

  const handlePurchaseItem = (item: typeof STORE_ITEMS[0]) => {
    if (!user) return;
    const currentBalance = user.totalXP - (user.spentXP || 0);
    if (currentBalance < item.cost) {
      alert("You need more Available XP to buy this fertilizer!");
      return;
    }

    setUser(prev => {
      if (!prev) return null;
      const newInventory = { ...prev.fertilizerInventory };
      newInventory[item.id] = (newInventory[item.id] || 0) + 1;
      
      return {
        ...prev,
        spentXP: (prev.spentXP || 0) + item.cost,
        fertilizerInventory: newInventory
      };
    });
  };

  const handleUseItem = (itemId: string) => {
    if (!user) return;
    const item = STORE_ITEMS.find(i => i.id === itemId);
    if (!item || (user.fertilizerInventory?.[itemId] || 0) <= 0) return;

    setUser(prev => {
      if (!prev) return null;
      const newInventory = { ...prev.fertilizerInventory };
      newInventory[itemId] = (newInventory[itemId] || 0) - 1;

      return {
        ...prev,
        fertilizerInventory: newInventory,
        bonusGrowth: (prev.bonusGrowth || 0) + item.boost
      };
    });
  };

  const chartData = useMemo(() => {
    if (!user) return [];
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const istDate = getISTDateString(date);
      data.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        xp: user.dailyXP?.[istDate] || 0
      });
    }
    return data;
  }, [user?.dailyXP]);

  const solvedCount = user ? QUESTIONS.filter(q => q.topic === selectedTopic && user.solvedQuestionIds.includes(q.id)).length : 0;
  const totalInTopic = QUESTIONS.filter(q => q.topic === selectedTopic).length;

  const visibleQuestions = useMemo(() => {
    if (!user) return [];
    const topicQuestions = QUESTIONS.filter(q => q.topic === selectedTopic);
    let batchesToShow = 1;
    
    const totalPossibleBatches = Math.ceil(topicQuestions.length / 3);
    
    for (let i = 0; i < totalPossibleBatches; i++) {
      const start = i * 3;
      const batch = topicQuestions.slice(start, start + 3);
      if (batch.length === 0) break;
      
      const isBatchComplete = batch.every(q => user.solvedQuestionIds.includes(q.id));
      
      if (isBatchComplete) {
        batchesToShow = i + 2;
      } else {
        batchesToShow = Math.max(batchesToShow, i + 1);
        break;
      }
    }
    
    const limit = Math.min(batchesToShow * 3, topicQuestions.length);
    return topicQuestions.slice(0, limit);
  }, [selectedTopic, user?.solvedQuestionIds]);

  if (loading && !currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-bold text-indigo-400">Loading AlgoQuest...</p>
      </div>
    );
  }

  if (!currentUser || !user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
        
        <div className="max-w-md w-full bg-white dark:bg-slate-800/95 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl text-center z-10 border border-white/20 dark:border-slate-700/50">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-4xl shadow-xl rotate-6 font-black ring-8 ring-indigo-50 dark:ring-slate-700">AQ</div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2">{isSignUp ? 'Join AlgoQuest' : 'Welcome Back'}</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm px-4">Your DSA progress is saved securely via Firebase. Log in to continue your journey.</p>
          
          <form onSubmit={handleAuth} className="space-y-4 text-left">
            <div>
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" required
                value={authEmail} onChange={e => setAuthEmail(e.target.value)}
                className="w-full mt-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700 dark:text-slate-200"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <input 
                type="password" required
                value={authPass} onChange={e => setAuthPass(e.target.value)}
                className="w-full mt-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700 dark:text-slate-200"
                placeholder="••••••••"
              />
            </div>
            {authError && <div className="text-xs text-red-500 font-bold bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30">{authError}</div>}
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none mt-2 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Create Account ➔' : 'Sign In ➔')}
            </button>
          </form>

          <button 
            onClick={() => { setIsSignUp(!isSignUp); setAuthError(''); }}
            className="mt-6 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
          
          <button 
            onClick={toggleTheme} 
            className="mt-4 p-2 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 mx-auto flex items-center justify-center transition-colors"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    );
  }

  const isTopicFinished = user.solvedQuestionIds.filter(id => QUESTIONS.find(q => q.id === id)?.topic === selectedTopic).length === totalInTopic;
  const xpBalance = user.totalXP - (user.spentXP || 0);
  const totalGrowthLevel = user.streak + (user.bonusGrowth || 0);

  return (
    <Layout user={user} onToggleTheme={toggleTheme}>
      {showLevelUp && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-indigo-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-black animate-bounce border-4 border-white dark:border-slate-800">
          ✨ LEVEL UP: YOU ARE NOW LEVEL {user.level}! ✨
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 space-y-2">
          <div className="mb-6 p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
             <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Logged in as</div>
             <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 truncate mb-3">{currentUser.email}</div>
             <button onClick={handleLogout} className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase transition-colors">Logout</button>
          </div>

          <button 
            onClick={() => setView('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3 ${view === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            📊 Performance
          </button>
          <button 
            onClick={() => setView('learning')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3 ${view === 'learning' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            🗺️ Mastery Roadmap
          </button>
          <button 
            onClick={() => setView('store')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3 ${view === 'store' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            🏪 Growth Store
          </button>
          
          <div className="pt-8 px-4">
            <h4 className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-widest mb-4">Topic Unlocks ({UNLOCK_THRESHOLD} req.)</h4>
            <div className="space-y-4">
              {TOPICS.map(topic => {
                const topicIndex = TOPICS.indexOf(topic);
                const prevTopic = TOPICS[topicIndex - 1];
                const prevSolved = prevTopic ? user.solvedQuestionIds.filter(id => QUESTIONS.find(q => q.id === id)?.topic === prevTopic).length : 0;
                const locked = topicIndex > 0 && prevSolved < UNLOCK_THRESHOLD;
                
                const count = QUESTIONS.filter(q => q.topic === topic).length;
                const solved = user.solvedQuestionIds.filter(id => QUESTIONS.find(q => q.id === id)?.topic === topic).length;
                const percent = count > 0 ? (solved / count) * 100 : 0;
                
                return (
                  <div 
                    key={topic} 
                    onClick={() => { if(!locked) { setSelectedTopic(topic); setView('learning'); } }} 
                    className={`group relative ${locked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                  >
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className={`flex items-center gap-1 ${selectedTopic === topic && !locked ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'}`}>
                        {locked ? '🔒' : '🔓'} {topic}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500">{solved}/{count}</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 transition-all" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9">
          {view === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                <div className="md:col-span-8 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/10 rounded-bl-full -mr-8 -mt-8 -z-1"></div>
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Daily Progress 🎯</h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-8">Purchase <b>Growth Items</b> with XP to evolve your tree visuals separately from your streak.</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 text-center">
                      <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{user.solvedQuestionIds.length}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide font-bold">Total Solved</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 text-center">
                      <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{user.level}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide font-bold">Rank Level</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 text-center">
                      <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{xpBalance}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide font-bold">Available XP</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 text-center">
                      <div className="text-3xl font-black text-orange-500">{user.streak}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide font-bold">Real Streak</div>
                    </div>
                  </div>

                  {Object.keys(user.fertilizerInventory || {}).some(k => (user.fertilizerInventory?.[k] || 0) > 0) && (
                    <div className="mt-8">
                       <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Storage Pouch 🎒</h4>
                       <div className="flex flex-wrap gap-4">
                          {STORE_ITEMS.map(item => {
                            const count = user.fertilizerInventory?.[item.id] || 0;
                            if (count <= 0) return null;
                            return (
                              <button 
                                key={item.id}
                                onClick={() => handleUseItem(item.id)}
                                className="flex items-center gap-3 bg-white dark:bg-slate-800 p-2 pr-4 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-indigo-500 transition-all group"
                              >
                                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                                  {item.icon}
                                </div>
                                <div className="text-left">
                                  <div className="text-[10px] font-black text-slate-800 dark:text-slate-200 leading-none">{item.name}</div>
                                  <div className="text-[9px] font-bold text-indigo-500 uppercase mt-0.5">Apply x{count} (+{item.boost} Growth)</div>
                                </div>
                              </button>
                            );
                          })}
                       </div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-4">
                  <StreakTree realStreak={user.streak} visualGrowth={totalGrowthLevel} type={user.treeType} />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-6 flex items-center justify-between px-2">
                  Weekly Mastery Gain
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal uppercase tracking-widest">Last 7 Days (IST)</span>
                </h3>
                <div className="w-full h-[300px] relative overflow-hidden" style={{ minHeight: '300px' }}>
                  {isMounted && (
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={200}>
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: theme === 'dark' ? '#64748b' : '#94a3b8', fontWeight: '600'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: theme === 'dark' ? '#64748b' : '#94a3b8'}} />
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold', backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }} cursor={{ stroke: '#4f46e5', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Area type="monotone" dataKey="xp" stroke="#4f46e5" strokeWidth={4} fill="url(#colorXp)" animationDuration={1500} activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          )}

          {view === 'learning' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase font-bold text-indigo-500 dark:text-indigo-400 tracking-widest mb-1 flex items-center gap-2">
                    Step-by-Step Training 
                    <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded text-[8px]">ACTIVE TOPIC</span>
                  </div>
                  <h2 className="text-4xl font-black text-slate-800 dark:text-white">{selectedTopic}</h2>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-6 shadow-sm">
                  <div className="text-center">
                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Solved</div>
                    <div className="text-xl font-black text-slate-800 dark:text-white">{solvedCount}/{totalInTopic}</div>
                  </div>
                  <div className="w-[1px] h-10 bg-slate-100 dark:bg-slate-800"></div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Next Unlock</div>
                    <div className="text-xl font-black text-indigo-600 dark:text-indigo-400">{Math.max(0, UNLOCK_THRESHOLD - solvedCount)} left</div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                 <div className="bg-indigo-600/5 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800 rounded-3xl p-8 relative overflow-hidden">
                    <QuestionBatch 
                      questions={visibleQuestions} 
                      user={user} 
                      onComplete={handleComplete} 
                      onUndone={handleUndone}
                      onSaveSolution={handleSaveSolution}
                      onMarkReview={(id) => setUser(prev => prev ? ({ ...prev, reviewList: prev.reviewList.includes(id) ? prev.reviewList.filter(rid => rid !== id) : [...prev.reviewList, id] }) : null)} 
                    />
                 </div>
              </div>
              {isTopicFinished && (
                <div className="bg-green-50 dark:bg-green-900/10 border-2 border-green-200 dark:border-green-800 rounded-3xl p-16 text-center space-y-6 animate-in zoom-in-95 duration-500">
                  <div className="text-7xl">🏔️</div>
                  <h3 className="text-3xl font-black text-green-800 dark:text-green-400">Topic Fully Mastered!</h3>
                </div>
              )}
            </div>
          )}

          {view === 'store' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[10px] uppercase font-bold text-indigo-500 dark:text-indigo-400 tracking-widest mb-1">XP Marketplace</div>
                  <h2 className="text-4xl font-black text-slate-800 dark:text-white">Growth Store 🏪</h2>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900/40 px-6 py-3 rounded-2xl shadow-sm text-indigo-600 dark:text-indigo-300 font-black text-xl flex items-center gap-3 border-2 border-indigo-200 dark:border-indigo-800">
                  <span className="animate-pulse">✨</span> {xpBalance} Available XP
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {STORE_ITEMS.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all border-b-8 hover:border-indigo-500">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-slate-800 dark:text-white mb-1">{item.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-bold">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-indigo-600 dark:text-indigo-400 font-black text-lg">{item.cost} XP</div>
                        <button onClick={() => handlePurchaseItem(item)} disabled={xpBalance < item.cost} className="bg-indigo-600 disabled:bg-slate-300 disabled:opacity-50 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-md">Buy Growth</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-200 dark:border-amber-800 rounded-3xl flex flex-col items-center text-center">
                 <div className="text-5xl mb-4">🌳</div>
                 <h4 className="text-xl font-black text-amber-800 dark:text-amber-400">Sync Complete!</h4>
                 <p className="text-xs text-amber-600 dark:text-amber-500 font-bold mt-2 max-w-md">Items purchased with XP add "Growth Boost" to your tree without affecting your human streak. Available balance: {xpBalance} XP.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <ChatAssistant currentQuestion={visibleQuestions[0]?.title} />
    </Layout>
  );
};

export default App;
