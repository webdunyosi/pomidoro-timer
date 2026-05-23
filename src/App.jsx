import { useState, useEffect } from 'react';
import Toast from './components/Toast';
import Timer from './components/Timer';
import Shape from './components/Shape';
import { playBeep } from './utils/sound';

const App = () => {
  const [shapes, setShapes] = useState([false, false, false, false]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerTitle, setTimerTitle] = useState('Tanaffus');
  const [toast, setToast] = useState({ message: '', isBigBreak: false, visible: false });
  const [loading, setLoading] = useState(true);

  const activeCount = shapes.filter(Boolean).length;
  const API_URL = 'https://pomodoro-backend-439d.onrender.com/api/pomodoro'; // Backend manzili

  // 1. Dastlabki yuklanishda Backenddan ma'lumotni olish
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        // Bazadan kelgan raqamga qarab shakllarni (shapes) belgilab chiqamiz
        const count = data.completedCount || 0;
        const initialShapes = [false, false, false, false].map((_, index) => index < count);
        setShapes(initialShapes);
        setLoading(false);
      })
      .catch(err => {
        console.error("Backendga ulanishda xatolik:", err);
        setLoading(false);
      });
  }, []);

  // Taymer mantiqi
  useEffect(() => {
    let interval;
    let timeout;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerActive && timeLeft <= 0) {
      timeout = setTimeout(() => {
        setTimerActive(false);
        playBeep(); 
      }, 0);
    }
    return () => {
      clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [timerActive, timeLeft]);

  const showToastMsg = (msg, isBigBreak) => {
    setToast({ message: msg, isBigBreak, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 5000);
  };

  // 2. Backendni yangilash funksiyasi
  const updateBackend = async (newCount) => {
    try {
      await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completedCount: newCount })
      });
    } catch (err) {
      console.error("Ma'lumotni saqlashda xatolik:", err);
    }
  };

  // 3. Shaklni bosganda
  const toggleShape = (index) => {
    const newShapes = [...shapes];
    const isActive = newShapes[index];
    
    newShapes[index] = !isActive;
    setShapes(newShapes);

    const newActiveCount = newShapes.filter(Boolean).length;

    // Backendga darhol yuboramiz
    updateBackend(newActiveCount);

    if (!isActive) {
      if (newActiveCount < 4) {
        showToastMsg("Barakalla! Yutuq! 🎉 Endi 5 daqiqa dam oling.", false);
        setTimerTitle("Qisqa Tanaffus");
        setTimeLeft(5 * 60);
        setTimerActive(true);
      } else {
        showToastMsg("Qoyilmaqom! 4 ta bosqich tugadi! 1 soatlik katta tanaffus 🏆", true);
        setTimerTitle("Katta Tanaffus");
        setTimeLeft(60 * 60);
        setTimerActive(true);
      }
    } else {
      setTimerActive(false);
    }
  };

  // 4. Barchasini tozalash bosilganda
  const resetShapes = () => {
    setTimerActive(false);
    setShapes([false, false, false, false]);
    // Backendni 0 ga tushiramiz
    updateBackend(0);
  };

  // Ma'lumot kelguncha "Yuklanmoqda" yozuvi
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white bg-slate-900">Yuklanmoqda...</div>;
  }

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-4">
      
      <Toast visible={toast.visible} message={toast.message} isBigBreak={toast.isBigBreak} />

      <main className="glass-panel w-full max-w-[420px] rounded-[2rem] p-[clamp(1.5rem,6vw,2.5rem)] shadow-2xl relative overflow-hidden flex flex-col items-center transition-all duration-500 hover:border-red-500/20">
        
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-15 animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-15 animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]" style={{ animationDelay: '1.5s' }}></div>

        <h1 className="text-[clamp(1.75rem,7vw,2.25rem)] font-extrabold mb-1 tracking-wide bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent z-10 text-center drop-shadow-sm">Pomodoro</h1>
        <p className="text-gray-400 font-medium mb-[clamp(1.5rem,5vw,2.5rem)] z-10 text-center text-[clamp(0.8rem,3.5vw,0.875rem)]">Vaqt tugagach, bosqichni belgilang</p>

        <Timer 
          active={timerActive} 
          timeLeft={timeLeft} 
          title={timerTitle} 
          isAllCompleted={activeCount === 4} 
        />

        <div className="flex items-center justify-center gap-[clamp(0.5rem,3.5vw,1.25rem)] mb-[clamp(1.75rem,6vw,2.75rem)] z-10 w-full">
          {shapes.map((isActive, index) => (
            <Shape 
              key={index} 
              index={index} 
              isActive={isActive} 
              onClick={() => toggleShape(index)} 
            />
          ))}
        </div>

        <div className="z-10 w-full flex flex-col items-center">
          <p className={`font-bold mb-5 tracking-widest uppercase text-xs sm:text-sm transition-colors duration-300 ${activeCount === 4 ? 'text-indigo-400' : 'text-red-400'}`}>
            {activeCount === 4 ? "Barchasi bajarildi 🎉" : `Bajarilgan: ${activeCount} / 4`}
          </p>
          
          <button 
            onClick={resetShapes} 
            className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-red-500/10 border border-slate-700/80 hover:border-red-500/30 text-gray-300 hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none active:scale-95 flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer"
          >
            <i className="fas fa-redo-alt"></i> Barchasini tozalash
          </button>
        </div>

      </main>
    </div>
  );
};

export default App;