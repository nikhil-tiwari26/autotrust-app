import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

export default function RedFlagList({ redFlags = [], positives = [] }) {
  return (
    <div className="space-y-4">
      {redFlags.length > 0 && (
        <div>
          <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
            <FiAlertTriangle /> Red Flags ({redFlags.length})
          </h4>
          <div className="space-y-2">
            {redFlags.map((flag, i) => (
              <div key={i} className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{flag}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {positives.length > 0 && (
        <div>
          <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <FiCheckCircle /> Positives ({positives.length})
          </h4>
          <div className="space-y-2">
            {positives.map((p, i) => (
              <div key={i} className="flex items-start gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                <FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{p}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
