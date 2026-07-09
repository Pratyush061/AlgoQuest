
import React, { useState, useEffect } from 'react';
import { Question, Difficulty, UserProgress } from '../types';
import { XP_PER_QUESTION } from '../constants';

interface QuestionBatchProps {
  questions: Question[];
  user: UserProgress;
  onComplete: (id: string, timeTaken: number) => void;
  onUndone: (id: string) => void;
  onMarkReview: (id: string) => void;
  onSaveSolution: (id: string, approach: 'brute' | 'better' | 'optimal', text: string) => void;
}

const QuestionBatch: React.FC<QuestionBatchProps> = ({ 
  questions, 
  user, 
  onComplete, 
  onUndone, 
  onMarkReview,
  onSaveSolution 
}) => {
  const [times, setTimes] = useState<Record<string, number>>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, 'brute' | 'better' | 'optimal'>>({});
  const [localTexts, setLocalTexts] = useState<Record<string, string>>({});
  
  // Modal state
  const [zoomedInfo, setZoomedInfo] = useState<{ qId: string, approach: 'brute' | 'better' | 'optimal' } | null>(null);

  // Initialize active tabs for each question
  useEffect(() => {
    const initialTabs: Record<string, 'brute' | 'better' | 'optimal'> = {};
    questions.forEach(q => {
      if (!activeTabs[q.id]) initialTabs[q.id] = 'brute';
    });
    if (Object.keys(initialTabs).length > 0) {
      setActiveTabs(prev => ({ ...prev, ...initialTabs }));
    }
  }, [questions]);

  const handleTextChange = (qId: string, approach: string, text: string) => {
    const key = `${qId}-${approach}`;
    setLocalTexts(prev => ({ ...prev, [key]: text }));
  };

  const handleSave = (qId: string, customApproach?: 'brute' | 'better' | 'optimal') => {
    const approach = customApproach || activeTabs[qId] || 'brute';
    const text = localTexts[`${qId}-${approach}`] ?? (user.solutions?.[qId]?.[approach] || "");
    onSaveSolution(qId, approach, text);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {questions.map((q) => {
        const isSolved = user.solvedQuestionIds.includes(q.id);
        const isMarked = user.reviewList.includes(q.id);
        const activeTab = activeTabs[q.id] || 'brute';
        const solutionData = user.solutions?.[q.id] || {};
        const currentSavedText = solutionData[activeTab] || "";
        const localText = localTexts[`${q.id}-${activeTab}`];
        const displayText = localText !== undefined ? localText : currentSavedText;
        const isDirty = localText !== undefined && localText !== currentSavedText;

        return (
          <div 
            key={q.id} 
            className={`bg-white dark:bg-slate-900 rounded-2xl border flex flex-col ${isSolved ? 'border-green-200 dark:border-green-900/50 bg-green-50/30 dark:bg-green-900/10' : 'border-slate-200 dark:border-slate-800'} p-6 shadow-sm hover:shadow-md transition-all h-full relative overflow-hidden`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                q.difficulty === Difficulty.EASY ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                q.difficulty === Difficulty.MEDIUM ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              }`}>
                {q.difficulty}
              </span>
              <button 
                onClick={() => onMarkReview(q.id)}
                className={`text-sm flex items-center gap-1 transition-colors ${isMarked ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-400 dark:text-slate-500 hover:text-indigo-500'}`}
              >
                {isMarked ? '★ Marked' : '☆ Mark'}
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight">{q.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] mb-4 uppercase tracking-wider font-semibold">{q.topic}</p>

            <a 
              href={q.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 py-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mb-4 border border-slate-200/50 dark:border-slate-700/50"
            >
              Practice on {q.platform} ↗
            </a>

            {/* Approach Tabs */}
            <div className="flex gap-1 mb-2">
              {(['brute', 'better', 'optimal'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTabs(prev => ({ ...prev, [q.id]: tab }))}
                  className={`flex-1 py-1.5 px-1 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all border ${
                    activeTab === tab 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Solution Input */}
            <div className="relative mb-4 group/box">
              <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover/box:opacity-100 transition-opacity">
                 <button 
                  onClick={() => setZoomedInfo({ qId: q.id, approach: activeTab })}
                  className="p-1.5 bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:text-indigo-500 transition-colors"
                  title="Expand Editor"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
                </button>
              </div>

              <textarea
                value={displayText}
                onChange={(e) => handleTextChange(q.id, activeTab, e.target.value)}
                placeholder={`Type your ${activeTab} logic here...`}
                spellCheck={false}
                className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pt-4 text-[11px] h-28 font-mono leading-relaxed outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none dark:text-indigo-300 placeholder:font-sans placeholder:italic"
              />
              
              <div className="absolute bottom-2 right-2 flex items-center gap-2">
                {isDirty && (
                  <button
                    onClick={() => handleSave(q.id)}
                    className="bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg hover:bg-indigo-700 active:scale-95 transition-all"
                  >
                    Save
                  </button>
                )}
                {!isDirty && currentSavedText && (
                  <div className="text-green-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1 bg-green-50/80 dark:bg-green-900/20 px-2 py-1 rounded-md border border-green-100 dark:border-green-800/30">
                    <span className="text-xs">✓</span> Saved
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex items-center gap-2">
                {!isSolved ? (
                  <>
                    <select 
                      className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-2 text-xs font-bold outline-none text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                      value={times[q.id] || 0}
                      onChange={(e) => setTimes({...times, [q.id]: parseInt(e.target.value)})}
                    >
                      <option value="0">⏱️ Effort...</option>
                      <option value="15">15 mins</option>
                      <option value="30">30 mins</option>
                      <option value="45">45 mins</option>
                      <option value="60">1h+</option>
                    </select>

                    <button
                      onClick={() => onComplete(q.id, times[q.id] || 0)}
                      className="px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-md shadow-indigo-100 dark:shadow-none whitespace-nowrap"
                    >
                      Complete
                    </button>
                  </>
                ) : (
                  <button
                    onMouseEnter={() => setHoveredId(q.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => onUndone(q.id)}
                    className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all border-2 ${
                      hoveredId === q.id 
                        ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-400' 
                        : 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-100 dark:shadow-none'
                    }`}
                  >
                    {hoveredId === q.id ? 'Revert Solve?' : 'Solved ✓'}
                  </button>
                )}
              </div>
              
              {!isSolved && (
                <div className="text-[10px] text-center font-bold text-slate-400 dark:text-slate-500">
                  Earn {XP_PER_QUESTION[q.difficulty]} XP on completion
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Zoomed Solution Modal */}
      {zoomedInfo && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 animate-in fade-in zoom-in-95 duration-200">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setZoomedInfo(null)}></div>
          
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800 overflow-hidden h-[85vh]">
             <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
               <div>
                  <h4 className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">
                    {zoomedInfo.approach} APPROACH
                  </h4>
                  <h3 className="text-xl font-black text-slate-800 dark:text-white">
                    {questions.find(q => q.id === zoomedInfo.qId)?.title}
                  </h3>
               </div>
               <button 
                onClick={() => setZoomedInfo(null)}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 transition-all shadow-sm"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
             </div>

             <div className="flex-1 p-6 flex flex-col gap-4">
                <textarea
                  value={localTexts[`${zoomedInfo.qId}-${zoomedInfo.approach}`] ?? (user.solutions?.[zoomedInfo.qId]?.[zoomedInfo.approach] || "")}
                  onChange={(e) => handleTextChange(zoomedInfo.qId, zoomedInfo.approach, e.target.value)}
                  placeholder={`Write your detailed ${zoomedInfo.approach} solution logic here...`}
                  spellCheck={false}
                  autoFocus
                  className="flex-1 w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 font-mono text-sm leading-relaxed outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none dark:text-indigo-300 shadow-inner"
                />

                <div className="flex items-center justify-between px-2">
                   <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                     Solution automatically synced to card
                   </p>
                   <div className="flex items-center gap-4">
                      {(() => {
                         const currentText = user.solutions?.[zoomedInfo.qId]?.[zoomedInfo.approach] || "";
                         const text = localTexts[`${zoomedInfo.qId}-${zoomedInfo.approach}`] ?? currentText;
                         const isLocalDirty = text !== currentText;
                         
                         return (
                           <>
                             {isLocalDirty ? (
                               <button 
                                onClick={() => handleSave(zoomedInfo.qId, zoomedInfo.approach)}
                                className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 dark:shadow-none active:scale-95 transition-all"
                               >
                                 Save Master Logic
                               </button>
                             ) : (
                               <div className="text-green-500 font-black uppercase tracking-widest flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-6 py-3 rounded-2xl border border-green-100 dark:border-green-800/30">
                                 <span className="text-lg">✓</span> Logic Synced
                               </div>
                             )}
                           </>
                         )
                      })()}
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBatch;
