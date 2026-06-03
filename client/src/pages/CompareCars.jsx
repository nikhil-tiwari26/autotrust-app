import { useEffect, useState } from "react";
import { getSavedReports } from "../services/vehicleService.js";
import { getRiskColor, getRiskLabel, formatDate } from "../utils/formatters.js";
import Loader from "../components/common/Loader.jsx";
import { FiBarChart2 } from "react-icons/fi";

export default function CompareCars() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carA, setCarA] = useState("");
  const [carB, setCarB] = useState("");

  useEffect(() => {
    getSavedReports()
      .then((r) => setReports(r.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const a = reports.find((r) => r._id === carA);
  const b = reports.find((r) => r._id === carB);

  const Row = ({ label, valA, valB, better }) => {
    const aWins = better === "lower" ? valA < valB : valA > valB;
    return (
      <tr className="border-b border-white/5">
        <td className={`py-3 pr-4 text-sm text-right ${a && b && aWins ? "text-green-400 font-semibold" : "text-white"}`}>{valA ?? "—"}</td>
        <td className="py-3 px-4 text-xs text-gray-500 text-center whitespace-nowrap">{label}</td>
        <td className={`py-3 pl-4 text-sm text-left ${a && b && !aWins ? "text-green-400 font-semibold" : "text-white"}`}>{valB ?? "—"}</td>
      </tr>
    );
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <FiBarChart2 className="text-electric-400 text-3xl" />
        <div>
          <h1 className="text-2xl font-bold text-white">Compare Two Cars</h1>
          <p className="text-gray-400 text-sm">Select two saved reports to compare them side by side.</p>
        </div>
      </div>

      {reports.length < 2 ? (
        <div className="card text-center py-16">
          <p className="text-gray-400">You need at least 2 saved reports to compare. Go check some vehicles first!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[["Car A", carA, setCarA], ["Car B", carB, setCarB]].map(([label, val, setter]) => (
              <div key={label}>
                <label className="block text-gray-300 text-sm font-medium mb-2">{label}</label>
                <select className="input" value={val} onChange={(e) => setter(e.target.value)}>
                  <option value="">Select a car</option>
                  {reports.map((r) => (
                    <option key={r._id} value={r._id}>{r.make} {r.model} — {r.rcNumber}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {a && b && (
            <div className="card overflow-x-auto">
              <div className="grid grid-cols-3 mb-4 text-center">
                <div>
                  <p className="text-white font-bold">{a.make} {a.model}</p>
                  <p className="text-electric-400 font-mono text-xs">{a.rcNumber}</p>
                </div>
                <div className="text-gray-500 text-sm self-center">vs</div>
                <div>
                  <p className="text-white font-bold">{b.make} {b.model}</p>
                  <p className="text-electric-400 font-mono text-xs">{b.rcNumber}</p>
                </div>
              </div>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className={`py-3 pr-4 text-sm text-right font-bold text-3xl ${getRiskColor(a.aiRiskScore)}`}>{a.aiRiskScore ?? "N/A"}</td>
                    <td className="py-3 px-4 text-xs text-gray-500 text-center">Risk Score</td>
                    <td className={`py-3 pl-4 text-sm text-left font-bold text-3xl ${getRiskColor(b.aiRiskScore)}`}>{b.aiRiskScore ?? "N/A"}</td>
                  </tr>
                  <Row label="No. of Owners" valA={a.ownerCount} valB={b.ownerCount} better="lower" />
                  <Row label="Challan Dues" valA={`₹${a.challanDues}`} valB={`₹${b.challanDues}`} better="lower" />
                  <tr className="border-b border-white/5">
                    <td className={`py-3 pr-4 text-sm text-right ${a.insuranceActive ? "text-green-400" : "text-red-400"}`}>{a.insuranceActive ? "Active ✅" : "Expired ❌"}</td>
                    <td className="py-3 px-4 text-xs text-gray-500 text-center">Insurance</td>
                    <td className={`py-3 pl-4 text-sm text-left ${b.insuranceActive ? "text-green-400" : "text-red-400"}`}>{b.insuranceActive ? "Active ✅" : "Expired ❌"}</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className={`py-3 pr-4 text-sm text-right ${!a.hypothecation ? "text-green-400" : "text-red-400"}`}>{a.hypothecation ? "Yes ❌" : "No ✅"}</td>
                    <td className="py-3 px-4 text-xs text-gray-500 text-center">Loan Pending</td>
                    <td className={`py-3 pl-4 text-sm text-left ${!b.hypothecation ? "text-green-400" : "text-red-400"}`}>{b.hypothecation ? "Yes ❌" : "No ✅"}</td>
                  </tr>
                  <Row label="Fuel Type" valA={a.fuelType} valB={b.fuelType} />
                  <Row label="Reg. Date" valA={formatDate(a.registrationDate)} valB={formatDate(b.registrationDate)} />
                </tbody>
              </table>
              <div className="mt-6 p-4 bg-electric-500/5 border border-electric-500/20 rounded-xl text-center text-sm text-gray-300">
                <span className="text-electric-400 font-semibold">Green values</span> indicate the better option for each metric.
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
