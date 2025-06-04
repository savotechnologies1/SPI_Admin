import { useNavigate } from "react-router-dom";
import timer from "../../assets/timer.png";

const QuickPunch = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
      <h1 className="text-lg sm:text-xl font-bold">Quick Punch</h1>
      <span className="bg-green-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full whitespace-nowrap">
        CLOCK IN
      </span>
    </div>
  
    {/* Last Punch Info */}
    <p className="text-orange-500 text-xs sm:text-sm mt-3 sm:mt-4 text-center">
      Last Punch was 2 hours ago.
    </p>
  
    {/* Static Timer */}
    <div className="flex items-center justify-center my-3 sm:my-4 gap-2 sm:gap-4">
      <img 
        src={timer} 
        alt="Timer" 
        className="w-6 h-6 sm:w-8 sm:h-8" 
      />
      <span className="text-2xl sm:text-4xl font-bold">
        02 : 50 : 26 PM
      </span>
    </div>
  
    {/* Button Grid */}
    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-white text-xs sm:text-sm">
      <button className="bg-[#00A76F] hover:bg-black py-2 sm:py-3 rounded-full transition-colors">
        Clock In
      </button>
      <button className="bg-[#FF5630] hover:bg-black py-2 sm:py-3 rounded-full transition-colors">
        Clock Out
      </button>
  
      <button className="bg-[#DC2800] hover:bg-black py-2 sm:py-3 rounded-full transition-colors">
        Start Lunch
      </button>
      <button className="bg-[#049061] hover:bg-black py-2 sm:py-3 rounded-full transition-colors">
        End Lunch
      </button>
  
      <button className="bg-[#AC2000] hover:bg-black py-2 sm:py-3 rounded-full transition-colors">
        Start Exception
      </button>
      <button className="bg-[#006D49] hover:bg-black py-2 sm:py-3 rounded-full transition-colors">
        End Exception
      </button>
  
      <button className="col-span-2 bg-[#243C75] hover:bg-black py-2 sm:py-3 rounded-full transition-colors"
       onClick={() => navigate("/vaction-request")}>
        
       Vacation Request
      </button>
    </div>
  </div>
  );
};

export default QuickPunch;
