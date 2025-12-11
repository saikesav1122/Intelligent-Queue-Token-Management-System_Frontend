import { useNavigate } from 'react-router-dom';

export default function ServiceSelection() {
  const navigate = useNavigate();

  const services = [
    { id: 'billing', name: 'Billing', icon: '💰' },
    { id: 'support', name: 'Support', icon: '🎧' },
    { id: 'account', name: 'Account Update', icon: '👤' },
    { id: 'connection', name: 'New Connection', icon: '🔌' },
    { id: 'documents', name: 'Documents', icon: '📄' }
  ];

  const handleServiceSelect = (serviceId) => {
    // Navigate to kiosk with selected service
    navigate('/kiosk', { state: { selectedService: serviceId } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Select Your Service
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceSelect(service.id)}
              className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center gap-3"
            >
              <span className="text-5xl">{service.icon}</span>
              <span>{service.name}</span>
            </button>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/kiosk')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Skip to Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}