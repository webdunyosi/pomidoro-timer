const Toast = ({ visible, message, isBigBreak }) => {
  return (
    <div 
      className={`fixed top-6 left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] backdrop-blur-xl px-5 py-3.5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex items-center gap-3 z-50 w-max max-w-[calc(100vw-2rem)] border select-none
        ${visible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-16 opacity-0 scale-95 pointer-events-none'}
        ${isBigBreak 
          ? 'bg-indigo-950/70 border-indigo-500/40 text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.15)]' 
          : 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
        }
      `}
    >
      <i className={`text-lg sm:text-xl shrink-0 ${isBigBreak ? 'fas fa-award text-indigo-400 animate-bounce' : 'fas fa-star text-emerald-400 animate-pulse'}`}></i>
      <span className="font-semibold text-xs sm:text-sm tracking-wide leading-snug">{message}</span>
    </div>
  );
};

export default Toast;