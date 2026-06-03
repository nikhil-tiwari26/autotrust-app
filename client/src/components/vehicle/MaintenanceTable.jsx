import { formatPrice } from "../../utils/formatters.js";

export default function MaintenanceTable({ items = [], totalEstimate, advice }) {
  const priorityColor = { High: "text-red-400 bg-red-500/10", Medium: "text-yellow-400 bg-yellow-500/10", Low: "text-green-400 bg-green-500/10" };
  return (
    <div className="space-y-4">
      {advice && <p className="text-gray-300 text-sm bg-electric-500/10 border border-electric-500/20 rounded-xl p-4">{advice}</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-gray-400 py-3 pr-4">Service</th>
              <th className="text-left text-gray-400 py-3 pr-4">Due At</th>
              <th className="text-left text-gray-400 py-3 pr-4">Priority</th>
              <th className="text-right text-gray-400 py-3">Est. Cost</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/2">
                <td className="py-3 pr-4 text-white">{item.service}</td>
                <td className="py-3 pr-4 text-gray-300">{item.dueAt}</td>
                <td className="py-3 pr-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColor[item.priority]}`}>{item.priority}</span>
                </td>
                <td className="py-3 text-right text-electric-400 font-medium">{formatPrice(item.estimatedCost)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="pt-4 text-gray-300 font-semibold">Total Estimate</td>
              <td className="pt-4 text-right text-xl font-bold text-electric-400">{formatPrice(totalEstimate)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
