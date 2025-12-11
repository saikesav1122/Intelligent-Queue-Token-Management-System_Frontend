export default function CounterCard({ counter }) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-800">{counter.name}</h4>
        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
          {counter.status}
        </span>
      </div>
      <p className="text-sm text-gray-600">Services: {counter.service}</p>
      <p className="text-sm text-gray-600">{counter.availability}</p>
    </div>
  );
}