export function Progress({ value, className }) {
  return (
    <div className={`w-full h-2 rounded-full bg-gray-200 overflow-hidden ${className}`}>
      <div
        className="h-full bg-indigo-600 transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
