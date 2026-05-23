const Shape = ({ isActive, onClick, index }) => {
  return (
    <button 
      onClick={onClick} 
      className={`w-[clamp(3.1rem,14vw,4.5rem)] h-[clamp(3.1rem,14vw,4.5rem)] rounded-[clamp(0.8rem,3vw,1.25rem)] border-2 transition-all duration-500 flex items-center justify-center focus:outline-none cursor-pointer select-none
        ${isActive 
          ? 'bg-gradient-to-br from-red-500 to-rose-600 border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.6)] scale-105 hover:scale-110 active:scale-95' 
          : 'border-slate-700/60 bg-slate-800/40 hover:bg-red-500/10 hover:border-red-500/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] active:scale-95'
        }
      `}
      aria-label={`${index + 1}-bosqich`}
    >
      <i className={`fas fa-check text-[clamp(1.2rem,5vw,1.75rem)] text-white transition-all duration-500 ${isActive ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-12'}`}></i>
    </button>
  );
};

export default Shape;