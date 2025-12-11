export default function QueueTable({ queueData }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Queue No.</th>
            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Customer</th>
            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Service</th>
            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Status</th>
            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Time</th>
            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {queueData.map((item, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="py-3 px-2 font-medium">{item.queueNo}</td>
              <td className="py-3 px-2">{item.customer}</td>
              <td className="py-3 px-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                  {item.service}
                </span>
              </td>
              <td className="py-3 px-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm font-medium">
                  {item.status}
                </span>
              </td>
              <td className="py-3 px-2 text-sm">{item.time}</td>
              <td className="py-3 px-2">
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                    Call
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}