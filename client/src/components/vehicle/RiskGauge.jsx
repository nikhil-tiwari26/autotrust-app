import { getRiskColor, getRiskLabel } from "../../utils/formatters.js";

export default function RiskGauge({ score }) {
  const color = score <= 30 ? "#22c55e" : score <= 60 ? "#eab308" : "#ef4444";
  const rotation = (score / 100) * 180 - 90;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-24 overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#1e2d4a" strokeWidth="20" strokeLinecap="round" />
          <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke={color} strokeWidth="20" strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 283} 283`} />
          <g transform={`rotate(${rotation}, 100, 100)`}>
            <line x1="100" y1="100" x2="100" y2="20" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <circle cx="100" cy="100" r="6" fill="white" />
          </g>
        </svg>
      </div>
      <div className="text-center">
        <div className={`text-5xl font-bold ${getRiskColor(score)}`}>{score}</div>
        <div className={`text-lg font-semibold mt-1 ${getRiskColor(score)}`}>{getRiskLabel(score)}</div>
        <div className="text-gray-400 text-sm mt-1">Risk Score / 100</div>
      </div>
    </div>
  );
}
