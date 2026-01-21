export const StatCard = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1">{label}</span>
    <span className="text-3xl font-bold text-white">{value}</span>
  </div>
);