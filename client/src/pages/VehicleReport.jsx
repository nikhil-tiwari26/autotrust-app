import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lookupVehicle, getRiskScore, saveReport } from "../services/vehicleService.js";
import { useAuth } from "../context/AuthContext.jsx";
import VehicleCard from "../components/vehicle/VehicleCard.jsx";
import RiskGauge from "../components/vehicle/RiskGauge.jsx";
import RedFlagList from "../components/vehicle/RedFlagList.jsx";
import Loader from "../components/common/Loader.jsx";
import { FiBookmark, FiBarChart2 } from "react-icons/fi";

export default function VehicleReport() {
  const { rcNumber } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [loadingVehicle, setLoadingVehicle] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await lookupVehicle(rcNumber);
        setVehicle(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not fetch vehicle data");
      } finally { setLoadingVehicle(false); }
    };
    fetch();
  }, [rcNumber]);

  const handleGetAI = async () => {
    setLoadingAI(true);
    try {
      const res = await getRiskScore(rcNumber);
      setAiData(res.data.data);
    } catch (err) {
      setError("AI analysis failed. Please try again.");
    } finally { setLoadingAI(false); }
  };

  const handleSave = async () => {
    if (!user) { navigate("/login"); return; }
    setSaving(true);
    try {
      await saveReport(vehicle._id);
      alert("Report saved to dashboard!");
    } catch (err) {
      alert(err.response?.data?.message || "Could not save report");
    } finally { setSaving(false); }
  };

  if (loadingVehicle) return <Loader text="Fetching vehicle data from government records..." />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Vehicle Report</h1>
          <p className="text-gray-400 mt-1 font-mono">{rcNumber}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave} disabled={saving} className="btn-outline flex items-center gap-2 text-sm py-2 px-4">
            <FiBookmark />{saving ? "Saving..." : "Save Report"}
          </button>
          <button onClick={() => navigate("/compare")} className="btn-outline flex items-center gap-2 text-sm py-2 px-4">
            <FiBarChart2 />Compare
          </button>
        </div>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 mb-6">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {vehicle && <VehicleCard vehicle={vehicle} />}

        <div className="card flex flex-col items-center justify-center text-center">
          {!aiData && !loadingAI ? (
            <div className="space-y-4">
              <div className="bg-electric-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <FiBarChart2 className="text-electric-400 text-2xl" />
              </div>
              <h3 className="text-white font-semibold text-lg">Get AI Risk Analysis</h3>
              <p className="text-gray-400 text-sm max-w-xs">Our AI will analyze this vehicle's data and give you a risk score with plain-English explanation.</p>
              <button onClick={handleGetAI} className="btn-primary">Analyze with AI</button>
            </div>
          ) : loadingAI ? (
            <Loader text="AI is analyzing vehicle data..." />
          ) : (
            <div className="w-full space-y-4">
              <RiskGauge score={aiData.riskScore} />
              {aiData.summary && <p className="text-gray-300 text-sm bg-white/5 rounded-xl p-4">{aiData.summary}</p>}
            </div>
          )}
        </div>
      </div>

      {aiData && (
        <div className="card">
          <h3 className="text-white font-semibold text-lg mb-4">Detailed Analysis</h3>
          <RedFlagList
            redFlags={aiData.redFlags || []}
            positives={aiData.positives || []}
          />
        </div>
      )}
    </div>
  );
}
