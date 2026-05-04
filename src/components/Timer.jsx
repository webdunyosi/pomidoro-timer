const Timer = ({ active, timeLeft, title, isAllCompleted }) => {
  // Vaqtni MM:SS formatiga o'tkazish
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className={`flex-col items-center justify-center mb-8 z-10 transition-all duration-500 ${active || timeLeft > 0 ? 'flex scale-100 opacity-100' : 'hidden scale-95 opacity-0'}`}>
      <h2 className={`text-xs uppercase tracking-widest mb-1 font-bold ${isAllCompleted ? 'text-indigo-400' : 'text-green-400'}`}>
        {title}
      </h2>
      <div className="text-6xl font-light tabular-nums text-white tracking-tighter drop-shadow-lg">
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Timer;