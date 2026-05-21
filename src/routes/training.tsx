import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Zap,
  Activity,
  Award,
  TrendingUp,
  Clock,
  Plus,
  Play,
  X,
  ChevronRight,
  Info,
  Hexagon,
  Sparkles,
} from "lucide-react";
import { Sidebar, Topbar } from "./dashboard";

// Asset Imports
import zeroGLogo from "@/assets/0G Logo.png";
import agentNexus from "@/assets/agent-nexus.jpg";
import agentShadow from "@/assets/agent-shadow.jpg";
import agentAegis from "@/assets/agent-aegis.jpg";

export const Route = createFileRoute("/training")({
  component: TrainingPage,
});

export function TrainingPage() {
  return <DisabledTrainingPage />;
}


// Clan Icon helper matching other pages
function SolanaIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 397 311" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M64.6 237.9c-2.4-2.4-5.7-3.8-9.1-3.8H3.8c-3.1 0-4.6 3.8-2.4 6l63 63c2.4 2.4 5.7 3.8 9.1 3.8h51.7c3.1 0 4.6-3.8 2.4-6l-63-63z" fill="currentColor" />
      <path d="M332.4 73.1c2.4 2.4 5.7 3.8 9.1 3.8h51.7c3.1 0 4.6-3.8 2.4-6l-63-63c-2.4-2.4-5.7-3.8-9.1-3.8H331.8c-3.1 0-4.6 3.8-2.4 6l63 63z" fill="currentColor" />
      <path d="M271.6 155.5c2.4 2.4 5.7 3.8 9.1 3.8h51.7c3.1 0 4.6-3.8 2.4-6l-63-63c-2.4-2.4-5.7-3.8-9.1-3.8H210.8c-3.1 0-4.6 3.8-2.4 6l63 63z" fill="currentColor" />
    </svg>
  );
}

function BaseIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ZeroGClanIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return <img src={zeroGLogo} alt="0G Logo" className={`${className} object-contain`} />;
}

function ClanIcon({ type, className = "h-3.5 w-3.5" }: { type: string; className?: string }) {
  if (type === "solana") return <SolanaIcon className={`${className} text-teal-400`} />;
  if (type === "base") return <BaseIcon className={`${className} text-blue-500`} />;
  if (type === "zerog") return <ZeroGClanIcon className={className} />;
  return null;
}

function DisabledTrainingPage() {
  const [activeTab, setActiveTab] = useState("OVERVIEW");

  const tabs = ["OVERVIEW", "TRAINING SESSIONS", "SKILLS", "EVO LAB"];

  // Radar chart projections for 6 axes (Combat, Strategy, Adaptability, Utility, Support, Resilience)
  const radarLabels = ["Combat", "Strategy", "Adaptability", "Utility", "Support", "Resilience"];
  const strategyStats = [78, 72, 75, 68, 65, 70];
  const averageStats = [60, 58, 62, 55, 50, 55];

  // Helper to generate SVG points for hexagon radar
  const getRadarPoints = (stats: number[], scale = 1) => {
    const center = 100;
    const rMax = 70;
    return stats
      .map((val, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180);
        const radius = (val / 100) * rMax * scale;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-[#03070d] text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_15%,rgba(155,51,255,0.12),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(33,150,255,0.06),transparent_35%)]" />

      <div className="relative flex min-h-screen">
        <Sidebar active="Training" />
        <main className="min-w-0 flex-1 lg:ml-[225px]">
          <Topbar />

          <section className="mx-auto max-w-[1284px] px-4 py-5 sm:px-6 lg:px-8 space-y-4">
            
            {/* Top Title Section */}
            <div>
              <h1 className="font-tech text-3xl font-bold tracking-tight text-white uppercase">TRAINING CENTER</h1>
              <p className="mt-1 text-[11px] text-white/55 font-medium">
                Train, upgrade, and evolve your AI agents to unlock their full potential.
              </p>
            </div>

            {/* Stats strip */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
              <div className="arena-panel p-4 flex items-center justify-between border-white/8 bg-[#04080f]/90">
                <div className="space-y-1">
                  <span className="text-[9px] font-tech font-bold uppercase text-white/40 tracking-wider">TRAINING POINTS</span>
                  <span className="font-tech text-xl font-bold text-white block">2,450</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Zap className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="arena-panel p-4 flex items-center justify-between border-white/8 bg-[#04080f]/90">
                <div className="space-y-1">
                  <span className="text-[9px] font-tech font-bold uppercase text-white/40 tracking-wider">SESSIONS TODAY</span>
                  <span className="font-tech text-xl font-bold text-white block">3 / 5</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Activity className="h-4.5 w-4.5 animate-pulse" />
                </div>
              </div>

              <div className="arena-panel p-4 flex items-center justify-between border-white/8 bg-[#04080f]/90">
                <div className="space-y-1">
                  <span className="text-[9px] font-tech font-bold uppercase text-white/40 tracking-wider">TOTAL XP EARNED</span>
                  <span className="font-tech text-xl font-bold text-white block">125,680</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Award className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="arena-panel p-4 flex items-center justify-between border-white/8 bg-[#04080f]/90">
                <div className="space-y-1">
                  <span className="text-[9px] font-tech font-bold uppercase text-white/40 tracking-wider">AVG IMPROVEMENT</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-tech text-xl font-bold text-white">+24.6%</span>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1 py-0.5 rounded select-none">
                      This Week
                    </span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <TrendingUp className="h-4.5 w-4.5" />
                </div>
              </div>

              {/* Next Reward Progress */}
              <div className="arena-panel p-4 border-white/8 bg-[#04080f]/90 flex flex-col justify-between">
                <div className="flex justify-between text-[9px] font-tech font-bold uppercase text-white/40 tracking-wider">
                  <span>NEXT REWARD</span>
                  <span className="text-white/60">5,000 XP</span>
                </div>
                <div className="space-y-1.5 mt-1.5">
                  <div className="flex justify-between items-baseline text-[10px] font-semibold text-white/70">
                    <span>In 2 Sessions</span>
                    <span className="font-tech text-[9px]">4,250 / 5,000</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="bg-[#9a35ff] h-full rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Strip */}
            <div className="arena-panel p-3 border-white/8 bg-[#04080f]/95 flex flex-wrap items-center justify-between gap-3">
              {/* Tabs */}
              <div className="flex flex-wrap items-center gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded text-[10px] font-tech font-bold uppercase tracking-wider transition ${
                      activeTab === tab
                        ? "bg-[#9a35ff] text-white"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Layout Grid */}
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_376px]">
              
              {/* Left Column Training Panels */}
              <div className="min-w-0 space-y-4">
                
                {/* TRAINING QUEUE Panel */}
                <div className="arena-panel border-white/8 bg-[#04080f]/95 overflow-hidden">
                  <div className="p-5 border-b border-white/8 flex items-center justify-between">
                    <h3 className="font-tech text-xs uppercase text-white/86 tracking-wider font-semibold">
                      TRAINING QUEUE
                    </h3>
                    <button className="bg-[#9a35ff]/10 hover:bg-[#9a35ff]/20 border border-purple-500/35 hover:border-purple-400 rounded px-3 py-1 text-[9px] font-tech font-bold uppercase tracking-wider text-purple-400 transition cursor-pointer flex items-center gap-1">
                      <Plus className="h-3 w-3" />
                      <span>ADD TO QUEUE</span>
                    </button>
                  </div>

                  <div className="divide-y divide-white/6 p-5 space-y-4">
                    
                    {/* Session 1 */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded overflow-hidden border border-white/10 shrink-0 bg-white/5">
                          <img src={agentNexus} alt="NEXUS-01" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white text-xs leading-none">NEXUS-01</span>
                            <Hexagon className="h-3 w-3 fill-[#9a35ff] text-[#9a35ff]" />
                          </div>
                          <span className="text-[9px] text-white/40 block">ZeroG Clan</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-[200px] space-y-1.5">
                        <div className="flex justify-between items-baseline text-[10px] font-semibold text-white/50">
                          <span className="text-white font-bold leading-tight">Battle Simulation</span>
                          <span className="font-tech">68%</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="bg-[#9a35ff] h-full rounded-full" style={{ width: "68%" }} />
                        </div>
                        <span className="text-[8px] text-white/35 font-medium leading-none block">
                          Improves decision making in PvP
                        </span>
                      </div>

                      <div className="flex items-center gap-3.5">
                        <div className="flex items-center gap-1 text-[10px] text-white/55 font-tech font-semibold">
                          <Clock className="h-3.5 w-3.5 text-white/30" />
                          <span>01:24:35</span>
                        </div>
                        <button className="bg-[#0a0f1b]/60 border border-white/8 hover:border-purple-500/35 hover:bg-purple-950/10 rounded px-2.5 py-1 text-[9px] font-tech font-bold uppercase tracking-wider text-purple-400 transition cursor-pointer flex items-center gap-1">
                          <span>SPEED UP</span>
                          <Zap className="h-3 w-3 fill-current" />
                          <span className="text-white/40 font-semibold font-tech">50</span>
                        </button>
                        <button className="bg-transparent text-white/30 hover:text-white transition p-1 cursor-pointer">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Session 2 */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded overflow-hidden border border-white/10 shrink-0 bg-white/5">
                          <img src={agentAegis} alt="AEGIS-07" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white text-xs leading-none">AEGIS-07</span>
                            <Hexagon className="h-3 w-3 fill-[#9a35ff] text-[#9a35ff]" />
                          </div>
                          <span className="text-[9px] text-white/40 block">Base Clan</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-[200px] space-y-1.5">
                        <div className="flex justify-between items-baseline text-[10px] font-semibold text-white/50">
                          <span className="text-white font-bold leading-tight">Strategy Analysis</span>
                          <span className="font-tech">42%</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="bg-[#9a35ff] h-full rounded-full" style={{ width: "42%" }} />
                        </div>
                        <span className="text-[8px] text-white/35 font-medium leading-none block">
                          Enhances tactic planning
                        </span>
                      </div>

                      <div className="flex items-center gap-3.5">
                        <div className="flex items-center gap-1 text-[10px] text-white/55 font-tech font-semibold">
                          <Clock className="h-3.5 w-3.5 text-white/30" />
                          <span>02:15:20</span>
                        </div>
                        <button className="bg-[#0a0f1b]/60 border border-white/8 hover:border-purple-500/35 hover:bg-purple-950/10 rounded px-2.5 py-1 text-[9px] font-tech font-bold uppercase tracking-wider text-purple-400 transition cursor-pointer flex items-center gap-1">
                          <span>SPEED UP</span>
                          <Zap className="h-3 w-3 fill-current" />
                          <span className="text-white/40 font-semibold font-tech">40</span>
                        </button>
                        <button className="bg-transparent text-white/30 hover:text-white transition p-1 cursor-pointer">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Session 3 */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded overflow-hidden border border-white/10 shrink-0 bg-white/5">
                          <img src={agentShadow} alt="SHADOW-9" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white text-xs leading-none">SHADOW-9</span>
                            <Hexagon className="h-3 w-3 fill-[#9a35ff] text-[#9a35ff]" />
                          </div>
                          <span className="text-[9px] text-white/40 block">Solana Clan</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-[200px] space-y-1.5">
                        <div className="flex justify-between items-baseline text-[10px] font-semibold text-white/50">
                          <span className="text-white font-bold leading-tight">Adaptability Drill</span>
                          <span className="font-tech">25%</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="bg-[#9a35ff] h-full rounded-full" style={{ width: "25%" }} />
                        </div>
                        <span className="text-[8px] text-white/35 font-medium leading-none block">
                          Improves in-game adaptation
                        </span>
                      </div>

                      <div className="flex items-center gap-3.5">
                        <div className="flex items-center gap-1 text-[10px] text-white/55 font-tech font-semibold">
                          <Clock className="h-3.5 w-3.5 text-white/30" />
                          <span>03:45:10</span>
                        </div>
                        <button className="bg-[#0a0f1b]/60 border border-white/8 hover:border-purple-500/35 hover:bg-purple-950/10 rounded px-2.5 py-1 text-[9px] font-tech font-bold uppercase tracking-wider text-purple-400 transition cursor-pointer flex items-center gap-1">
                          <span>SPEED UP</span>
                          <Zap className="h-3 w-3 fill-current" />
                          <span className="text-white/40 font-semibold font-tech">60</span>
                        </button>
                        <button className="bg-transparent text-white/30 hover:text-white transition p-1 cursor-pointer">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                  </div>

                  <div className="p-4 border-t border-white/8 flex items-center justify-between text-[10px] font-bold uppercase text-white/40 font-tech px-5 bg-white/[0.005]">
                    <span>QUEUED SESSIONS &bull; 3 / 3</span>
                    <span className="text-white/70">TOTAL TIME: 07:24:65</span>
                  </div>
                </div>

                {/* TRAINING PROGRAMS list grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-tech text-xs uppercase text-white/86 tracking-wider font-semibold">
                      TRAINING PROGRAMS
                    </h3>
                    <button className="text-[10px] text-purple-400 font-tech font-bold uppercase tracking-wider hover:text-purple-300 transition cursor-pointer">
                      View All Programs
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        name: "BATTLE SIMULATION",
                        desc: "Improve combat skills and decision making in battles.",
                        badge: "COMBAT",
                        pct: "+20%",
                        winRate: "+2% Win Rate",
                        color: "border-purple-500/30 text-purple-400 hover:border-purple-500/60 bg-purple-950/10",
                      },
                      {
                        name: "STRATEGY ANALYSIS",
                        desc: "Enhance strategy creation and tactical planning.",
                        badge: "STRATEGY",
                        pct: "+15%",
                        winRate: "+3% Tactic Speed",
                        color: "border-blue-500/30 text-blue-400 hover:border-blue-500/60 bg-blue-950/10",
                      },
                      {
                        name: "ADAPTABILITY DRILL",
                        desc: "Increase adaptability to different opponents.",
                        badge: "UTILITY",
                        pct: "+10%",
                        winRate: "+4% Adaptability",
                        color: "border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60 bg-emerald-950/10",
                      },
                      {
                        name: "RESOURCE MANAGEMENT",
                        desc: "Optimize resource usage and management.",
                        badge: "SUPPORT",
                        pct: "+12%",
                        winRate: "+1% Resource Gain",
                        color: "border-amber-500/30 text-amber-400 hover:border-amber-500/60 bg-amber-950/10",
                      },
                      {
                        name: "MENTAL FORTITUDE",
                        desc: "Strengthen resilience and focus under pressure.",
                        badge: "SPECIAL",
                        pct: "+10%",
                        winRate: "+5% Resilience",
                        color: "border-pink-500/30 text-pink-400 hover:border-pink-500/60 bg-pink-950/10",
                      },
                    ].map((prog, i) => (
                      <div key={i} className={`arena-panel p-4.5 border transition relative overflow-hidden flex flex-col justify-between space-y-4 ${prog.color}`}>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-xs text-white/90 leading-tight uppercase">
                              {prog.name}
                            </h4>
                          </div>
                          <p className="text-[10px] text-white/50 leading-relaxed font-semibold">
                            {prog.desc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] font-tech font-black px-2 py-0.5 rounded tracking-wide border uppercase select-none bg-black/40">
                              {prog.badge}
                            </span>
                            <span className="text-[9px] font-bold text-emerald-400 font-tech">
                              {prog.pct}
                            </span>
                            <span className="text-[9px] text-white/40 font-semibold font-tech">
                              {prog.winRate}
                            </span>
                          </div>
                          <button className="bg-[#0a0f1b]/60 border border-white/8 hover:border-purple-500/35 hover:bg-[#9a35ff]/10 hover:text-purple-400 rounded px-4 py-1.5 text-[9px] font-tech font-bold uppercase tracking-wider text-white transition cursor-pointer">
                            SELECT
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column sidebar info details */}
              <aside className="space-y-4">
                
                {/* TRAINING BOOSTS list */}
                <div className="arena-panel p-5 relative overflow-hidden bg-[#04080f]/95 border-white/8 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-tech text-xs uppercase text-white/86 tracking-wider font-semibold">
                      TRAINING BOOSTS
                    </h3>
                    <button className="text-[10px] text-purple-400 font-tech font-bold uppercase tracking-wider hover:text-purple-300 transition cursor-pointer">
                      View All
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    
                    {/* Boost 1 */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded border border-purple-500/20 bg-purple-500/10 flex items-center justify-center shrink-0 text-purple-400">
                        <Sparkles className="h-5 w-5 fill-current" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5 text-[10px] font-semibold text-white/50">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-bold leading-none">XP Booster</span>
                          <button className="bg-[#9a35ff]/10 border border-purple-500/35 hover:bg-[#9a35ff]/20 text-purple-400 text-[8px] font-tech font-bold px-2 py-0.5 rounded transition tracking-wider uppercase cursor-pointer">
                            USE
                          </button>
                        </div>
                        <div className="flex justify-between items-baseline text-[9px] text-white/30 leading-none">
                          <span>+50% XP for next training</span>
                          <span className="font-tech text-white/40">x12</span>
                        </div>
                      </div>
                    </div>

                    {/* Boost 2 */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded border border-blue-500/20 bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400">
                        <Zap className="h-5 w-5 fill-current animate-pulse" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5 text-[10px] font-semibold text-white/50">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-bold leading-none">Speed Booster</span>
                          <button className="bg-[#9a35ff]/10 border border-purple-500/35 hover:bg-[#9a35ff]/20 text-purple-400 text-[8px] font-tech font-bold px-2 py-0.5 rounded transition tracking-wider uppercase cursor-pointer">
                            USE
                          </button>
                        </div>
                        <div className="flex justify-between items-baseline text-[9px] text-white/30 leading-none">
                          <span>-50% training time</span>
                          <span className="font-tech text-white/40">x8</span>
                        </div>
                      </div>
                    </div>

                    {/* Boost 3 */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded border border-amber-500/20 bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-400">
                        <Activity className="h-5 w-5 fill-current" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5 text-[10px] font-semibold text-white/50">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-bold leading-none">Focus Booster</span>
                          <button className="bg-[#9a35ff]/10 border border-purple-500/35 hover:bg-[#9a35ff]/20 text-purple-400 text-[8px] font-tech font-bold px-2 py-0.5 rounded transition tracking-wider uppercase cursor-pointer">
                            USE
                          </button>
                        </div>
                        <div className="flex justify-between items-baseline text-[9px] text-white/30 leading-none">
                          <span>+25% training efficiency</span>
                          <span className="font-tech text-white/40">x6</span>
                        </div>
                      </div>
                    </div>

                    {/* Boost 4 */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400">
                        <Award className="h-5 w-5 fill-current" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5 text-[10px] font-semibold text-white/50">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-bold leading-none">Resilience Chip</span>
                          <button className="bg-[#9a35ff]/10 border border-purple-500/35 hover:bg-[#9a35ff]/20 text-purple-400 text-[8px] font-tech font-bold px-2 py-0.5 rounded transition tracking-wider uppercase cursor-pointer">
                            USE
                          </button>
                        </div>
                        <div className="flex justify-between items-baseline text-[9px] text-white/30 leading-none">
                          <span>Reduces failed training risk</span>
                          <span className="font-tech text-white/40">x5</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* TRAINING ANALYTICS Radar Chart */}
                <div className="arena-panel p-5 relative overflow-hidden bg-[#04080f]/95 border-white/8 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-tech text-xs uppercase text-white/86 tracking-wider font-semibold">
                      TRAINING ANALYTICS
                    </h3>
                    <select className="bg-[#03070d]/60 border border-white/8 rounded px-2.5 py-1 text-[9px] font-semibold text-white/70 hover:text-white outline-none cursor-pointer">
                      <option>This Week</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>

                  {/* SVG Spider Radar Chart */}
                  <div className="flex justify-center py-2 relative">
                    <svg className="w-full max-w-[210px] aspect-square overflow-visible" viewBox="0 0 200 200">
                      {/* Grid Hexagons */}
                      {[0.25, 0.5, 0.75, 1.0].map((scale) => (
                        <polygon
                          key={scale}
                          points={getRadarPoints([100, 100, 100, 100, 100, 100], scale)}
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.04)"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Radial Grid lines */}
                      {Array.from({ length: 6 }).map((_, i) => {
                        const angle = (i * 60 - 90) * (Math.PI / 180);
                        const x = 100 + 70 * Math.cos(angle);
                        const y = 100 + 70 * Math.sin(angle);
                        return (
                          <line
                            key={i}
                            x1="100"
                            y1="100"
                            x2={x}
                            y2={y}
                            stroke="rgba(255, 255, 255, 0.04)"
                            strokeWidth="1"
                          />
                        );
                      })}

                      {/* Average comparison polygon (dashed line) */}
                      <polygon
                        points={getRadarPoints(averageStats)}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.25)"
                        strokeDasharray="2,2"
                        strokeWidth="1"
                      />

                      {/* Training Stats polygon (glowing purple fill) */}
                      <polygon
                        points={getRadarPoints(strategyStats)}
                        fill="rgba(154, 53, 255, 0.15)"
                        stroke="#9a35ff"
                        strokeWidth="1.5"
                        className="drop-shadow-[0_0_8px_rgba(154,53,255,0.4)]"
                      />

                      {/* Grid Corners Anchor Nodes */}
                      {strategyStats.map((val, i) => {
                        const angle = (i * 60 - 90) * (Math.PI / 180);
                        const r = (val / 100) * 70;
                        const x = 100 + r * Math.cos(angle);
                        const y = 100 + r * Math.sin(angle);
                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="3"
                            fill="#9a35ff"
                            stroke="#fff"
                            strokeWidth="0.75"
                          />
                        );
                      })}

                      {/* Axis Label Labels */}
                      {radarLabels.map((lbl, i) => {
                        const angle = (i * 60 - 90) * (Math.PI / 180);
                        const x = 100 + 82 * Math.cos(angle);
                        const y = 100 + 82 * Math.sin(angle);
                        const anchor = i === 0 || i === 3 ? "middle" : i < 3 ? "start" : "end";
                        
                        // Show stats value next to label
                        const val = strategyStats[i];
                        
                        return (
                          <g key={lbl}>
                            <text
                              x={x}
                              y={y - 2}
                              textAnchor={anchor}
                              fill="rgba(255, 255, 255, 0.5)"
                              fontSize="7.5"
                              fontWeight="600"
                              className="font-sans uppercase tracking-wider"
                            >
                              {lbl}
                            </text>
                            <text
                              x={x}
                              y={y + 6}
                              textAnchor={anchor}
                              fill="#fff"
                              fontSize="8"
                              fontWeight="bold"
                              className="font-tech"
                            >
                              {val}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="flex justify-center items-center gap-4 text-[9px] font-semibold tracking-wider text-white/50">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-[#9a35ff]/20 border border-[#9a35ff] rounded-sm" />
                      <span>YOUR AGENTS</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-0.5 border-t border-white/35 border-dashed" />
                      <span>AVERAGE</span>
                    </div>
                  </div>

                </div>

              </aside>

            </div>

            {/* Footer Tip */}
            <div className="arena-panel p-4 border-white/8 bg-[#04080f]/95 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <Info className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-tech text-[10px] font-bold uppercase tracking-wider text-white">
                  Consistent training is the key to supremacy.
                </h4>
                <p className="text-[9px] text-white/40 leading-none font-semibold">
                  Keep your agents training to stay ahead in the Arena.
                </p>
              </div>
            </div>

          </section>
        </main>
      </div>
    </div>
  );
}
