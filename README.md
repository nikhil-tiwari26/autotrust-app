# AutoTrust 🚗

> India's AI-powered used car verification platform. Buy used cars with confidence.

## What it does
- **Instant RC Lookup** — fetches real government data (owner history, insurance, challans, hypothecation) from Parivahan via API Setu
- **AI Risk Score** — sends vehicle data to Google Gemini API which returns a 0-100 risk score with plain-English red flags
- **Maintenance Estimator** — AI estimates upcoming service costs for the next 20,000 km
- **Verified Listings** — sellers post cars, admin approves before they go live
- **Compare Cars** — compare two saved vehicle reports side by side

## Tech Stack
- **Frontend:** React 18, TailwindCSS, React Router v6, Axios
- **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose
- **Auth:** JWT + bcrypt
- **AI:** Google Gemini 1.5 Flash API
- **Vehicle Data:** API Setu (Government of India — free)
- **Images:** Cloudinary
- **Deploy:** Vercel (client) + Render (server) + MongoDB Atlas

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/autotrust.git
cd autotrust
```

### 2. Setup server
```bash
cd server
npm install
# Fill in your .env file (see .env template)
npm run dev
```

### 3. Setup client
```bash
cd client
npm install
npm run dev
```

### 4. Environment Variables

**server/.env**
```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_key_from_aistudio.google.com
APISETU_KEY=your_key_from_apisetu.gov.in
APISETU_CLIENT_ID=your_client_id
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
NODE_ENV=development
```

## Roles
| Role | Permissions |
|------|------------|
| Buyer | Search vehicles, get AI reports, save & compare |
| Seller | All buyer permissions + create listings |
| Admin | Manage all users and approve/reject listings |

## Project Structure
```
autotrust/
├── client/        # React frontend
└── server/        # Express backend
```
