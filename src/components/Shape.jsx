const Shape = ({ isActive, onClick, index }) => {
  return (
    <button 
      onClick={onClick} 
      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center focus:outline-none cursor-pointer
        ${isActive 
          ? 'bg-red-500 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.7)] scale-110' 
          : 'border-red-500/30 bg-slate-800/50 hover:bg-red-500/10'
        }
      `}
      aria-label={`${index + 1}-bosqich`}
    >
      <i className={`fas fa-check text-2xl sm:text-3xl text-white transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></i>
    </button>
  );
};

export default Shape;