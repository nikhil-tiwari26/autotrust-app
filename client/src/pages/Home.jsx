import { Link } from "react-router-dom";
import { FiShield, FiSearch, FiTool, FiList, FiArrowRight } from "react-icons/fi";

export default function Home() {
  const features = [
    { icon: <FiSearch className="text-2xl text-electric-400" />, title: "Instant RC Lookup", desc: "Fetch real government data on any vehicle in seconds. Owner history, insurance, challans — all in one place." },
    { icon: <FiShield className="text-2xl text-electric-400" />, title: "AI Risk Analysis", desc: "Our AI reads the vehicle data and gives you a plain-English risk score. Know exactly what you're buying." },
    { icon: <FiTool className="text-2xl text-electric-400" />, title: "Maintenance Estimator", desc: "Find out how much you'll spend on the car in the next 2 years before you buy it." },
    { icon: <FiList className="text-2xl text-electric-400" />, title: "Verified Listings", desc: "Browse cars from verified sellers. Every listing is reviewed before it goes live." },
  ];

  const steps = [
    { num: "01", title: "Enter the RC number", desc: "Type the vehicle registration number of the car you want to buy." },
    { num: "02", title: "Get government data", desc: "We fetch live data from Parivahan — owner count, insurance, challans, hypothecation." },
    { num: "03", title: "See the AI verdict", desc: "Our AI analyzes the data and gives you a risk score with clear red flags." },
    { num: "04", title: "Buy with confidence", desc: "Armed with real information, negotiate better and make a smarter decision." },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-500/5 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto text-center relative">
          <span className="inline-block bg-electric-500/10 text-electric-400 border border-electric-500/30 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wider uppercase">
            AI-Powered Used Car Verification
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Don't Get Cheated.<br />
            <span className="text-electric-400">Buy Used Cars with Confidence.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            AutoTrust checks any used car's government records and uses AI to tell you exactly what to watch out for — in plain English.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search" className="btn-primary flex items-center justify-center gap-2 text-base">
              Check a Vehicle Now <FiArrowRight />
            </Link>
            <Link to="/listings" className="btn-outline flex items-center justify-center gap-2 text-base">
              Browse Listings
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-white/5 bg-navy-800/50">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
          {[["10,000+", "Cars Verified"], ["98%", "Accuracy Rate"], ["₹0", "For Basic Check"]].map(([num, label]) => (
            <div key={label}>
              <div className="text-3xl md:text-4xl font-bold text-electric-400">{num}</div>
              <div className="text-gray-400 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to buy smart</h2>
            <p className="text-gray-400 max-w-xl mx-auto">One platform. All the information. Zero surprises.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card hover:border-electric-500/40 transition-all duration-200">
                <div className="bg-electric-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-navy-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-5">
                <div className="text-4xl font-black text-electric-500/20 flex-shrink-0 w-12">{s.num}</div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{s.title}</h4>
                  <p className="text-gray-400 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto card border-electric-500/30">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to check a car?</h2>
          <p className="text-gray-400 mb-8">Enter any RC number and get a full report in under 30 seconds.</p>
          <Link to="/search" className="btn-primary inline-flex items-center gap-2">
            Start Free Check <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
