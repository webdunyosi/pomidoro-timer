const Toast = ({ visible, message, isBigBreak }) => {
  return (
    <div 
      className={`fixed top-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 backdrop-blur-md px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center gap-4 z-50 w-max max-w-[90%] border
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[-150%] opacity-0'}
        ${isBigBreak ? 'bg-indigo-500/20 border-indigo-500/50' : 'bg-green-500/20 border-green-500/50'}
      `}
    >
      <i className={`${isBigBreak ? 'fas fa-award text-indigo-400 text-2xl animate-bounce' : 'fas fa-star text-green-400 text-xl animate-pulse'}`}></i>
      <span className="font-medium text-sm sm:text-base tracking-wide">{message}</span>
    </div>
  );
};

export default Toast;