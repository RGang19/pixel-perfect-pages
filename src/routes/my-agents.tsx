import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  UserRound,
  Radio,
  Swords,
  TrendingUp,
  Coins,
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  Hexagon,
  LineChart,
  Info,
} from "lucide-react";
import { Sidebar, Topbar } from "./dashboard";

// Asset Imports
import zeroGLogo from "@/assets/0G Logo.png";
import agentNexus from "@/assets/agent-nexus.jpg";
import agentShadow from "@/assets/agent-shadow.jpg";
import agentAegis from "@/assets/agent-aegis.jpg";
import agentVoid from "@/assets/agent-voidwalker.jpg";
import agentRage from "@/assets/agent-rageborn.jpg";

export const Route = createFileRoute("/my-agents")({
  component: MyAgentsPage,
});

export function MyAgentsPage() {
  return <DisabledMyAgentsPage />;
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

function DisabledMyAgentsPage() {
  const [activeFilterTab, setActiveFilterTab] = useState("ALL AGENTS");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Recently Used");

  const filterTabs = [
    { label: "ALL AGENTS", key: "ALL AGENTS" },
    { label: "ACTIVE (3)", key: "ACTIVE" },
    { label: "INACTIVE (2)", key: "INACTIVE" },
    { label: "ARCHIVED (0)", key: "ARCHIVED" },
  ];

  const initialAgents = [
    {
      id: "NEXUS-01",
      name: "NEXUS-01",
      clanName: "ZeroG Clan &bull; Assassin",
      clanType: "zerog",
      active: true,
      level: 12,
      xp: 2450,
      xpTotal: 3600,
      battles: 32,
      winRate: 62.5,
      powerScore: 12850,
      image: agentNexus,
    },
    {
      id: "SHADOW-9",
      name: "SHADOW-9",
      clanName: "Solana Clan &bull; Tactician",
      clanType: "solana",
      active: true,
      level: 11,
      xp: 1890,
      xpTotal: 3200,
      battles: 28,
      winRate: 60.7,
      powerScore: 11230,
      image: agentShadow,
    },
    {
      id: "AEGIS-07",
      name: "AEGIS-07",
      clanName: "Base Clan &bull; Guardian",
      clanType: "base",
      active: true,
      level: 10,
      xp: 1200,
      xpTotal: 2800,
      battles: 25,
      winRate: 64.0,
      powerScore: 10420,
      image: agentAegis,
    },
    {
      id: "VOIDWALKER",
      name: "VOIDWALKER",
      clanName: "ZeroG Clan &bull; Striker",
      clanType: "zerog",
      active: false,
      level: 8,
      xp: 650,
      xpTotal: 2000,
      battles: 18,
      winRate: 55.6,
      powerScore: 7890,
      image: agentVoid,
    },
    {
      id: "RAGEBORN",
      name: "RAGEBORN",
      clanName: "Base Clan &bull; Berserker",
      clanType: "base",
      active: false,
      level: 6,
      xp: 350,
      xpTotal: 1600,
      battles: 10,
      winRate: 50.0,
      powerScore: 6250,
      image: agentRage,
    },
  ];

  // Filtering Logic
  const filteredAgents = initialAgents.filter((agent) => {
    const matchesTab =
      activeFilterTab === "ALL AGENTS" ||
      (activeFilterTab === "ACTIVE" && agent.active) ||
      (activeFilterTab === "INACTIVE" && !agent.active) ||
      (activeFilterTab === "ARCHIVED" && false);

    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#03070d] text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_15%,rgba(155,51,255,0.12),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(33,150,255,0.06),transparent_35%)]" />

      <div className="relative flex min-h-screen">
        <Sidebar active="My Agents" />
        <main className="min-w-0 flex-1 lg:ml-[225px]">
          <Topbar />

          <section className="mx-auto max-w-[1284px] px-4 py-5 sm:px-6 lg:px-8 space-y-4">
            
            {/* Top Title Section */}
            <div>
              <h1 className="font-tech text-3xl font-bold tracking-tight text-white uppercase">MY AGENTS</h1>
              <p className="mt-1 text-[11px] text-white/55 font-medium">
                Manage, train, and deploy your AI agents.
              </p>
            </div>

            {/* Top Metric Strip */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
              
              <div className="arena-panel p-4 flex items-center justify-between border-white/8 bg-[#04080f]/90">
                <div className="space-y-1">
                  <span className="text-[9px] font-tech font-bold uppercase text-white/40 tracking-wider">TOTAL AGENTS</span>
                  <span className="font-tech text-xl font-bold text-white block">5</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <UserRound className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="arena-panel p-4 flex items-center justify-between border-white/8 bg-[#04080f]/90">
                <div className="space-y-1">
                  <span className="text-[9px] font-tech font-bold uppercase text-white/40 tracking-wider">ACTIVE AGENTS</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-tech text-xl font-bold text-white">3</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Radio className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="arena-panel p-4 flex items-center justify-between border-white/8 bg-[#04080f]/90">
                <div className="space-y-1">
                  <span className="text-[9px] font-tech font-bold uppercase text-white/40 tracking-wider">TOTAL BATTLES</span>
                  <span className="font-tech text-xl font-bold text-white block">128</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Swords className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="arena-panel p-4 flex items-center justify-between border-white/8 bg-[#04080f]/90">
                <div className="space-y-1">
                  <span className="text-[9px] font-tech font-bold uppercase text-white/40 tracking-wider">WIN RATE</span>
                  <span className="font-tech text-xl font-bold text-white block">62.5%</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <TrendingUp className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="arena-panel p-4 flex items-center justify-between border-white/8 bg-[#04080f]/90">
                <div className="space-y-1">
                  <span className="text-[9px] font-tech font-bold uppercase text-white/40 tracking-wider">TOTAL EARNINGS</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-tech text-xl font-bold text-white">1,250.50</span>
                    <span className="text-[8px] font-tech font-bold text-white/40">SARENA</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Coins className="h-4.5 w-4.5" />
                </div>
              </div>

            </div>

            {/* Filter Strip */}
            <div className="arena-panel p-3 border-white/8 bg-[#04080f]/95 flex flex-wrap items-center justify-between gap-3">
              {/* Tabs */}
              <div className="flex flex-wrap items-center gap-1">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveFilterTab(tab.key)}
                    className={`px-3 py-1.5 rounded text-[10px] font-tech font-bold uppercase tracking-wider transition ${
                      activeFilterTab === tab.key
                        ? "bg-[#9a35ff] text-white"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search & Sort & Create */}
              <div className="flex items-center gap-2 max-sm:w-full">
                
                {/* Search */}
                <div className="relative max-sm:flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                  <input
                    type="text"
                    placeholder="Search agents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#03070d]/60 border border-white/8 rounded pl-9 pr-4 py-1.5 text-xs text-white placeholder-white/20 focus:border-purple-500/50 outline-none w-[180px] max-sm:w-full transition font-semibold"
                  />
                </div>

                {/* Sort selector */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#03070d]/60 border border-white/8 rounded px-3 py-1.5 text-xs text-white/70 hover:text-white font-semibold outline-none appearance-none pr-8 cursor-pointer"
                  >
                    <option value="Recently Used">Sort by: Recently Used</option>
                    <option value="Level">Sort by: Level</option>
                    <option value="Win Rate">Sort by: Win Rate</option>
                    <option value="Power Score">Sort by: Power Score</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/35 pointer-events-none" />
                </div>

                {/* Create Agent button */}
                <button className="bg-[#9a35ff] hover:bg-purple-600 rounded px-3.5 py-1.5 text-[10px] font-tech font-bold uppercase tracking-wider text-white transition cursor-pointer flex items-center gap-1.5">
                  <Plus className="h-3.5 w-3.5" />
                  <span>CREATE AGENT</span>
                </button>

              </div>
            </div>

            {/* Agent Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {filteredAgents.map((agent) => {
                const xpPct = Math.round((agent.xp / agent.xpTotal) * 100);
                return (
                  <div
                    key={agent.id}
                    className={`arena-panel border-white/8 bg-[#04080f]/95 overflow-hidden flex flex-col group relative ${
                      agent.active ? "ring-1 ring-[#9a35ff]/15" : ""
                    }`}
                  >
                    {/* Header Image box */}
                    <div className="relative aspect-[3/4] bg-black/45 overflow-hidden flex items-center justify-center border-b border-white/6">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                      />
                      
                      {/* Dark overlay gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#04080f] via-[#04080f]/10 to-transparent" />

                      {/* Active indicator */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-1 bg-black/40 border border-white/10 px-2 py-0.5 rounded text-[8px] font-tech font-black tracking-wide">
                        <span className={`w-1.5 h-1.5 rounded-full ${agent.active ? "bg-emerald-500 animate-pulse" : "bg-white/30"}`} />
                        <span className="uppercase text-white/80">{agent.active ? "ACTIVE" : "INACTIVE"}</span>
                      </div>

                      {/* Action Menu dot button */}
                      <button className="absolute top-3.5 right-3.5 bg-black/40 hover:bg-black/60 border border-white/10 rounded w-5 h-5 flex items-center justify-center text-white/40 hover:text-white transition cursor-pointer">
                        &bull;&bull;&bull;
                      </button>

                    </div>

                    {/* Content Detail */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-3">
                        
                        {/* Name and Clan */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-white/95 leading-none">{agent.name}</span>
                            <Hexagon className="h-3 w-3 fill-[#9a35ff] text-[#9a35ff]" />
                          </div>
                          <div className="flex items-center gap-1.5 text-[9px] text-white/40">
                            <ClanIcon type={agent.clanType} className="h-3.5 w-3.5" />
                            <span dangerouslySetInnerHTML={{ __html: agent.clanName }} />
                          </div>
                        </div>

                        {/* Level and XP progress */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-baseline text-[9px] font-semibold text-white/50">
                            <span className="font-tech text-white font-bold">LV. {agent.level}</span>
                            <span className="font-tech">{agent.xp.toLocaleString()} / {agent.xpTotal.toLocaleString()} XP</span>
                          </div>
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="bg-[#9a35ff] h-full rounded-full" style={{ width: `${xpPct}%` }} />
                          </div>
                        </div>

                        {/* Stats mini-grid */}
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          <div className="space-y-0.5">
                            <span className="text-[8px] text-white/30 uppercase font-semibold">Battles</span>
                            <span className="font-tech text-[10px] text-white/86 font-bold">{agent.battles}</span>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[8px] text-white/30 uppercase font-semibold">Win Rate</span>
                            <span className="font-tech text-[10px] text-white/86 font-bold">{agent.winRate}%</span>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[8px] text-white/30 uppercase font-semibold">Power Score</span>
                            <span className="font-tech text-[10px] text-purple-400 font-bold block truncate">
                              {agent.powerScore.toLocaleString()}
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* Manage Agent actions */}
                      <div className="flex items-center gap-1.5 pt-2 border-t border-white/6">
                        <button className="flex-1 bg-[#0a0f1b]/60 border border-white/8 hover:border-purple-500/35 hover:bg-purple-950/10 rounded py-2 text-[9px] font-tech font-bold uppercase tracking-wider text-purple-400 transition cursor-pointer text-center">
                          MANAGE AGENT
                        </button>
                        <button className="bg-[#0a0f1b]/60 border border-white/8 hover:border-white/20 rounded p-2 text-white/40 hover:text-white transition cursor-pointer">
                          <LineChart className="h-3.5 w-3.5" />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Learn More section */}
            <div className="arena-panel p-4 border-white/8 bg-[#04080f]/95 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Info className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-tech text-[10px] font-bold uppercase tracking-wider text-white">
                    Your AI agents are your digital assets.
                  </h4>
                  <p className="text-[9px] text-white/40 leading-none font-semibold">
                    Train them, battle with them, and own them on-chain.
                  </p>
                </div>
              </div>
              <button className="bg-[#0a0f1b]/60 border border-white/8 hover:border-purple-500/35 hover:bg-purple-950/10 text-purple-400 text-[9px] font-tech font-bold uppercase tracking-wider px-5 py-2.5 rounded transition flex items-center gap-1.5 cursor-pointer">
                <span>LEARN MORE</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </section>
        </main>
      </div>
    </div>
  );
}
