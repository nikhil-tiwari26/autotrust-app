import axios from "axios";

export const fetchVehicleData = async (rcNumber) => {
  // If API Setu keys are not set, use mock data (for dev/demo)
  if (!process.env.APISETU_KEY || process.env.APISETU_KEY === "your_apisetu_key_here") {
    console.log("API Setu key not set — using mock data for:", rcNumber);
    return getMockVehicleData(rcNumber);
  }

  try {
    const response = await axios.get(
      `https://api.apisetu.gov.in/vahan/v3/rc/findByRegNumber`,
      {
        params: { regNumber: rcNumber },
        headers: {
          "X-APISETU-APIKEY": process.env.APISETU_KEY,
          "X-APISETU-CLIENTID": process.env.APISETU_CLIENT_ID,
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );
    const d = response.data;
    return {
      rcNumber: d.regNo || rcNumber,
      ownerName: d.ownerName || "N/A",
      ownerCount: d.noOfOwners || 1,
      registrationDate: d.regDate || "N/A",
      vehicleClass: d.vehicleClass || "N/A",
      fuelType: d.fuelDesc || "N/A",
      make: d.makerDesc || "N/A",
      model: d.modelDesc || "N/A",
      color: d.color || "N/A",
      insuranceValidity: d.insuranceUpto || "N/A",
      insuranceActive: d.insuranceUpto ? new Date(d.insuranceUpto) > new Date() : false,
      challanDues: d.challanAmount || 0,
      hypothecation: d.hypothecation === "Y",
      fitnessUpto: d.fitnessCertExpiry || "N/A",
    };
  } catch (error) {
    console.log("API Setu call failed, using mock data:", error.message);
    return getMockVehicleData(rcNumber);
  }
};

// Realistic mock data — varies based on RC number so different RCs show different results
const getMockVehicleData = (rcNumber) => {
  const seed = rcNumber.charCodeAt(rcNumber.length - 1);
  const owners = [1, 1, 2, 2, 3][seed % 5];
  const challan = [0, 0, 1200, 4500, 8800][seed % 5];
  const hypo = seed % 7 === 0;
  const insActive = seed % 4 !== 0;

  const cars = [
    { make: "Maruti Suzuki", model: "Swift VXI", color: "White", fuelType: "Petrol" },
    { make: "Hyundai", model: "i20 Sportz", color: "Silver", fuelType: "Petrol" },
    { make: "Honda", model: "City ZX", color: "Blue", fuelType: "Petrol" },
    { make: "Tata", model: "Nexon XZ", color: "Red", fuelType: "Diesel" },
    { make: "Maruti Suzuki", model: "Baleno Alpha", color: "Grey", fuelType: "Petrol" },
  ];
  const car = cars[seed % cars.length];
  const regYear = 2015 + (seed % 8);

  return {
    rcNumber,
    ownerName: ["Rajesh Kumar", "Priya Sharma", "Amit Singh", "Sunita Patel", "Rohit Verma"][seed % 5],
    ownerCount: owners,
    registrationDate: `${regYear}-0${(seed % 9) + 1}-15`,
    vehicleClass: "LMV",
    fuelType: car.fuelType,
    make: car.make,
    model: car.model,
    color: car.color,
    insuranceValidity: insActive ? "2026-08-31" : "2023-11-14",
    insuranceActive: insActive,
    challanDues: challan,
    hypothecation: hypo,
    fitnessUpto: `${regYear + 8}-0${(seed % 9) + 1}-14`,
  };
};
