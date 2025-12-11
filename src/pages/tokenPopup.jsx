import { CheckCircle } from 'lucide-react';

export default function TokenPopup({ token, onClose }) {
  if (!token) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform animate-scale-in">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Queue Number Generated!
          </h2>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6 px-4 rounded-xl my-4">
            <p className="text-5xl font-bold">{token.tokenNumber}</p>
          </div>

          <p className="text-gray-600 mb-2">
            Customer: <span className="font-semibold">{token.customerName}</span>
          </p>
          <p className="text-gray-600 mb-4">
            Service: <span className="font-semibold">{token.serviceType}</span>
          </p>

          <p className="text-sm text-gray-500">Please wait for your number to be called</p>
          <p className="text-sm text-gray-500">
            Estimated wait: <span className="font-semibold">{token.estimatedWait}</span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}