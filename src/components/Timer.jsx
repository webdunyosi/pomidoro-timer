const Timer = ({ active, timeLeft, title, isAllCompleted }) => {
  // Vaqtni MM:SS formatiga o'tkazish
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center mb-[clamp(1.5rem,5vw,2.25rem)] z-10 transition-all duration-500 select-none scale-100 opacity-100">
      <h2 className={`text-[clamp(0.7rem,3vw,0.8rem)] uppercase tracking-[0.2em] mb-2 font-bold transition-colors duration-300 ${isAllCompleted ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.3)]' : 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]'}`}>
        {title}
      </h2>
      <div className="text-[clamp(3.8rem,16vw,5.5rem)] font-light tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-300 tracking-tighter leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Timer;