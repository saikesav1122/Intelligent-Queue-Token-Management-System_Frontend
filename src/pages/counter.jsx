import { useEffect, useState } from "react";
import { ArrowLeft, Bell, CheckCircle, SkipForward } from "lucide-react";
import { useNavigate } from "react-router-dom";
import socket from "../sockets/socket";

export default function Counter() {
  const navigate = useNavigate();

  const [currentToken, setCurrentToken] = useState("---");
  const [counterNumber] = useState("Counter 1");

  useEffect(() => {
    socket.on("nowServing", (data) => {
      setCurrentToken(data.token);
    });

    return () => {
      socket.off("nowServing");
    };
  }, []);

  const callNext = () => {
    socket.emit("callNext");
  };

  const markServed = () => {
    socket.emit("markServed", { token: currentToken });
  };

  const skipToken = () => {
    socket.emit("skipToken", { token: currentToken });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-8 relative">

      {/* Back Button */}
      <button
        onClick={() => navigate("/kiosk")}
        className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Counter Dashboard</h1>
        <p className="text-xl opacity-90">{counterNumber}</p>
      </div>

      {/* Now Serving Card */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-12 border-2 border-white border-opacity-30 shadow-2xl text-center">
          <h2 className="text-3xl font-bold text-yellow-300 mb-6">
            NOW SERVING
          </h2>
          <div className="text-7xl font-bold text-yellow-100 mb-6">
              COUNTER-1 
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6">

        <button
          onClick={callNext}
          className="bg-yellow-400 text-black rounded-2xl p-6 text-lg font-semibold
                     hover:bg-yellow-300 transition flex flex-col items-center gap-2"
        >
          <Bell className="w-8 h-8" />
          Call Next
        </button>

        <button
          onClick={markServed}
          className="bg-green-400 text-black rounded-2xl p-6 text-lg font-semibold
                     hover:bg-green-300 transition flex flex-col items-center gap-2"
        >
          <CheckCircle className="w-8 h-8" />
          Mark Served
        </button>

        <button
          onClick={skipToken}
          className="bg-red-400 text-black rounded-2xl p-6 text-lg font-semibold
                     hover:bg-red-300 transition flex flex-col items-center gap-2"
        >
          <SkipForward className="w-8 h-8" />
          Skip
        </button>

      </div>
    </div>
  );
}
