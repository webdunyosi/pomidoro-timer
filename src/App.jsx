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

  const activeCount = shapes.filter(Boolean).length;

  useEffect(() => {
    let interval;
    let timeout; // Taymer tugaganda ishlatish uchun

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerActive && timeLeft <= 0) {
      // Linter xato bermasligi uchun uni setTimeout ichiga olamiz
      timeout = setTimeout(() => {
        setTimerActive(false);
        playBeep();
      }, 0);
    }

    // Komponent o'chganda (unmount) tozalash
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

  const toggleShape = (index) => {
    const newShapes = [...shapes];
    const isActive = newShapes[index];
    
    newShapes[index] = !isActive;
    setShapes(newShapes);

    const newActiveCount = newShapes.filter(Boolean).length;

    // TODO: Backend'ga so'rov shu yerdan ketadi

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

  const resetShapes = () => {
    setTimerActive(false);
    setShapes([false, false, false, false]);
    // TODO: Backend'da 0 ga tushirish
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-4">
      
      <Toast visible={toast.visible} message={toast.message} isBigBreak={toast.isBigBreak} />

      <main className="glass-panel w-full max-w-md rounded-3xl p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
        
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]" style={{ animationDelay: '1.5s' }}></div>

        <h1 className="text-3xl font-bold mb-3 tracking-wide text-gray-100 z-10 text-center">Pomodoro</h1>
        <p className="text-gray-400 font-medium mb-12 z-10 text-center text-sm">Vaqt tugagach, bosqichni belgilang</p>

        <Timer 
          active={timerActive} 
          timeLeft={timeLeft} 
          title={timerTitle} 
          isAllCompleted={activeCount === 4} 
        />

        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-12 z-10 w-full">
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
          <p className={`font-bold mb-6 tracking-widest uppercase text-sm transition-colors duration-300 ${activeCount === 4 ? 'text-green-400' : 'text-red-400'}`}>
            {activeCount === 4 ? "Barchasi bajarildi 🎉" : `Bajarilgan: ${activeCount} / 4`}
          </p>
          
          <button 
            onClick={resetShapes} 
            className="px-6 py-3 rounded-xl bg-slate-700/50 hover:bg-slate-600 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none active:scale-95 flex items-center gap-2 text-sm font-medium"
          >
            <i className="fas fa-redo-alt"></i> Barchasini tozalash
          </button>
        </div>

      </main>
    </div>
  );
};

export default App;