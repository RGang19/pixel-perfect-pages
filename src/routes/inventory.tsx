import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Package,
  Coins,
  FileBox,
  Layers,
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  Sparkles,
  Zap,
  ArrowUpRight,
  Info,
} from "lucide-react";
import { Sidebar, Topbar } from "./dashboard";

// Asset Imports
import zeroGLogo from "@/assets/0G Logo.png";
import weaponAsset from "@/assets/reward-weapon.png";
import crateAsset from "@/assets/reward-crate.png";
import itemSawbot from "@/assets/item-sawbot.png";
import itemDrone from "@/assets/item-drone.png";
import itemRocket from "@/assets/item-rocket.png";
import itemArmor from "@/assets/item-armor.png";

export const Route = createFileRoute("/inventory")({
  component: InventoryPage,
});

export function InventoryPage() {
  return <DisabledInventoryPage />;
}


function ClanIcon({ type, className = "h-3.5 w-3.5" }: { type: string; className?: string }) {
  if (type === "zerog") return <img src={zeroGLogo} alt="0G Logo" className={`${className} object-contain`} />;
  return null;
}

function DisabledInventoryPage() {
  const [activeTab, setActiveTab] = useState("ALL ITEMS");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("All");

  const menuTabs = [
    "ALL ITEMS",
    "WEAPONS",
    "GEAR",
    "MODULES",
    "PARTS",
    "CONSUMABLES",
    "NFTS",
    "RESOURCES",
  ];

  const inventoryItems = [
    {
      id: 1,
      name: "PLASMA RIFLE MK-X",
      rarity: "Epic",
      type: "WEAPONS",
      clanName: "ZeroG Clan &bull; Lv. 12",
      clanType: "zerog",
      owned: 1,
      equipped: true,
      image: weaponAsset,
    },
    {
      id: 2,
      name: "TITAN SAWBOT",
      rarity: "Legendary",
      type: "GEAR",
      clanName: "RoboWars",
      owned: 1,
      image: itemSawbot,
    },
    {
      id: 3,
      name: "AI CORE v2.0",
      rarity: "Epic",
      type: "MODULES",
      clanName: "Universal",
      owned: 3,
      image: crateAsset,
    },
    {
      id: 4,
      name: "ENERGY CELL",
      rarity: "Rare",
      type: "RESOURCES",
      clanName: "Resource",
      owned: 32,
      image: itemDrone,
    },
    {
      id: 5,
      name: "NANO ARMOR",
      rarity: "Uncommon",
      type: "GEAR",
      clanName: "Base Clan",
      owned: 5,
      image: itemArmor,
    },
    {
      id: 6,
      name: "SLICER BLADE",
      rarity: "Epic",
      type: "WEAPONS",
      clanName: "RoboWars",
      owned: 2,
      image: weaponAsset,
    },
    {
      id: 7,
      name: "RECON DRONE",
      rarity: "Rare",
      type: "PARTS",
      clanName: "Universal",
      owned: 4,
      image: itemDrone,
    },
    {
      id: 8,
      name: "DAMAGE BOOSTER",
      rarity: "Epic",
      type: "MODULES",
      clanName: "Universal",
      owned: 6,
      image: crateAsset,
    },
    {
      id: 9,
      name: "SHIELD GENERATOR",
      rarity: "Uncommon",
      type: "GEAR",
      clanName: "Base Clan",
      owned: 7,
      image: itemArmor,
    },
    {
      id: 10,
      name: "ROCKET LAUNCHER",
      rarity: "Legendary",
      type: "WEAPONS",
      clanName: "Warzone Warriors",
      owned: 1,
      image: itemRocket,
    },
    {
      id: 11,
      name: "TARGETING MODULE",
      rarity: "Rare",
      type: "MODULES",
      clanName: "Universal",
      owned: 8,
      image: itemDrone,
    },
    {
      id: 12,
      name: "REPAIR KIT",
      rarity: "Common",
      type: "CONSUMABLES",
      clanName: "Consumable",
      owned: 15,
      image: crateAsset,
    },
  ];

  // Filters logic
  const filteredItems = inventoryItems.filter((item) => {
    const matchesTab = activeTab === "ALL ITEMS" || item.type === activeTab;
    const matchesRarity = selectedRarity === "All" || item.rarity === selectedRarity;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesRarity && matchesSearch;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "legendary":
        return "border-amber-500/40 text-amber-400 bg-amber-950/20";
      case "epic":
        return "border-purple-500/40 text-[#d6acff] bg-purple-950/20";
      case "rare":
        return "border-blue-500/40 text-blue-400 bg-blue-950/20";
      case "uncommon":
        return "border-emerald-500/40 text-emerald-400 bg-emerald-950/20";
      default:
        return "border-white/10 text-white/50 bg-white/5";
    }
  };

  const getRarityTag = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "legendary":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "epic":
        return "bg-purple-500/10 text-[#d6acff] border-purple-500/30";
      case "rare":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "uncommon":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-white/5 text-white/50 border-white/10";
    }
  };

  return (
    <div className="min-h-screen bg-[#03070d] text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_15%,rgba(155,51,255,0.12),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(33,150,255,0.06),transparent_35%)]" />

      <div className="relative flex min-h-screen">
        <Sidebar active="Inventory" />
        <main className="min-w-0 flex-1 lg:ml-[225px]">
          <Topbar />

          <section className="mx-auto max-w-[1284px] px-4 py-5 sm:px-6 lg:px-8 space-y-4">
            
            {/* Top Title Section */}
            <div>
              <h1 className="font-tech text-3xl font-bold tracking-tight text-white uppercase">INVENTORY</h1>
              <p className="mt-1 text-[11px] text-white/55 font-medium">
                Your assets, resources, and items powering your agents.
              </p>
            </div>

            {/* Stats strip */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              <div className="arena-panel p-4 flex items-center justify-between border-white/8 bg-[#04080f]/90">
                <div className="space-y-1">
                  <span className="text-[9px] font-tech font-bold uppercase text-white/40 tracking-wider">TOTAL ASSETS</span>
                  <span className="font-tech text-xl font-bold text-white block">248</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Package className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="arena-panel p-4 flex items-center justify-between border-white/8 bg-[#04080f]/90">
                <div className="space-y-1">
                  <span className="text-[9px] font-tech font-bold uppercase text-white/40 tracking-wider">TOTAL VALUE</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-tech text-xl font-bold text-white">2,450.60</span>
                    <span className="text-[8px] font-tech font-bold text-[#b85eff]">$ARENA</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Coins className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="arena-panel p-4 flex items-center justify-between border-white/8 bg-[#04080f]/90">
                <div className="space-y-1">
                  <span className="text-[9px] font-tech font-bold uppercase text-white/40 tracking-wider">RESOURCES</span>
                  <span className="font-tech text-xl font-bold text-white block">12</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <FileBox className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="arena-panel p-4 flex items-center justify-between border-white/8 bg-[#04080f]/90">
                <div className="space-y-1">
                  <span className="text-[9px] font-tech font-bold uppercase text-white/40 tracking-wider">COLLECTIONS</span>
                  <span className="font-tech text-xl font-bold text-white block">8</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Layers className="h-4.5 w-4.5" />
                </div>
              </div>
            </div>

            {/* Filter Strip */}
            <div className="arena-panel p-3 border-white/8 bg-[#04080f]/95 flex flex-wrap items-center justify-between gap-3">
              {/* Tabs */}
              <div className="flex flex-wrap items-center gap-1">
                {menuTabs.map((tab) => (
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

              {/* Search & Sort */}
              <div className="flex items-center gap-2 max-sm:w-full">
                {/* Search */}
                <div className="relative max-sm:flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#03070d]/60 border border-white/8 rounded pl-9 pr-4 py-1.5 text-xs text-white placeholder-white/20 focus:border-purple-500/50 outline-none w-[180px] max-sm:w-full transition font-semibold"
                  />
                </div>

                {/* Rarity select */}
                <div className="relative">
                  <select
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    className="bg-[#03070d]/60 border border-white/8 rounded px-3 py-1.5 text-xs text-white/70 hover:text-white font-semibold outline-none appearance-none pr-8 cursor-pointer"
                  >
                    <option value="All">Rarity: All</option>
                    <option value="Legendary">Legendary</option>
                    <option value="Epic">Epic</option>
                    <option value="Rare">Rare</option>
                    <option value="Uncommon">Uncommon</option>
                    <option value="Common">Common</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/35 pointer-events-none" />
                </div>

                {/* View toggle layout buttons */}
                <div className="flex items-center border border-white/8 rounded overflow-hidden">
                  <button className="bg-white/5 p-1.5 text-white/80 hover:text-white transition">
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1.5 text-white/30 hover:text-white hover:bg-white/5 transition border-l border-white/8">
                    <List className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Layout Grid */}
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_376px]">
              
              {/* Left Column Inventory Items Grid */}
              <div className="min-w-0 space-y-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`arena-panel border-white/8 bg-[#04080f]/95 overflow-hidden flex flex-col group relative ${
                        item.equipped ? "ring-1 ring-[#9a35ff]/30" : ""
                      }`}
                    >
                      {/* Item Image Box */}
                      <div className="relative aspect-video bg-black/40 border-b border-white/6 overflow-hidden flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#04080f] via-transparent to-transparent" />
                        
                        {/* Equipped Indicator */}
                        {item.equipped && (
                          <div className="absolute top-2.5 right-2.5 bg-[#9a35ff] text-white text-[8px] font-tech font-black px-1.5 py-0.5 rounded tracking-wide border border-purple-400 select-none">
                            EQUIPPED
                          </div>
                        )}

                        {/* Rarity Tag */}
                        <div className={`absolute top-2.5 left-2.5 text-[8px] font-tech font-black px-2 py-0.5 rounded tracking-wider border uppercase select-none ${getRarityTag(item.rarity)}`}>
                          {item.rarity}
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-xs text-white/90 leading-snug group-hover:text-purple-400 transition truncate uppercase">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[9px] text-white/40">
                            {item.clanType && <ClanIcon type={item.clanType} className="h-3 w-3" />}
                            <span dangerouslySetInnerHTML={{ __html: item.clanName }} />
                          </div>
                        </div>

                        {/* Owned Counter */}
                        <div className="flex items-center justify-between text-[10px] text-white/40 font-semibold pt-2.5 border-t border-white/6">
                          <div className="flex items-baseline gap-1">
                            <span className="font-tech text-xs text-white font-bold">{item.owned}</span>
                            <span>Owned</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center pt-2">
                  <button className="bg-[#0a0f1b]/60 border border-white/8 hover:border-purple-500/35 hover:bg-purple-950/10 text-purple-400 text-[10px] font-tech font-bold uppercase tracking-wider px-6 py-2.5 rounded transition flex items-center gap-1.5 cursor-pointer">
                    <span>VIEW MORE ITEMS</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column sidebar info details */}
              <aside className="space-y-4">
                
                {/* INVENTORY OVERVIEW Donut Chart */}
                <div className="arena-panel p-5 relative overflow-hidden bg-[#04080f]/95 border-white/8 space-y-4">
                  <h3 className="font-tech text-xs uppercase text-white/86 tracking-wider font-semibold">
                    INVENTORY OVERVIEW
                  </h3>

                  {/* SVG Donut Chart */}
                  <div className="flex justify-center items-center py-2 relative">
                    <svg className="w-full max-w-[150px] aspect-square" viewBox="0 0 100 100">
                      {/* Background circle ring */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="10" />

                      {/* Segments: Weapons 25%, Gear 20%, Modules 18%, Parts 15%, Consumables 12%, Others 10% */}
                      {/* Radius: 38. Circumference = 2 * Math.PI * 38 = 238.76 */}
                      
                      {/* Weapons (25%): stroke-dasharray="59.7 238.76" stroke-dashoffset="0" color: #9a35ff */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#9a35ff" strokeWidth="10" strokeDasharray="59.7 238.76" strokeDashoffset="0" transform="rotate(-90 50 50)" />

                      {/* Gear (20%): stroke-dasharray="47.75 238.76" stroke-dashoffset="-59.7" color: #3b82f6 */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#3b82f6" strokeWidth="10" strokeDasharray="47.75 238.76" strokeDashoffset="-59.7" transform="rotate(-90 50 50)" />

                      {/* Modules (18%): stroke-dasharray="42.98 238.76" stroke-dashoffset="-107.45" color: #f59e0b */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="10" strokeDasharray="42.98 238.76" strokeDashoffset="-107.45" transform="rotate(-90 50 50)" />

                      {/* Parts (15%): stroke-dasharray="35.81 238.76" stroke-dashoffset="-150.43" color: #10b981 */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray="35.81 238.76" strokeDashoffset="-150.43" transform="rotate(-90 50 50)" />

                      {/* Consumables (12%): stroke-dasharray="28.65 238.76" stroke-dashoffset="-186.24" color: #0ea5e9 */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#0ea5e9" strokeWidth="10" strokeDasharray="28.65 238.76" strokeDashoffset="-186.24" transform="rotate(-90 50 50)" />

                      {/* Others (10%): stroke-dasharray="23.88 238.76" stroke-dashoffset="-214.89" color: #64748b */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#64748b" strokeWidth="10" strokeDasharray="23.88 238.76" strokeDashoffset="-214.89" transform="rotate(-90 50 50)" />

                      {/* Center label */}
                      <g className="font-tech text-center">
                        <text x="50" y="47" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">248</text>
                        <text x="50" y="58" textAnchor="middle" fill="rgba(255, 255, 255, 0.4)" fontSize="6" fontWeight="bold" className="uppercase tracking-wider">Total Items</text>
                      </g>
                    </svg>
                  </div>

                  {/* Legend breakdown list */}
                  <div className="grid grid-cols-2 gap-3 pt-2 text-[10px] font-semibold text-white/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#9a35ff]" />
                        <span>Weapons</span>
                      </div>
                      <span className="font-tech text-white">25%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                        <span>Gear</span>
                      </div>
                      <span className="font-tech text-white">20%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                        <span>Modules</span>
                      </div>
                      <span className="font-tech text-white">18%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                        <span>Parts</span>
                      </div>
                      <span className="font-tech text-white">15%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#0ea5e9]" />
                        <span>Consumables</span>
                      </div>
                      <span className="font-tech text-white">12%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#64748b]" />
                        <span>Others</span>
                      </div>
                      <span className="font-tech text-white">10%</span>
                    </div>
                  </div>

                </div>

                {/* TOP RARITIES list */}
                <div className="arena-panel p-5 relative overflow-hidden bg-[#04080f]/95 border-white/8 space-y-4">
                  <h3 className="font-tech text-xs uppercase text-white/86 tracking-wider font-semibold">
                    TOP RARITIES
                  </h3>

                  <div className="space-y-3 text-[10px] font-semibold text-white/55">
                    {[
                      { rarity: "Legendary", count: 8, pct: "3.2%", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                      { rarity: "Epic", count: 45, pct: "18.1%", color: "text-[#d6acff] bg-purple-500/10 border-purple-500/20" },
                      { rarity: "Rare", count: 76, pct: "30.6%", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                      { rarity: "Uncommon", count: 89, pct: "35.9%", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                      { rarity: "Common", count: 30, pct: "12.2%", color: "text-white/40 bg-white/5 border-white/10" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded border flex items-center justify-center text-[9px] font-tech font-black uppercase ${item.color}`}>
                            {item.rarity[0]}
                          </span>
                          <span className="text-white font-bold leading-none">{item.rarity}</span>
                        </div>
                        <div className="flex items-baseline gap-2 font-tech font-bold">
                          <span className="text-white">{item.count}</span>
                          <span className="text-white/30 text-[9px]">{item.pct}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RESOURCE BALANCE list */}
                <div className="arena-panel p-5 relative overflow-hidden bg-[#04080f]/95 border-white/8 space-y-4">
                  <h3 className="font-tech text-xs uppercase text-white/86 tracking-wider font-semibold">
                    RESOURCE BALANCE
                  </h3>

                  <div className="space-y-3.5 text-[10px] font-semibold text-white/50">
                    {[
                      { name: "Energy Core", value: "1,250", color: "bg-blue-500" },
                      { name: "Scrap Metal", value: "2,450", color: "bg-amber-500" },
                      { name: "Nano Circuit", value: "980", color: "bg-[#9a35ff]" },
                      { name: "AI Chip", value: "1,760", color: "bg-emerald-500" },
                      { name: "Power Cell", value: "3,210", color: "bg-sky-400" },
                      { name: "Token Shard", value: "560", color: "bg-pink-500" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                          <span className="text-white/70 font-semibold">{item.name}</span>
                        </div>
                        <span className="font-tech text-white font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* STORAGE CAPACITY progress */}
                <div className="arena-panel p-5 relative overflow-hidden bg-[#04080f]/95 border-white/8 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-tech text-xs uppercase text-white/86 tracking-wider font-semibold">
                      STORAGE CAPACITY
                    </h3>
                    <div className="flex items-baseline justify-between text-[10px] font-semibold">
                      <div className="flex items-baseline gap-1 font-tech">
                        <span className="text-white font-bold text-sm">248</span>
                        <span className="text-white/40">/ 500</span>
                      </div>
                      <span className="text-white/40 font-tech font-bold">49%</span>
                    </div>

                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-[#9a35ff] h-full rounded-full" style={{ width: "49%" }} />
                    </div>
                  </div>

                  <button className="w-full bg-[#0a0f1b]/60 border border-white/8 hover:border-purple-500/35 hover:bg-purple-950/10 text-purple-400 text-[10px] font-tech font-bold uppercase tracking-wider py-2.5 rounded transition flex items-center justify-center gap-1.5 cursor-pointer">
                    <span>UPGRADE STORAGE</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
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
                  Upgrade your agents and gear to dominate the Arena.
                </h4>
                <p className="text-[9px] text-white/40 leading-none font-semibold">
                  Rare and Legendary items give you a strategic edge in battles.
                </p>
              </div>
            </div>

          </section>
        </main>
      </div>
    </div>
  );
}
