import React, { useState, useEffect } from 'react';
import { ShapeSelector } from './components/ShapeSelector';
import { Button } from './components/Button';
import { PoopShape, Mood, PoopLog } from './types';
import { MOOD_DATA, POOP_SHAPES_DATA } from './constants';
import { Trash2, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [logs, setLogs] = useState<PoopLog[]>([]);
  const [currentShape, setCurrentShape] = useState<PoopShape>(PoopShape.SWIRL);
  const [currentMood, setCurrentMood] = useState<Mood>(Mood.HAPPY);
  const [note, setNote] = useState('');
  const [view, setView] = useState<'LOG' | 'HISTORY'>('LOG');
  const [isLoading, setIsLoading] = useState(false);

  // Load logs on mount
  useEffect(() => {
    const saved = localStorage.getItem('pink_poop_logs');
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse logs", e);
      }
    }
  }, []);

  // Save logs on change
  useEffect(() => {
    localStorage.setItem('pink_poop_logs', JSON.stringify(logs));
  }, [logs]);

  const handleLog = async () => {
    setIsLoading(true);
    
    // Simulate saving delay for aesthetics
    await new Promise(r => setTimeout(r, 600));

    const newLog: PoopLog = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      shape: currentShape,
      mood: currentMood,
      note,
    };

    setLogs([newLog, ...logs]);
    setNote('');
    setCurrentShape(PoopShape.SWIRL);
    setIsLoading(false);
    
    setView('HISTORY');
  };

  const handleDelete = (id: string) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans text-gray-800">
      
      {/* Main Container Window */}
      <div className="w-full max-w-md bg-pink-100 pixel-border relative overflow-hidden">
        
        {/* Window Header */}
        <div className="bg-gradient-to-r from-y2k-hot to-purple-600 p-2 flex justify-between items-center border-b-2 border-black">
          <div className="flex items-center gap-2 text-white font-mono font-bold">
            <Heart className="w-4 h-4 fill-current animate-pulse" />
            <span>Pink Poop Diary.exe</span>
          </div>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-gray-300 border border-black flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-white">_</div>
            <div className="w-4 h-4 bg-gray-300 border border-black flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-white">X</div>
          </div>
        </div>

        {/* Marquee */}
        <div className="bg-black text-y2k-green overflow-hidden py-1 border-b-2 border-y2k-hot">
          <div className="whitespace-nowrap animate-[marquee_10s_linear_infinite] font-mono text-xs text-y2k-blue">
            WELCOME TO YOUR DIGITAL BATHROOM DIARY *** STAY PINK *** STAY HEALTHY *** 欢迎来到粉红便便日记 ***
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 bg-[url('https://www.transparenttextures.com/patterns/graphy-inverted.png')] min-h-[500px] flex flex-col">
          
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
             <button 
              onClick={() => setView('LOG')}
              className={`flex-1 py-1 font-bold font-mono border-2 border-black transition-all ${view === 'LOG' ? 'bg-y2k-hot text-white shadow-[2px_2px_0px_black] translate-y-[2px] translate-x-[2px]' : 'bg-white hover:bg-pink-50 shadow-[4px_4px_0px_black]'}`}
             >
               📝 记录
             </button>
             <button 
              onClick={() => setView('HISTORY')}
              className={`flex-1 py-1 font-bold font-mono border-2 border-black transition-all ${view === 'HISTORY' ? 'bg-y2k-hot text-white shadow-[2px_2px_0px_black] translate-y-[2px] translate-x-[2px]' : 'bg-white hover:bg-pink-50 shadow-[4px_4px_0px_black]'}`}
             >
               📖 历史
             </button>
          </div>

          {view === 'LOG' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Shape Selection */}
              <div className="space-y-2">
                <label className="block font-bold text-y2k-purple font-mono">STEP 1: 选择造型</label>
                <ShapeSelector selected={currentShape} onChange={setCurrentShape} />
              </div>

              {/* Mood Selection */}
              <div className="space-y-2">
                <label className="block font-bold text-y2k-purple font-mono">STEP 2: 当时心情</label>
                <select 
                  value={currentMood} 
                  onChange={(e) => setCurrentMood(e.target.value as Mood)}
                  className="w-full p-2 border-2 border-black rounded shadow-[4px_4px_0px_#ff99cc] focus:outline-none focus:translate-y-1 focus:shadow-none transition-all font-mono bg-white"
                >
                  {Object.entries(MOOD_DATA).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Note Input */}
              <div className="space-y-2">
                <label className="block font-bold text-y2k-purple font-mono">STEP 3: 碎碎念</label>
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="今天吃坏肚子了吗？还是..."
                  className="w-full p-2 h-20 border-2 border-black rounded shadow-[4px_4px_0px_#ff99cc] resize-none focus:outline-none focus:bg-pink-50 font-mono text-sm"
                />
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button 
                  label={isLoading ? "💾 保存中..." : "✨ 记录便便 ✨"} 
                  onClick={handleLog}
                  disabled={isLoading}
                  className="w-full text-lg py-3"
                />
              </div>
            </div>
          )}

          {view === 'HISTORY' && (
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 pr-1">
              {logs.length === 0 ? (
                <div className="text-center text-gray-400 py-10 font-mono">
                  <p>还没有记录哦~</p>
                  <p>(｡•́︿•̀｡)</p>
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="bg-white border-2 border-pink-300 p-3 shadow-[3px_3px_0px_#FFCCFF] hover:translate-x-1 transition-transform group">
                    <div className="flex justify-between items-start border-b border-dashed border-pink-200 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`${POOP_SHAPES_DATA[log.shape].color} scale-75`}>
                          {POOP_SHAPES_DATA[log.shape].icon}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-600">
                            {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                          <div className="text-xs text-pink-400 font-mono uppercase">{POOP_SHAPES_DATA[log.shape].label}</div>
                        </div>
                      </div>
                      <button onClick={() => handleDelete(log.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-700 mb-2 font-sans">
                      <span className="bg-pink-100 px-1 rounded text-xs mr-2 text-pink-600">{MOOD_DATA[log.mood]}</span>
                      {log.note}
                    </div>

                    {/* Keep display of old AI fortunes if they exist in local storage */}
                    {log.aiFortune && (
                       <div className="mt-2 p-2 bg-purple-50 rounded text-xs text-purple-800 font-mono border border-purple-100">
                         {log.aiFortune}
                       </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-gray-200 p-1 text-[10px] text-center font-mono border-t-2 border-white text-gray-500">
          © 1999-2025 PINK CORP. ALL RIGHTS RESERVED.
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;