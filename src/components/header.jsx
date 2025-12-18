// import { Users } from 'lucide-react';

// export default function Header() {
//   const currentTime = new Date().toLocaleTimeString('en-US', {
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: true
//   });

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     month: '2-digit',
//     day: '2-digit',
//     year: 'numeric'
//   });

//   return (
//     <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 shadow-lg">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <Users className="w-8 h-8" />
//           <h1 className="text-2xl font-bold">Queue Management System</h1>
//         </div>
//         <div className="text-right">
//           <p className="text-sm opacity-90">{currentTime} - {currentDate}</p>
//           <p className="text-xs opacity-75">Welcome, Admin</p>
//         </div>
//       </div>
//     </header>
//   );
// }

import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  // Auto update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
      setCurrentDate(
        new Date().toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 shadow-lg">
      <div className="flex justify-between items-center">

        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Queue Management System</h1>
        </div>

        {/* Right Section Buttons + Time */}
        <div className="flex items-center gap-6">
          
          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin")}
              className="bg-white text-black px-4 py-2 rounded-lg shadow font-semibold hover:bg-gray-200 transition"
            >
              Admin View
            </button>

            <button
              onClick={() => navigate("/now-serving")}
              className="bg-white text-black px-4 py-2 rounded-lg shadow font-semibold hover:bg-gray-200 transition"
            >
              Display View
            </button>
          </div>

          {/* Time + Welcome */}
          <div className="text-right">
            <p className="text-sm opacity-90">
              {currentTime} - {currentDate}
            </p>
            <p className="text-xs opacity-75">Welcome, Admin</p>
          </div>

        </div>
      </div>
    </header>
  );
}
