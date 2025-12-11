
import { useState, useEffect } from 'react';
import { Clock, UserCheck, CheckCircle, AlertCircle, Users, Ticket, RefreshCw, Menu } from 'lucide-react';
import Header from '../components/header';
import StatCard from '../components/statCard';
import CounterCard from '../components/counterCard';
import QueueTable from '../components/queueTable';
import TokenPopup from './tokenPopup';
import socket from '../sockets/socket';
import { generateToken } from '../services/api';

export default function KioskDashboard() {
  const [customerName, setCustomerName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [generatedToken, setGeneratedToken] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [stats, setStats] = useState({
    waiting: 1,
    serving: 0,
    completed: 0,
    todayTotal: 1
  });

  const [counters] = useState([
    { id: 1, name: 'Counter 1', status: 'Online', service: 'General', availability: 'Available' },
    { id: 2, name: 'Counter 2', status: 'Online', service: 'General', availability: 'Available' },
    { id: 3, name: 'Counter 3', status: 'Online', service: 'General', availability: 'Available' }
  ]);

  const [queueData, setQueueData] = useState([
    { queueNo: 'P001', customer: 'Lorem Ipsum', service: 'payment', status: 'Waiting', time: '10:41 PM' }
  ]);

  useEffect(() => {
    socket.on('queueUpdate', (data) => {
      setStats(data.stats);
      setQueueData(data.queue);
    });

    socket.on('counterUpdate', (data) => {
      console.log('Counter update:', data);
    });

    return () => {
      socket.off('queueUpdate');
      socket.off('counterUpdate');
    };
  }, []);

  const handleGenerateToken = async () => {
    if (!customerName || !serviceType) return alert('Please fill all fields');
    setIsGenerating(true);

    try {
      const response = await generateToken(customerName, serviceType);

      if (response.success) {
        setGeneratedToken(response.token);
        setShowPopup(true);
        setStats(prev => ({
          ...prev,
          waiting: prev.waiting + 1,
          todayTotal: prev.todayTotal + 1
        }));
      }
    } catch {
      const mockToken = `T${String(stats.todayTotal + 1).padStart(3, '0')}`;
      setGeneratedToken({
        tokenNumber: mockToken,
        customerName,
        serviceType,
        estimatedWait: '6 min'
      });
      setShowPopup(true);

      const newQueueItem = {
        queueNo: mockToken,
        customer: customerName,
        service: serviceType,
        status: 'Waiting',
        time: new Date().toLocaleTimeString('en-US', { hour12: true })
      };
      setQueueData(prev => [...prev, newQueueItem]);
    } finally {
      setIsGenerating(false);
      setCustomerName('');
      setServiceType('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 overflow-x-hidden">
      <Header />

      <div className="w-full px-4 sm:px-6 md:px-8 mt-6">

        {/* 🟦 Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard className="w-full" icon={<Clock className="w-8 h-8" />} count={stats.waiting} label="Waiting" bgColor="bg-blue-100" iconColor="text-blue-600" />
          <StatCard className="w-full" icon={<UserCheck className="w-8 h-8" />} count={stats.serving} label="Serving" bgColor="bg-green-100" iconColor="text-green-600" />
          <StatCard className="w-full" icon={<CheckCircle className="w-8 h-8" />} count={stats.completed} label="Completed" bgColor="bg-purple-100" iconColor="text-purple-600" />
          <StatCard className="w-full" icon={<AlertCircle className="w-8 h-8" />} count={stats.todayTotal} label="Today's Total" bgColor="bg-red-100" iconColor="text-red-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* 🟧 Add Customer Card */}
          <div className="bg-white rounded-lg shadow-md p-6 w-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold">Add New Customer</h2>
            </div>

            <div className="space-y-4 sm:space-y-6">

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700">Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select service type</option>
                  <option value="general">General</option>
                  <option value="payment">Payment</option>
                  <option value="technical">Technical</option>
                  <option value="inquiry">Inquiry</option>
                </select>
              </div>

              <button
                onClick={handleGenerateToken}
                disabled={isGenerating}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 flex justify-center items-center gap-2 disabled:opacity-50"
              >
                <Ticket className="w-5 h-5" />
                {isGenerating ? 'Generating...' : 'Generate Token'}
              </button>
            </div>
          </div>

          {/* 🟩 Queue Management */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Menu className="w-6 h-6" />
                <h2 className="text-lg sm:text-xl font-bold">Queue Management</h2>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>

            {/* 🟩 Counter Status */}
            <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">Counter Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {counters.map(counter => (
                <CounterCard key={counter.id} className="w-full" counter={counter} />
              ))}
            </div>

            {/* 🟦 Queue Table */}
            <div className="overflow-x-auto">
              <QueueTable queueData={queueData} />
            </div>
          </div>
        </div>
      </div>

      {showPopup && generatedToken && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg p-6">
            <TokenPopup token={generatedToken} onClose={() => setShowPopup(false)} />
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white text-center py-4 mt-10 w-full">
        © 2025 Customer Queuing System. All rights reserved.
      </footer>
    </div>
  );
}
