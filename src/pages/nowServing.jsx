// import { useEffect, useState } from 'react';
// import { Clock, Menu } from 'lucide-react';
// import socket from '../sockets/socket';

// export default function NowServing() {
//   const [nowServing, setNowServing] = useState('---');
//   const [nextInLine, setNextInLine] = useState({ token: 'P001', name: 'Lorem Ipsum' });
//   const [waiting, setWaiting] = useState(2);
//   const [averageWait, setAverageWait] = useState('6 min');
//   const [recentlyCalled, setRecentlyCalled] = useState([]);
//   const [currentTime, setCurrentTime] = useState('');

//   useEffect(() => {
//     // Update time every second
//     const timeInterval = setInterval(() => {
//       const now = new Date();
//       setCurrentTime(now.toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: true
//       }));
//     }, 1000);

//     // Socket listeners
//     socket.on('nowServing', (data) => {
//       setNowServing(data.token);
//     });

//     socket.on('queueUpdate', (data) => {
//       setWaiting(data.waiting);
//       if (data.nextInLine) setNextInLine(data.nextInLine);
//       if (data.averageWait) setAverageWait(data.averageWait);
//     });

//     socket.on('recentlyCalled', (data) => {
//       setRecentlyCalled(data);
//     });

//     return () => {
//       clearInterval(timeInterval);
//       socket.off('nowServing');
//       socket.off('queueUpdate');
//       socket.off('recentlyCalled');
//     };
//   }, []);

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-8">
//       {/* Header */}
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold mb-2">Customer Service Center</h1>
//         <p className="text-xl opacity-90">Queue Management System</p>
//       </div>

//       {/* Now Serving Section */}
//       <div className="max-w-4xl mx-auto mb-8">
//         <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-12 border-2 border-white border-opacity-30 shadow-2xl">
//           <h2 className="text-3xl font-bold text-yellow-300 mb-6 text-center">
//             NOW SERVING
//           </h2>
//           <div className="text-center">
//             <div className="text-8xl font-bold mb-4 animate-pulse">
//               {nowServing}
//             </div>
//             <p className="text-xl opacity-90 flex items-center justify-center gap-2">
//               <span>→</span> Please proceed to counter
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 mb-8">
//         <div className="bg-white bg-opacity-15 backdrop-blur-lg rounded-2xl p-6 text-center border border-white border-opacity-20">
//           <p className="text-sm opacity-75 mb-2">→ NEXT IN LINE</p>
//           <p className="text-3xl font-bold">{nextInLine.token}</p>
//           <p className="text-sm opacity-75 mt-1">{nextInLine.name}</p>
//         </div>

//         <div className="bg-white bg-opacity-15 backdrop-blur-lg rounded-2xl p-6 text-center border border-white border-opacity-20">
//           <p className="text-sm opacity-75 mb-2">👥 WAITING</p>
//           <p className="text-3xl font-bold">{waiting}</p>
//           <p className="text-sm opacity-75 mt-1">customer/s ahead</p>
//         </div>

//         <div className="bg-white bg-opacity-15 backdrop-blur-lg rounded-2xl p-6 text-center border border-white border-opacity-20">
//           <p className="text-sm opacity-75 mb-2">⏱ AVERAGE WAIT</p>
//           <p className="text-3xl font-bold">{averageWait}</p>
//           <p className="text-sm opacity-75 mt-1">estimated time</p>
//         </div>
//       </div>

//       {/* Recently Called Section */}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
//           <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
//             <Clock className="w-6 h-6" />
//             RECENTLY CALLED
//           </h3>
//           {recentlyCalled.length === 0 ? (
//             <p className="text-center opacity-75">No recent calls</p>
//           ) : (
//             <div className="space-y-2">
//               {recentlyCalled.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="flex justify-between items-center p-3 bg-white bg-opacity-10 rounded-lg"
//                 >
//                   <span className="font-medium">{item.token}</span>
//                   <span className="opacity-75">{item.time}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Waiting Queue Footer */}
//       <div className="max-w-4xl mx-auto mt-8">
//         <div className="bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-3">
//               <Menu className="w-5 h-5 text-yellow-300" />
//               <span className="font-semibold text-yellow-300">Waiting Queue</span>
//             </div>
//             <div className="text-right">
//               <p className="text-sm opacity-75">{currentDate}</p>
//               <p className="text-2xl font-bold text-yellow-300">{currentTime}</p>
//             </div>
//             <div className="flex items-center gap-2 text-green-400">
//               <span>✓</span>
//               <span className="font-medium">Thank you for waiting</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { Clock, Menu, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import socket from '../sockets/socket';

export default function NowServing() {
  const navigate = useNavigate();
  const [nowServing, setNowServing] = useState('---');
  const [nextInLine, setNextInLine] = useState({ token: 'P001', name: 'Lorem Ipsum' });
  const [waiting, setWaiting] = useState(2);
  const [averageWait, setAverageWait] = useState('6 min');
  const [recentlyCalled, setRecentlyCalled] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    }, 1000);

    // Socket listeners
    socket.on('nowServing', (data) => {
      setNowServing(data.token);
    });

    socket.on('queueUpdate', (data) => {
      setWaiting(data.waiting);
      if (data.nextInLine) setNextInLine(data.nextInLine);
      if (data.averageWait) setAverageWait(data.averageWait);
    });

    socket.on('recentlyCalled', (data) => {
      setRecentlyCalled(data);
    });

    return () => {
      clearInterval(timeInterval);
      socket.off('nowServing');
      socket.off('queueUpdate');
      socket.off('recentlyCalled');
    };
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-8">
      {/* Back arrow to Kiosk */}
      <button
        onClick={() => navigate('/kiosk')}
        aria-label="Back to Kiosk"
        className="absolute top-6 left-6 z-50 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Customer Service Center</h1>
        <p className="text-xl opacity-90">Queue Management System</p>
      </div>

      {/* Now Serving Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-12 border-2 border-white border-opacity-30 shadow-2xl">
          <h2 className="text-3xl font-bold text-yellow-300 mb-6 text-center">
            NOW SERVING
          </h2>
          <div className="text-center">
            <div className="text-8xl font-bold mb-4 animate-pulse">
              {nowServing}
            </div>
            <p className="text-xl opacity-90 flex items-center justify-center gap-2">
              <span>→</span> Please proceed to counter
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white bg-opacity-15 backdrop-blur-lg rounded-2xl p-6 text-center border border-white border-opacity-20">
          <p className="text-sm opacity-75 mb-2">→ NEXT IN LINE</p>
          <p className="text-3xl font-bold">{nextInLine.token}</p>
          <p className="text-sm opacity-75 mt-1">{nextInLine.name}</p>
        </div>

        <div className="bg-white bg-opacity-15 backdrop-blur-lg rounded-2xl p-6 text-center border border-white border-opacity-20">
          <p className="text-sm opacity-75 mb-2">👥 WAITING</p>
          <p className="text-3xl font-bold">{waiting}</p>
          <p className="text-sm opacity-75 mt-1">customer/s ahead</p>
        </div>

        <div className="bg-white bg-opacity-15 backdrop-blur-lg rounded-2xl p-6 text-center border border-white border-opacity-20">
          <p className="text-sm opacity-75 mb-2">⏱ AVERAGE WAIT</p>
          <p className="text-3xl font-bold">{averageWait}</p>
          <p className="text-sm opacity-75 mt-1">estimated time</p>
        </div>
      </div>

      {/* Recently Called Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6" />
            RECENTLY CALLED
          </h3>
          {recentlyCalled.length === 0 ? (
            <p className="text-center opacity-75">No recent calls</p>
          ) : (
            <div className="space-y-2">
              {recentlyCalled.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-white bg-opacity-10 rounded-lg"
                >
                  <span className="font-medium">{item.token}</span>
                  <span className="opacity-75">{item.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Waiting Queue Footer */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Menu className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold text-yellow-300">Waiting Queue</span>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-75">{currentDate}</p>
              <p className="text-2xl font-bold text-yellow-300">{currentTime}</p>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <span>✓</span>
              <span className="font-medium">Thank you for waiting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
