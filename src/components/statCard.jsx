export default function StatCard({ icon, count, label, bgColor, iconColor }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-4">
        <div className={`${bgColor} ${iconColor} p-3 rounded-full`}>
          {icon}
        </div>
        <div>
          <p className="text-3xl font-bold">{count}</p>
          <p className="text-gray-600 text-sm">{label}</p>
        </div>
      </div>
    </div>
  );
}