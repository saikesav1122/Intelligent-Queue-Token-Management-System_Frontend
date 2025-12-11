import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function TokenGenerated() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.state?.token || { tokenNumber: 'T001', customerName: 'Guest' };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Queue Number Generated
        </h2>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8 px-6 rounded-xl my-6">
          <p className="text-6xl font-bold">{token.tokenNumber}</p>
        </div>

        <p className="text-gray-600 mb-2">
          Customer: <span className="font-semibold">{token.customerName}</span>
        </p>
        <p className="text-gray-600 mb-6">
          Service: <span className="font-semibold">{token.serviceType}</span>
        </p>

        <p className="text-sm text-gray-500 mb-2">
          Please wait for your number to be called
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Estimated wait: <span className="font-semibold text-blue-600">{token.estimatedWait}</span>
        </p>

        <button
          onClick={() => navigate('/kiosk')}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}