import axios from "axios";

// Works with OpenRouter (free) OR Gemini API
// Set AI_PROVIDER=openrouter in .env to use OpenRouter
// Set AI_PROVIDER=gemini in .env to use Gemini

const callAI = async (prompt) => {
  const provider = process.env.AI_PROVIDER || "openrouter";

  if (provider === "gemini") {
    // Gemini via REST (no SDK dependency issues)
    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { "Content-Type": "application/json" } }
      );
      return res.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini API Error:", error.response?.data || error.message);
      throw new Error(`Gemini API failed: ${error.response?.data?.error?.message || error.message}`);
    }
  } else {
    // OpenRouter — free models, instant access
    try {
      const model = "gpt-3.5-turbo"; // Stable free model on OpenRouter
      console.log("OpenRouter Request - Model:", model);
      console.log("OpenRouter API Key exists:", !!process.env.OPENROUTER_API_KEY);
      
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: model,
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "AutoTrust",
          },
        }
      );
      return res.data.choices[0].message.content;
    } catch (error) {
      console.error("OpenRouter API Error Status:", error.response?.status);
      console.error("OpenRouter API Error Data:", error.response?.data);
      console.error("OpenRouter API Error:", error.message);
      throw new Error(`OpenRouter API failed (${error.response?.status}): ${error.response?.data?.error?.message || error.message}`);
    }
  }
};

export const generateRiskScore = async (vehicleData) => {
  const regYear = vehicleData.registrationDate
    ? new Date(vehicleData.registrationDate).getFullYear()
    : "Unknown";
  const age = regYear !== "Unknown" ? new Date().getFullYear() - regYear : "Unknown";

  const prompt = `You are an expert used car advisor in India. Analyze the following vehicle data and provide a risk assessment for a first-time buyer.

Vehicle Data:
- RC Number: ${vehicleData.rcNumber}
- Owner Count: ${vehicleData.ownerCount}
- Registration Date: ${vehicleData.registrationDate}
- Vehicle Age: ${age} years
- Insurance Valid Until: ${vehicleData.insuranceValidity}
- Insurance Currently Active: ${vehicleData.insuranceActive}
- Challan Dues: Rs.${vehicleData.challanDues}
- Hypothecation (Bank Loan Pending): ${vehicleData.hypothecation}
- Fitness Certificate Valid Until: ${vehicleData.fitnessUpto}

Respond ONLY with a valid JSON object. No markdown. No explanation outside the JSON. Exact format:
{
  "riskScore": <number 0-100, where 0=safest 100=highest risk>,
  "verdict": "<Safe Buy|Proceed with Caution|High Risk|Avoid>",
  "redFlags": ["<specific red flag 1>", "<specific red flag 2>"],
  "positives": ["<positive point 1>", "<positive point 2>"],
  "summary": "<2-3 sentence plain English explanation for a first-time buyer>"
}`;

  try {
    const text = await callAI(prompt);
    const clean = text.replace(/```json|```/g, "").trim();
    // Extract JSON even if model adds extra text
    const jsonMatch = clean.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI returned invalid response");
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.warn("AI service failed, using mock risk score:", error.message);
    return getMockRiskScore(vehicleData);
  }
};

export const generateMaintenanceCost = async ({ make, model, year, km }) => {
  const prompt = `You are an expert automobile service advisor in India. Estimate upcoming maintenance costs for:
- Car: ${year} ${make} ${model}
- Current Odometer: ${km} km

List service items due in the next 20,000 km. Use realistic Indian spare parts prices and labor costs in INR.

Respond ONLY with a valid JSON object. No markdown. No extra text. Exact format:
{
  "items": [
    { "service": "<service name>", "dueAt": "<e.g. 70,000 km or 6 months>", "estimatedCost": <number in INR>, "priority": "<High|Medium|Low>" }
  ],
  "totalEstimate": <total INR as number>,
  "advice": "<1-2 sentence practical advice for this car>"
}`;

  try {
    const text = await callAI(prompt);
    const clean = text.replace(/```json|```/g, "").trim();
    const jsonMatch = clean.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI returned invalid response");
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.warn("AI service failed, using mock maintenance cost:", error.message);
    return getMockMaintenanceCost(make, model, year, km);
  }
};

// Mock data fallback for risk score
const getMockRiskScore = (vehicleData) => {
  const ownerCount = vehicleData.ownerCount || 1;
  const challanDues = vehicleData.challanDues || 0;
  const hypothecation = vehicleData.hypothecation || false;
  
  let riskScore = 30; // Base score
  if (ownerCount > 2) riskScore += 15;
  if (challanDues > 5000) riskScore += 20;
  if (hypothecation) riskScore += 25;
  
  riskScore = Math.min(riskScore, 100);
  
  const verdict = riskScore < 40 ? "Safe Buy" : riskScore < 60 ? "Proceed with Caution" : "High Risk";
  
  return {
    riskScore,
    verdict,
    redFlags: riskScore > 50 ? ["Multiple owners", "Outstanding challan dues", "Bank hypothecation pending"] : ["None identified"],
    positives: riskScore < 50 ? ["Good ownership history", "No major dues"] : [],
    summary: `Based on the vehicle history, this purchase carries a ${riskScore > 60 ? "high" : riskScore > 40 ? "moderate" : "low"} risk level. Review all documents carefully before proceeding.`
  };
};

// Mock data fallback for maintenance costs
const getMockMaintenanceCost = (make, model, year, km) => {
  const baseServices = [
    { service: "Oil & Filter Change", dueAt: `${Math.ceil(km/10000)*10000 + 5000} km`, estimatedCost: 1200, priority: "High" },
    { service: "Air Filter Replacement", dueAt: `${Math.ceil(km/10000)*10000 + 15000} km`, estimatedCost: 800, priority: "Medium" },
    { service: "Brake Pad Inspection", dueAt: `${Math.ceil(km/10000)*10000 + 20000} km`, estimatedCost: 2500, priority: "High" },
    { service: "Tire Rotation", dueAt: `${Math.ceil(km/10000)*10000 + 10000} km`, estimatedCost: 1500, priority: "Medium" },
    { service: "Transmission Fluid Check", dueAt: `${Math.ceil(km/10000)*10000 + 30000} km`, estimatedCost: 1800, priority: "Low" }
  ];
  
  const totalEstimate = baseServices.reduce((sum, item) => sum + item.estimatedCost, 0);
  
  return {
    items: baseServices,
    totalEstimate,
    advice: `Regular maintenance is essential for your ${year} ${make} ${model}. Follow the manufacturer's service schedule to keep the vehicle in optimal condition.`
  };
};
