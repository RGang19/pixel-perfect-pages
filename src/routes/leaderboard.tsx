import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  Bell,
  Box,
  ChevronDown,
  ChevronRight,
  Crown,
  Gift,
  Hexagon,
  Info,
  Menu,
  Swords,
  Trophy,
  Wallet,
} from "lucide-react";
import { Sidebar, Topbar } from "./dashboard";
import zeroGLogo from "@/assets/0G Logo.png";
import kultLogo from "@/assets/Kult Logo.png";
import agentNexus from "@/assets/agent-nexus.jpg";
import agentShadow from "@/assets/agent-shadow.jpg";
import agentAegis from "@/assets/agent-aegis.jpg";
import agentVoid from "@/assets/agent-voidwalker.jpg";
import agentRage from "@/assets/agent-rageborn.jpg";
import agentLumen from "@/assets/agent-lumen.jpg";
import dashboardCrest from "@/assets/dashboard-crest.png";

// Import custom generated reward images
import rewardAvatar from "@/assets/reward-avatar.png";
import rewardCrate from "@/assets/reward-crate.png";
import rewardWeapon from "@/assets/reward-weapon.png";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "AI Arena Leaderboard" },
      {
        name: "description",
        content: "AI Arena Leaderboard - Compete with the best and climb your way to the top.",
      },
    ],
  }),
  component: LeaderboardPage,
});

type Tab = "GLOBAL" | "FRIENDS" | "MY RANK";

const GAMES = [
  "WARZONE WARRIORS",
  "HIGHWAY HUSTLE",
  "GUESS THE AI",
  "ZEROG POOL",
  "ROBO WAR",
  "ZERODASH",
] as const;

type GameType = (typeof GAMES)[number];

interface Player {
  name: string;
  avatar: string;
  clanName: string;
  clanIconType: string;
  points: string;
  wins?: number;
  winRate?: string;
  battles?: number;
  rank?: number;
  showHexagon?: boolean;
}

interface GameData {
  podium: [Player, Player, Player];
  table: Player[];
  userRow: Player;
}

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
  return (
    <img src={zeroGLogo} alt="0G Logo" className={`${className} object-contain`} />
  );
}

function KultClanIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <img src={kultLogo} alt="Kult Logo" className={`${className} object-contain`} />
  );
}

function ClanIcon({ type, className = "h-3.5 w-3.5" }: { type: string; className?: string }) {
  if (type === "solana") return <SolanaIcon className={`${className} text-teal-400`} />;
  if (type === "base") return <BaseIcon className={`${className} text-blue-500`} />;
  if (type === "zerog") return <ZeroGClanIcon className={className} />;
  if (type === "kult") return <KultClanIcon className={className} />;
  if (type === "rebel") {
    return (
      <span className="w-3.5 h-3.5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-[9px] shrink-0">
        R
      </span>
    );
  }
  if (type === "shadow") {
    return (
      <span className="w-3.5 h-3.5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center font-bold text-[9px] shrink-0">
        S
      </span>
    );
  }
  if (type === "mecha") {
    return (
      <span className="w-3.5 h-3.5 rounded-full bg-gray-500/20 text-gray-400 flex items-center justify-center font-bold text-[9px] shrink-0">
        M
      </span>
    );
  }
  return null;
}

const LEADERBOARD_DATA: Record<GameType, GameData> = {
  "WARZONE WARRIORS": {
    podium: [
      { name: "NEXUS-01", avatar: agentNexus, clanName: "ZeroG Clan", clanIconType: "zerog", points: "3,215" },
      { name: "ZeroG", avatar: agentVoid, clanName: "Solana Clan", clanIconType: "solana", points: "2,450" },
      { name: "AEGIS-07", avatar: agentAegis, clanName: "Base Clan", clanIconType: "base", points: "1,980" },
    ],
    table: [
      { rank: 4, name: "SHADOW-9", avatar: agentShadow, clanName: "Solana Clan", clanIconType: "solana", wins: 215, winRate: "68.7%", battles: 312, points: "1,760" },
      { rank: 5, name: "VOIDWALKER", avatar: agentVoid, clanName: "ZeroG Clan", clanIconType: "zerog", wins: 198, winRate: "64.3%", battles: 285, points: "1,560", showHexagon: true },
      { rank: 6, name: "RAGEBORN", avatar: agentRage, clanName: "Base Clan", clanIconType: "base", wins: 185, winRate: "62.1%", battles: 273, points: "1,420" },
      { rank: 7, name: "IRONFIST", avatar: agentLumen, clanName: "Rebel Unit", clanIconType: "rebel", wins: 172, winRate: "61.4%", battles: 248, points: "1,280" },
      { rank: 8, name: "SPECTER", avatar: agentAegis, clanName: "Shadow Legion", clanIconType: "shadow", wins: 168, winRate: "60.8%", battles: 236, points: "1,160", showHexagon: true },
      { rank: 9, name: "OMEGA PRIME", avatar: agentLumen, clanName: "Mecha Force", clanIconType: "mecha", wins: 155, winRate: "59.2%", battles: 223, points: "1,080", showHexagon: true },
    ],
    userRow: { rank: 23, name: "KULT GAMER (YOU)", avatar: agentVoid, clanName: "Kult Clan", clanIconType: "kult", wins: 86, winRate: "57.6%", battles: 142, points: "620" },
  },
  "HIGHWAY HUSTLE": {
    podium: [
      { name: "VOIDWALKER", avatar: agentVoid, clanName: "ZeroG Clan", clanIconType: "zerog", points: "2,980" },
      { name: "RAGEBORN", avatar: agentRage, clanName: "Base Clan", clanIconType: "base", points: "2,310" },
      { name: "SHADOW-9", avatar: agentShadow, clanName: "Solana Clan", clanIconType: "solana", points: "1,890" },
    ],
    table: [
      { rank: 4, name: "NEXUS-01", avatar: agentNexus, clanName: "ZeroG Clan", clanIconType: "zerog", wins: 205, winRate: "67.2%", battles: 305, points: "1,690" },
      { rank: 5, name: "AEGIS-07", avatar: agentAegis, clanName: "Base Clan", clanIconType: "base", wins: 182, winRate: "63.8%", battles: 285, points: "1,490" },
      { rank: 6, name: "IRONFIST", avatar: agentLumen, clanName: "Rebel Unit", clanIconType: "rebel", wins: 170, winRate: "61.2%", battles: 278, points: "1,380" },
      { rank: 7, name: "SPECTER", avatar: agentAegis, clanName: "Shadow Legion", clanIconType: "shadow", wins: 158, winRate: "59.8%", battles: 264, points: "1,220" },
      { rank: 8, name: "OMEGA PRIME", avatar: agentLumen, clanName: "Mecha Force", clanIconType: "mecha", wins: 145, winRate: "58.0%", battles: 250, points: "1,110", showHexagon: true },
      { rank: 9, name: "SPEEDRUNNER", avatar: agentShadow, clanName: "Solana Clan", clanIconType: "solana", wins: 132, winRate: "56.4%", battles: 234, points: "1,010" },
    ],
    userRow: { rank: 23, name: "KULT GAMER (YOU)", avatar: agentVoid, clanName: "Kult Clan", clanIconType: "kult", wins: 74, winRate: "54.4%", battles: 136, points: "580" },
  },
  "GUESS THE AI": {
    podium: [
      { name: "SPECTER", avatar: agentAegis, clanName: "Shadow Legion", clanIconType: "shadow", points: "3,110" },
      { name: "NEXUS-01", avatar: agentNexus, clanName: "ZeroG Clan", clanIconType: "zerog", points: "2,540" },
      { name: "VOIDWALKER", avatar: agentVoid, clanName: "ZeroG Clan", clanIconType: "zerog", points: "2,120" },
    ],
    table: [
      { rank: 4, name: "RAGEBORN", avatar: agentRage, clanName: "Base Clan", clanIconType: "base", wins: 224, winRate: "70.1%", battles: 320, points: "1,850" },
      { rank: 5, name: "SHADOW-9", avatar: agentShadow, clanName: "Solana Clan", clanIconType: "solana", wins: 208, winRate: "66.2%", battles: 314, points: "1,710" },
      { rank: 6, name: "AEGIS-07", avatar: agentAegis, clanName: "Base Clan", clanIconType: "base", wins: 188, winRate: "62.7%", battles: 300, points: "1,510" },
      { rank: 7, name: "OMEGA PRIME", avatar: agentLumen, clanName: "Mecha Force", clanIconType: "mecha", wins: 166, winRate: "60.1%", battles: 276, points: "1,340", showHexagon: true },
      { rank: 8, name: "IRONFIST", avatar: agentLumen, clanName: "Rebel Unit", clanIconType: "rebel", wins: 150, winRate: "58.6%", battles: 256, points: "1,210" },
      { rank: 9, name: "MINDREADER", avatar: agentVoid, clanName: "Kult Clan", clanIconType: "kult", wins: 142, winRate: "57.3%", battles: 248, points: "1,120" },
    ],
    userRow: { rank: 23, name: "KULT GAMER (YOU)", avatar: agentVoid, clanName: "Kult Clan", clanIconType: "kult", wins: 98, winRate: "59.0%", battles: 166, points: "740" },
  },
  "ZEROG POOL": {
    podium: [
      { name: "ZeroG", avatar: agentVoid, clanName: "Solana Clan", clanIconType: "solana", points: "3,410" },
      { name: "AEGIS-07", avatar: agentAegis, clanName: "Base Clan", clanIconType: "base", points: "2,680" },
      { name: "RAGEBORN", avatar: agentRage, clanName: "Base Clan", clanIconType: "base", points: "2,050" },
    ],
    table: [
      { rank: 4, name: "VOIDWALKER", avatar: agentVoid, clanName: "ZeroG Clan", clanIconType: "zerog", wins: 235, winRate: "71.2%", battles: 330, points: "1,920", showHexagon: true },
      { rank: 5, name: "SHADOW-9", avatar: agentShadow, clanName: "Solana Clan", clanIconType: "solana", wins: 212, winRate: "67.5%", battles: 314, points: "1,780" },
      { rank: 6, name: "NEXUS-01", avatar: agentNexus, clanName: "ZeroG Clan", clanIconType: "zerog", wins: 198, winRate: "64.3%", battles: 308, points: "1,610" },
      { rank: 7, name: "IRONFIST", avatar: agentLumen, clanName: "Rebel Unit", clanIconType: "rebel", wins: 182, winRate: "62.8%", battles: 290, points: "1,480" },
      { rank: 8, name: "OMEGA PRIME", avatar: agentLumen, clanName: "Mecha Force", clanIconType: "mecha", wins: 165, winRate: "60.0%", battles: 275, points: "1,350", showHexagon: true },
      { rank: 9, name: "CUEBALL", avatar: agentAegis, clanName: "Base Clan", clanIconType: "base", wins: 152, winRate: "58.5%", battles: 260, points: "1,220" },
    ],
    userRow: { rank: 23, name: "KULT GAMER (YOU)", avatar: agentVoid, clanName: "Kult Clan", clanIconType: "kult", wins: 108, winRate: "61.4%", battles: 176, points: "810" },
  },
  "ROBO WAR": {
    podium: [
      { name: "OMEGA PRIME", avatar: agentLumen, clanName: "Mecha Force", clanIconType: "mecha", points: "3,350" },
      { name: "AEGIS-07", avatar: agentAegis, clanName: "Base Clan", clanIconType: "base", points: "2,590" },
      { name: "NEXUS-01", avatar: agentNexus, clanName: "ZeroG Clan", clanIconType: "zerog", points: "2,180" },
    ],
    table: [
      { rank: 4, name: "RAGEBORN", avatar: agentRage, clanName: "Base Clan", clanIconType: "base", wins: 242, winRate: "72.2%", battles: 335, points: "1,980" },
      { rank: 5, name: "VOIDWALKER", avatar: agentVoid, clanName: "ZeroG Clan", clanIconType: "zerog", wins: 220, winRate: "68.3%", battles: 322, points: "1,810", showHexagon: true },
      { rank: 6, name: "SHADOW-9", avatar: agentShadow, clanName: "Solana Clan", clanIconType: "solana", wins: 204, winRate: "65.0%", battles: 314, points: "1,680" },
      { rank: 7, name: "IRONFIST", avatar: agentLumen, clanName: "Rebel Unit", clanIconType: "rebel", wins: 186, winRate: "62.4%", battles: 298, points: "1,520" },
      { rank: 8, name: "SPECTER", avatar: agentAegis, clanName: "Shadow Legion", clanIconType: "shadow", wins: 170, winRate: "60.3%", battles: 282, points: "1,390", showHexagon: true },
      { rank: 9, name: "CYBERTRON", avatar: agentLumen, clanName: "Rebel Unit", clanIconType: "rebel", wins: 155, winRate: "58.5%", battles: 265, points: "1,260" },
    ],
    userRow: { rank: 23, name: "KULT GAMER (YOU)", avatar: agentVoid, clanName: "Kult Clan", clanIconType: "kult", wins: 92, winRate: "57.5%", battles: 160, points: "710" },
  },
  "ZERODASH": {
    podium: [
      { name: "SHADOW-9", avatar: agentShadow, clanName: "Solana Clan", clanIconType: "solana", points: "3,050" },
      { name: "ZeroG", avatar: agentVoid, clanName: "Solana Clan", clanIconType: "solana", points: "2,410" },
      { name: "RAGEBORN", avatar: agentRage, clanName: "Base Clan", clanIconType: "base", points: "1,920" },
    ],
    table: [
      { rank: 4, name: "NEXUS-01", avatar: agentNexus, clanName: "ZeroG Clan", clanIconType: "zerog", wins: 218, winRate: "69.4%", battles: 314, points: "1,790" },
      { rank: 5, name: "VOIDWALKER", avatar: agentVoid, clanName: "ZeroG Clan", clanIconType: "zerog", wins: 195, winRate: "65.0%", battles: 300, points: "1,620", showHexagon: true },
      { rank: 6, name: "AEGIS-07", avatar: agentAegis, clanName: "Base Clan", clanIconType: "base", wins: 180, winRate: "62.1%", battles: 290, points: "1,490" },
      { rank: 7, name: "IRONFIST", avatar: agentLumen, clanName: "Rebel Unit", clanIconType: "rebel", wins: 165, winRate: "59.8%", battles: 276, points: "1,360" },
      { rank: 8, name: "OMEGA PRIME", avatar: agentLumen, clanName: "Mecha Force", clanIconType: "mecha", wins: 150, winRate: "57.7%", battles: 260, points: "1,230", showHexagon: true },
      { rank: 9, name: "DASHER", avatar: agentShadow, clanName: "Solana Clan", clanIconType: "solana", wins: 138, winRate: "56.1%", battles: 246, points: "1,120" },
    ],
    userRow: { rank: 23, name: "KULT GAMER (YOU)", avatar: agentVoid, clanName: "Kult Clan", clanIconType: "kult", wins: 82, winRate: "55.4%", battles: 148, points: "680" },
  },
};

export function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("GLOBAL");
  const [selectedGame, setSelectedGame] = useState<GameType>("WARZONE WARRIORS");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedData = LEADERBOARD_DATA[selectedGame];

  return (
    <div className="min-h-screen bg-[#03070d] text-white">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_78%_12%,rgba(139,37,255,0.18),transparent_28%),radial-gradient(circle_at_18%_90%,rgba(33,144,255,0.12),transparent_32%)]" />
      <div className="relative flex min-h-screen">
        <Sidebar active="Leaderboard" />
        <main className="min-w-0 flex-1 lg:ml-[225px]">
          <Topbar />
          <section className="mx-auto max-w-[1284px] px-4 py-6 sm:px-6 lg:px-8">
            {/* Header Title Section */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight uppercase font-tech">LEADERBOARD</h1>
              <p className="mt-1.5 text-sm text-white/55">
                Compete with the best and climb your way to the top.
              </p>
            </div>

            {/* Main grid containing content and right-sidebar */}
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_332px]">
              
              {/* Left Main Column */}
              <div className="min-w-0 space-y-5">
                
                {/* Tabs & Game Mode controls strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-3">
                  <div className="flex gap-6 text-[12px] font-bold uppercase tracking-wider font-tech">
                    {(["GLOBAL", "FRIENDS", "MY RANK"] as Tab[]).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative py-1.5 transition ${
                          activeTab === tab ? "text-white" : "text-white/45 hover:text-white/80"
                        }`}
                      >
                        {tab}
                        {activeTab === tab && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9a35ff] shadow-[0_0_10px_#9a35ff] rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-tech text-white/45 tracking-widest">
                      GAME MODE
                    </span>
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 bg-white/[0.02] border border-white/8 px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded font-tech text-white hover:bg-white/[0.05] transition"
                        id="game-menu-button"
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                      >
                        <span>{selectedGame}</span>
                        <ChevronDown className={`h-3.5 w-3.5 text-white/50 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isDropdownOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setIsDropdownOpen(false)}
                          />
                          <div
                            className="absolute right-0 mt-1.5 w-56 origin-top-right rounded border border-white/10 bg-[#090e19] p-1 shadow-2xl focus:outline-none z-50 animate-in fade-in slide-in-from-top-1 duration-100"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="game-menu-button"
                          >
                            <div className="py-1" role="none">
                              {GAMES.map((game) => (
                                <button
                                  key={game}
                                  onClick={() => {
                                    setSelectedGame(game);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`flex w-full items-center px-3 py-2 text-[9px] font-semibold uppercase tracking-wider rounded font-tech text-left transition ${
                                    selectedGame === game
                                      ? "bg-[#9a35ff]/20 text-[#c78aff]"
                                      : "text-white/70 hover:bg-white/5 hover:text-white"
                                  }`}
                                  role="menuitem"
                                >
                                  {game}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Top 3 Cards Podium */}
                <div className="grid gap-4 sm:grid-cols-3 items-end pt-4">
                  
                  {/* 2nd Place: ZeroG */}
                  <div className="arena-panel relative overflow-hidden p-5 flex flex-col items-center text-center border-white/10 h-[210px] justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] bg-[#04080f]">
                    {/* Card Background Image */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
                      <img src={selectedData.podium[1].avatar} alt="" className="w-full h-full object-cover object-center scale-110 filter blur-[0.5px]" />
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-[#04080f]" />
                    </div>

                    <div className="absolute top-3 left-3 z-10 bg-[#0a1526] rounded-full border border-blue-500/30 w-8 h-8 flex items-center justify-center">
                      <div className="font-tech text-sm font-black text-blue-400">2</div>
                    </div>
                    
                    <div className="mt-2 relative z-10">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/40 glow-blue-500/20">
                        <img src={selectedData.podium[1].avatar} alt={selectedData.podium[1].name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    
                    <div className="mt-2 relative z-10">
                      <div className="flex items-center justify-center gap-1.5 font-semibold text-white">
                        <span>{selectedData.podium[1].name}</span>
                        <Hexagon className="h-3.5 w-3.5 fill-[#9a35ff] text-[#9a35ff]" />
                      </div>
                      <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-white/50">
                        <ClanIcon type={selectedData.podium[1].clanIconType} className="h-3 w-3" />
                        <span>{selectedData.podium[1].clanName}</span>
                      </div>
                    </div>

                    <div className="mt-2 relative z-10 flex items-center gap-1.5 text-sm font-semibold text-white">
                      <Trophy className="h-4 w-4 text-[#ffc000]" />
                      <span>{selectedData.podium[1].points} PTS</span>
                    </div>
                  </div>

                  {/* 1st Place: NEXUS-01 */}
                  <div className="arena-panel relative overflow-hidden p-5 flex flex-col items-center text-center border-[#ffc000]/30 h-[230px] justify-between shadow-[0_0_20px_rgba(255,192,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] bg-[#04080f]">
                    {/* Card Background Image */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-25">
                      <img src={selectedData.podium[0].avatar} alt="" className="w-full h-full object-cover object-center scale-110 filter blur-[0.5px]" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#ffc000]/10 via-transparent to-[#04080f]" />
                    </div>

                    <div className="absolute top-3 left-3 z-10 bg-[#1c190f] rounded-full border border-[#ffc000]/40 w-8 h-8 flex items-center justify-center">
                      <div className="font-tech text-sm font-black text-[#ffc000]">1</div>
                    </div>
                    
                    <div className="mt-2 relative z-10">
                      <div className="w-18 h-18 rounded-full overflow-hidden border-2 border-[#ffc000] shadow-[0_0_15px_rgba(255,192,0,0.25)]">
                        <img src={selectedData.podium[0].avatar} alt={selectedData.podium[0].name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    
                    <div className="mt-2 relative z-10">
                      <div className="flex items-center justify-center gap-1.5 font-bold text-white text-base">
                        <span>{selectedData.podium[0].name}</span>
                        <Hexagon className="h-3.5 w-3.5 fill-[#9a35ff] text-[#9a35ff]" />
                      </div>
                      <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-white/50">
                        <ClanIcon type={selectedData.podium[0].clanIconType} className="h-3.5 w-3.5" />
                        <span>{selectedData.podium[0].clanName}</span>
                      </div>
                    </div>

                    <div className="mt-2 relative z-10 flex items-center gap-1.5 text-base font-bold text-white">
                      <Trophy className="h-4.5 w-4.5 text-[#ffc000]" />
                      <span>{selectedData.podium[0].points} PTS</span>
                    </div>
                  </div>

                  {/* 3rd Place: AEGIS-07 */}
                  <div className="arena-panel relative overflow-hidden p-5 flex flex-col items-center text-center border-orange-900/10 h-[210px] justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] bg-[#04080f]">
                    {/* Card Background Image */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
                      <img src={selectedData.podium[2].avatar} alt="" className="w-full h-full object-cover object-center scale-110 filter blur-[0.5px]" />
                      <div className="absolute inset-0 bg-gradient-to-b from-orange-950/20 via-transparent to-[#04080f]" />
                    </div>

                    <div className="absolute top-3 left-3 z-10 bg-[#1d140e] rounded-full border border-amber-600/30 w-8 h-8 flex items-center justify-center">
                      <div className="font-tech text-sm font-black text-amber-500">3</div>
                    </div>
                    
                    <div className="mt-2 relative z-10">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-600/40 glow-amber-600/20">
                        <img src={selectedData.podium[2].avatar} alt={selectedData.podium[2].name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    
                    <div className="mt-2 relative z-10">
                      <div className="flex items-center justify-center gap-1.5 font-semibold text-white">
                        <span>{selectedData.podium[2].name}</span>
                        <Hexagon className="h-3.5 w-3.5 fill-[#9a35ff] text-[#9a35ff]" />
                      </div>
                      <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-white/50">
                        <ClanIcon type={selectedData.podium[2].clanIconType} className="h-3.5 w-3.5" />
                        <span>{selectedData.podium[2].clanName}</span>
                      </div>
                    </div>

                    <div className="mt-2 relative z-10 flex items-center gap-1.5 text-sm font-semibold text-white">
                      <Trophy className="h-4 w-4 text-[#ffc000]" />
                      <span>{selectedData.podium[2].points} PTS</span>
                    </div>
                  </div>

                </div>

                {/* Leaderboard Rankings Table */}
                <div className="arena-panel overflow-hidden border border-white/8">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/8 bg-white/[0.01] text-white/45 font-tech text-[10px] uppercase tracking-wider">
                          <th className="px-5 py-4 font-semibold">Rank</th>
                          <th className="px-5 py-4 font-semibold">Player</th>
                          <th className="px-5 py-4 font-semibold">Clan</th>
                          <th className="px-5 py-4 font-semibold text-center">Wins</th>
                          <th className="px-5 py-4 font-semibold text-center">Win Rate</th>
                          <th className="px-5 py-4 font-semibold text-center">Battles</th>
                          <th className="px-5 py-4 font-semibold text-right">Points</th>
                          <th className="w-12"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/6 font-medium text-white/86">
                        
                        {selectedData.table.map((player) => (
                          <tr key={player.rank} className="hover:bg-white/[0.02] transition">
                            <td className="px-5 py-4 font-tech text-[11px]">{player.rank}</td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded overflow-hidden border border-white/10 bg-white/5">
                                  <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="font-semibold tracking-wide">{player.name}</span>
                                {player.showHexagon && (
                                  <Hexagon className="h-3 w-3 fill-[#9a35ff] text-[#9a35ff]" />
                                )}
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-1.5 text-white/70">
                                <ClanIcon type={player.clanIconType} className="h-3.5 w-3.5" />
                                <span>{player.clanName}</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-center">{player.wins}</td>
                            <td className="px-5 py-4 text-center">{player.winRate}</td>
                            <td className="px-5 py-4 text-center">{player.battles}</td>
                            <td className="px-5 py-4 text-right font-semibold">{player.points} PTS</td>
                            <td className="px-3 py-4 text-center">
                              <Hexagon className="h-4.5 w-4.5 text-[#9b33ff] fill-[#9b33ff]/10" />
                            </td>
                          </tr>
                        ))}

                        {/* Gap Row */}
                        <tr className="bg-white/[0.005]">
                          <td colSpan={8} className="py-2.5 text-center text-white/20 select-none">
                            •••
                          </td>
                        </tr>

                        {/* Row 23: KULT GAMER (YOU) - HIGHLIGHTED ROW */}
                        <tr className="bg-[#9a35ff]/8 border border-[#9a35ff]/35 shadow-[0_0_15px_rgba(154,53,255,0.08)]">
                          <td className="px-5 py-4 font-tech text-[11px] text-[#d6acff]">
                            {selectedData.userRow.rank}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded overflow-hidden border border-[#9a35ff]/40 bg-[#9a35ff]/25 shadow-[0_0_8px_rgba(154,53,255,0.2)]">
                                <img src={selectedData.userRow.avatar} alt="KULT GAMER" className="w-full h-full object-cover" />
                              </div>
                              <span className="font-bold tracking-wide text-white">{selectedData.userRow.name}</span>
                              <Hexagon className="h-3 w-3 fill-[#9a35ff] text-[#9a35ff]" />
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1.5 text-white">
                              <ClanIcon type={selectedData.userRow.clanIconType} className="h-4.5 w-4.5" />
                              <span className="font-semibold text-white/90">{selectedData.userRow.clanName}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-center text-white/90">{selectedData.userRow.wins}</td>
                          <td className="px-5 py-4 text-center text-[#d6acff]">{selectedData.userRow.winRate}</td>
                          <td className="px-5 py-4 text-center text-white/90">{selectedData.userRow.battles}</td>
                          <td className="px-5 py-4 text-right font-bold text-[#d6acff]">
                            {selectedData.userRow.points} PTS
                          </td>
                          <td className="px-3 py-4 text-center">
                            <Hexagon className="h-4.5 w-4.5 text-[#9b33ff] fill-[#9b33ff]" />
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bottom Notice banner */}
                <div className="flex items-center gap-2.5 px-4 py-3 bg-[#0a101f] border border-blue-900/30 rounded text-[11px] text-blue-400/90 font-medium">
                  <Info className="h-4.5 w-4.5 shrink-0 text-blue-400" />
                  <span>Leaderboards are updated every 10 minutes.</span>
                </div>

              </div>

              {/* Right Sidebar Details Column */}
              <aside className="space-y-4">
                
                {/* Season Card */}
                <div className="arena-panel p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-tech text-sm font-bold tracking-wide">SEASON 1</span>
                    <span className="bg-[#9a35ff]/20 text-[#d7a8ff] border border-[#9a35ff]/40 text-[9px] px-2 py-0.5 rounded font-tech font-bold uppercase animate-pulse">
                      ● LIVE
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-white/45">
                    Season ends in: 12D 14H 25M
                  </p>
                  
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-tech text-white/45 tracking-wider">
                        YOUR SEASON RANK
                      </div>
                      <div className="mt-1 text-lg font-bold font-tech tracking-wide text-[#bf7fff]">
                        DIAMOND III
                      </div>
                      <div className="mt-1 text-[11px] text-white/60">
                        <strong className="text-white">620</strong> / 1,000 PTS
                      </div>
                    </div>
                    <img
                      src={dashboardCrest}
                      alt="Diamond III Crest"
                      className="h-[76px] w-[80px] object-contain drop-shadow-[0_0_12px_rgba(154,53,255,0.25)]"
                    />
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden border border-white/8">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#6e22ff] to-[#bd3aff] shadow-[0_0_8px_#9a35ff]"
                        style={{ width: "62%" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Season Top Rewards Card */}
                <div className="arena-panel p-5 space-y-4">
                  <h3 className="font-tech text-xs uppercase text-white/86 tracking-wider font-semibold">
                    SEASON TOP REWARDS
                  </h3>

                  <div className="space-y-3">
                    
                    {/* Reward 1 */}
                    <div className="flex items-center justify-between bg-white/[0.015] border border-white/6 rounded p-2.5">
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-full w-6 h-6 flex items-center justify-center font-tech text-[10px] font-black text-amber-500">
                          1
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-white">Champion Avatar</div>
                          <div className="text-[10px] text-white/42">Top 1</div>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded border border-white/8 bg-white/5 overflow-hidden">
                        <img src={rewardAvatar} alt="Champion Avatar Reward" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    {/* Reward 2 */}
                    <div className="flex items-center justify-between bg-white/[0.015] border border-white/6 rounded p-2.5">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-400/10 border border-gray-400/30 rounded-full w-6 h-6 flex items-center justify-center font-tech text-[10px] font-black text-gray-400">
                          2
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-white">Legendary Crate</div>
                          <div className="text-[10px] text-white/42">Top 2 - 3</div>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded border border-white/8 bg-white/5 overflow-hidden">
                        <img src={rewardCrate} alt="Legendary Crate Reward" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    {/* Reward 3 */}
                    <div className="flex items-center justify-between bg-white/[0.015] border border-white/6 rounded p-2.5">
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-700/10 border border-amber-700/30 rounded-full w-6 h-6 flex items-center justify-center font-tech text-[10px] font-black text-amber-600">
                          3
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-white">Epic Skin</div>
                          <div className="text-[10px] text-white/42">Top 4 - 10</div>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded border border-white/8 bg-white/5 overflow-hidden">
                        <img src={rewardWeapon} alt="Epic Skin Reward" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    {/* Reward 4 */}
                    <div className="flex items-center justify-between bg-white/[0.015] border border-white/6 rounded p-2.5">
                      <div className="flex items-center gap-3">
                        <div className="text-white/45 font-tech text-[10px] px-1">
                          4 - 100
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-[#00f080]">2,500 $ARENA</div>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded border border-[#ffc000]/25 bg-[#ffc000]/10 flex items-center justify-center text-[#ffc000]">
                        <Hexagon className="h-5.5 w-5.5 fill-[#ffc000]/10" />
                      </div>
                    </div>

                  </div>

                  <button className="flex h-9 w-full items-center justify-center gap-2 rounded border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition font-tech text-[9px] font-semibold uppercase tracking-wider text-white">
                    VIEW ALL REWARDS <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Leaderboard Info Card */}
                <div className="arena-panel p-5 space-y-4">
                  <h3 className="font-tech text-xs uppercase text-white/86 tracking-wider font-semibold">
                    LEADERBOARD INFO
                  </h3>

                  <ul className="space-y-3.5">
                    <li className="flex gap-3 text-[11px] leading-relaxed text-white/66">
                      <Trophy className="h-4.5 w-4.5 text-white/45 shrink-0" />
                      <span>Climb the ranks by winning battles and earning points.</span>
                    </li>
                    <li className="flex gap-3 text-[11px] leading-relaxed text-white/66">
                      <Swords className="h-4.5 w-4.5 text-white/45 shrink-0" />
                      <span>Different game modes have separate leaderboards.</span>
                    </li>
                    <li className="flex gap-3 text-[11px] leading-relaxed text-white/66">
                      <Gift className="h-4.5 w-4.5 text-white/45 shrink-0" />
                      <span>Rewards are distributed at the end of each season.</span>
                    </li>
                  </ul>
                </div>

              </aside>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
