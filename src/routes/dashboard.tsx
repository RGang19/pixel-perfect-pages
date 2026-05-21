import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Bell,
  Box,
  ChevronLeft,
  ChevronRight,
  Crown,
  Cuboid,
  FileText,
  Hexagon,
  Gamepad2,
  Home,
  LayoutDashboard,
  Menu,
  Package,
  Radio,
  Settings,
  Shield,
  ShoppingCart,
  Swords,
  Trophy,
  UserRoundCog,
  Wallet,
  X,
} from "lucide-react";
import zeroGLogo from "@/assets/0G Logo.png";
import agentNexus from "@/assets/agent-nexus.jpg";
import agentShadow from "@/assets/agent-shadow.jpg";
import agentAegis from "@/assets/agent-aegis.jpg";
import agentVoid from "@/assets/agent-voidwalker.jpg";
import agentRage from "@/assets/agent-rageborn.jpg";
import dashboardCrest from "@/assets/dashboard-crest.png";
import dashboardLiveCard from "@/assets/dashboard-live-card.png";
import dashboardAvatar from "@/assets/dashboard-avatar.png";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "AI Arena Dashboard" },
      {
        name: "description",
        content: "AI Arena player dashboard for agents, battles, quests, and autonomous status.",
      },
    ],
  }),
  component: Dashboard,
});

const navItems: { label: string; icon: any; href: string; tag?: string }[] = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Games", icon: Gamepad2, href: "/#games" },
  { label: "My Agents", icon: UserRoundCog, href: "/my-agents" },
  { label: "Training", icon: Cuboid, href: "/training" },
  { label: "Battles", icon: Swords, href: "/battles" },
  { label: "Autonomous", icon: Radio, href: "/autonomous", tag: "New" },
  { label: "Inventory", icon: Package, href: "/inventory" },
  { label: "Achievements", icon: Trophy, href: "/achievements" },
  { label: "Leaderboard", icon: Crown, href: "/leaderboard" },
  { label: "Moments", icon: FileText, href: "/moments" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

const traits = [
  { name: "Aggression", value: 82 },
  { name: "Patience", value: 68 },
  { name: "Adaptability", value: 78 },
  { name: "Resilience", value: 70 },
  { name: "Creativity", value: 62 },
  { name: "Loyalty", value: 55 },
  { name: "Deception", value: 72 },
  { name: "Precision", value: 75 },
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-[#03070d] text-white">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_78%_12%,rgba(139,37,255,0.18),transparent_28%),radial-gradient(circle_at_18%_90%,rgba(33,144,255,0.12),transparent_32%)]" />
      <div className="relative flex min-h-screen">
        <Sidebar active="Dashboard" />
        <main className="min-w-0 flex-1 lg:ml-[225px]">
          <Topbar />
          <section className="mx-auto max-w-[1284px] px-4 py-5 sm:px-6 lg:px-8">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_376px]">
              <div className="min-w-0 space-y-4">
                <HeroStats />
                <AgentPanel />
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.07fr)_minmax(0,0.93fr)]">
                  <RecentActivity />
                  <Quests />
                </div>
                <BattleStrip />
              </div>
              <aside className="space-y-4">
                <BalancePanel />
                <TraitsPanel />
                <AutonomousPanel />
                <QuickActions />
              </aside>
            </div>
          </section>
          <DashboardFooter />
        </main>
      </div>
    </div>
  );
}

export function Sidebar({ active = "Dashboard" }: { active?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("toggle-mobile-sidebar", handleToggle);
    window.addEventListener("close-mobile-sidebar", handleClose);
    return () => {
      window.removeEventListener("toggle-mobile-sidebar", handleToggle);
      window.removeEventListener("close-mobile-sidebar", handleClose);
    };
  }, []);

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile/tablet) */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-[225px] flex-col overflow-y-auto border-r border-white/12 bg-[#050913]/95">
        <a href="/" className="shrink-0 px-9 pt-5 pb-5">
          <div className="font-tech text-3xl font-bold tracking-[0.03em] leading-none">
            AI ARE<span className="text-[#9a35ff]">NA</span>
          </div>
          <div className="mt-1 text-[8px] uppercase tracking-[0.34em] text-white/55">
            Powered by Kult Games
          </div>
        </a>
        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3">
          {navItems.map((item) => (
            <a
              href={item.href}
              key={item.label}
              className={`flex h-[42px] items-center gap-4 rounded-md border px-5 text-[12px] font-semibold uppercase transition ${
                item.label === active
                  ? "border-[#8f27ff]/55 bg-[#8f27ff]/15 text-white shadow-[inset_3px_0_0_#a029ff]"
                  : "border-transparent text-white/68 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="min-w-0 flex-1">{item.label}</span>
              {item.tag && (
                <span className="rounded-sm border border-[#9b32ff] px-1.5 py-0.5 text-[9px] text-[#b95cff]">
                  {item.tag}
                </span>
              )}
            </a>
          ))}
          <a
            href="/#games"
            className="btn-primary mt-2 flex h-11 items-center justify-center gap-2 rounded px-4 font-tech text-[10px]"
          >
            EXPLORE NOW <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>
        <div className="shrink-0 p-4">
          <div className="relative overflow-hidden rounded-md border border-white/12 bg-[#080d19]">
            <img
              src={dashboardLiveCard}
              alt="AI Arena live promo"
              className="h-[clamp(150px,20vh,220px)] w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080817] via-transparent to-transparent" />
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer menu panel */}
          <aside className="fixed inset-y-0 left-0 z-50 w-[225px] flex flex-col overflow-y-auto border-r border-white/12 bg-[#050913] p-0 animate-in slide-in-from-left duration-300">
            {/* Close button */}
            <div className="flex justify-end p-3">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/55 hover:text-white hover:bg-white/5 rounded transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <a href="/" className="shrink-0 px-9 pt-2 pb-8">
              <div className="font-tech text-3xl font-bold tracking-[0.03em] leading-none">
                AI ARE<span className="text-[#9a35ff]">NA</span>
              </div>
              <div className="mt-1 text-[8px] uppercase tracking-[0.34em] text-white/55">
                Powered by Kult Games
              </div>
            </a>

            <nav className="shrink-0 space-y-1 px-3">
              {navItems.map((item) => (
                <a
                  href={item.href}
                  key={item.label}
                  onClick={() => setIsOpen(false)}
                  className={`flex h-[46px] items-center gap-4 rounded-md border px-5 text-[12px] font-semibold uppercase transition ${
                    item.label === active
                      ? "border-[#8f27ff]/55 bg-[#8f27ff]/15 text-white shadow-[inset_3px_0_0_#a029ff]"
                      : "border-transparent text-white/68 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="min-w-0 flex-1">{item.label}</span>
                  {item.tag && (
                    <span className="rounded-sm border border-[#9b32ff] px-1.5 py-0.5 text-[9px] text-[#b95cff]">
                      {item.tag}
                    </span>
                  )}
                </a>
              ))}
              <a
                href="/#games"
                onClick={() => setIsOpen(false)}
                className="btn-primary mt-2 flex h-11 items-center justify-center gap-2 rounded px-4 font-tech text-[10px]"
              >
                EXPLORE NOW <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </nav>

            <div className="mt-auto shrink-0 p-4">
              <div className="relative overflow-hidden rounded-md border border-white/12 bg-[#080d19]">
                <img
                  src={dashboardLiveCard}
                  alt="AI Arena live promo"
                  className="h-[180px] w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080817] via-transparent to-transparent" />
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export function Topbar() {
  const [openPanel, setOpenPanel] = useState<"arena" | "wallet" | "notifications" | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  const togglePanel = (panel: "arena" | "wallet" | "notifications") => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  const handleConnectWallet = () => {
    setIsConnected((current) => !current);
    setOpenPanel("wallet");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#03070d]/88 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[68px] max-w-[1284px] flex-wrap items-center justify-between gap-2 px-4 py-2 sm:gap-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <a href="/" className="lg:hidden font-tech text-xl font-bold">
            AI ARE<span className="text-[#9a35ff]">NA</span>
          </a>
          <button
            type="button"
            onClick={() => togglePanel("arena")}
            className="flex shrink-0 items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-2 font-tech text-[10px] transition hover:bg-white/6 sm:gap-3 sm:text-xs"
          >
            <span className="flex items-center gap-2 text-[#ffc000]">
              <Hexagon className="h-4 w-4" /> $ARENA 1.00
            </span>
            <span className="text-[#00f080]">+4.35%</span>
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => togglePanel("wallet")}
            className="flex h-10 items-center gap-2 rounded-md border border-white/12 bg-white/[0.02] px-2 font-tech text-xs text-white/86 transition hover:bg-white/6 sm:px-3"
          >
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">{isConnected ? "0x63f6...5eca" : "Wallet"}</span>
            <ChevronRight className="hidden h-3.5 w-3.5 rotate-90 sm:block" />
          </button>
          <a href="/my-agents" aria-label="Open my agents">
            <img
              src={dashboardAvatar}
              alt="Wallet avatar"
              className="h-9 w-9 rounded-lg border border-[#8b27ff]/40 object-cover transition hover:border-[#b54cff] sm:h-10 sm:w-10"
            />
          </a>
          <button
            type="button"
            onClick={() => {
              togglePanel("notifications");
              setHasUnreadNotifications(false);
            }}
            className="relative rounded-md p-2 text-white/70 transition hover:bg-white/5 hover:text-white"
            aria-label="Open notifications"
          >
            <Bell className="h-5 w-5" />
            {hasUnreadNotifications && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#8b29ff]" />
            )}
          </button>
          <button
            type="button"
            onClick={handleConnectWallet}
            className="btn-primary block rounded-md px-3 py-2.5 font-tech text-[10px] sm:px-5 sm:py-3 sm:text-[11px]"
          >
            {isConnected ? "DISCONNECT" : "CONNECT WALLET"}
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-mobile-sidebar"))}
            className="lg:hidden rounded-md p-2 text-white/72 hover:text-white hover:bg-white/5 transition cursor-pointer"
            aria-label="Open navigation"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      {openPanel && (
        <div className="absolute right-4 top-full z-50 w-[calc(100vw-2rem)] max-w-sm rounded-md border border-white/12 bg-[#060b15] p-4 shadow-2xl shadow-black/40 sm:right-6 lg:right-8">
          {openPanel === "arena" && (
            <div>
              <div className="flex items-center justify-between">
                <span className="font-tech text-xs uppercase text-white/55">$Arena Market</span>
                <span className="font-tech text-xs text-[#00f080]">+4.35%</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-2xl font-semibold">$1.00</span>
                <a href="/leaderboard" className="font-tech text-[10px] text-[#b65cff] hover:text-white">
                  VIEW RANKS
                </a>
              </div>
            </div>
          )}
          {openPanel === "wallet" && (
            <div>
              <div className="flex items-center justify-between">
                <span className="font-tech text-xs uppercase text-white/55">Wallet</span>
                <span className={`font-tech text-[10px] ${isConnected ? "text-[#00f080]" : "text-white/45"}`}>
                  {isConnected ? "CONNECTED" : "DISCONNECTED"}
                </span>
              </div>
              <div className="mt-3 rounded border border-white/10 bg-white/[0.02] p-3 font-tech text-xs">
                {isConnected ? "0x63f6...5eca" : "Connect a wallet to access your arena balance."}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href="/inventory"
                  className="rounded-md border border-white/10 px-3 py-2 text-center font-tech text-[10px] text-white/76 hover:bg-white/5"
                >
                  INVENTORY
                </a>
                <button
                  type="button"
                  onClick={handleConnectWallet}
                  className="rounded-md border border-[#8b29ff]/60 bg-[#46136f]/70 px-3 py-2 font-tech text-[10px] hover:bg-[#5b1b90]"
                >
                  {isConnected ? "DISCONNECT" : "CONNECT"}
                </button>
              </div>
            </div>
          )}
          {openPanel === "notifications" && (
            <div>
              <div className="flex items-center justify-between">
                <span className="font-tech text-xs uppercase text-white/55">Notifications</span>
                <button
                  type="button"
                  onClick={() => setOpenPanel(null)}
                  className="font-tech text-[10px] text-[#b65cff] hover:text-white"
                >
                  CLOSE
                </button>
              </div>
              <div className="mt-3 space-y-3 text-xs">
                <a href="/battles" className="block rounded border border-white/8 bg-white/[0.02] p-3 hover:bg-white/5">
                  NEXUS-01 battle result is ready.
                </a>
                <a href="/training" className="block rounded border border-white/8 bg-white/[0.02] p-3 hover:bg-white/5">
                  Training slot completed.
                </a>
                <a href="/achievements" className="block rounded border border-white/8 bg-white/[0.02] p-3 hover:bg-white/5">
                  New achievement progress unlocked.
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function HeroStats() {
  const stats = [
    { label: "Total Agents", value: "5", icon: Box, color: "#8b35ff" },
    { label: "Total Battles", value: "128", icon: Swords, color: "#0089ff" },
    { label: "Win Rate", value: "62.5%", icon: ArrowUpRight, color: "#00f080" },
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_490px]">
      <div>
        <div className="font-tech text-[11px] italic text-[#a84cff]">WELCOME BACK,</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Arena Master</h1>
        <p className="mt-1 text-sm text-white/72">Ready your agents. Dominate the Arena.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="arena-panel flex items-center justify-between p-4">
            <div>
              <div className="font-tech text-[9px] uppercase text-white/45">{stat.label}</div>
              <div className="mt-2 text-2xl font-bold">{stat.value}</div>
            </div>
            <stat.icon className="h-8 w-8" style={{ color: stat.color }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentPanel() {
  return (
    <section className="arena-panel overflow-hidden">
      <div className="grid lg:grid-cols-[352px_minmax(0,1fr)]">
        <img
          src={agentNexus}
          alt="NEXUS-01"
          className="h-[286px] w-full object-cover object-center lg:h-full"
        />
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="rounded border border-[#8b29ff] px-2 py-1 font-tech text-[10px] text-[#a84cff]">
                GENESIS
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">NEXUS-01</h2>
              <div className="mt-2 text-sm text-[#b8a7ff]">
                ZeroG Clan <span className="px-2 text-white/45">•</span>{" "}
                <span className="text-[#c645ff]">Assassin ♧</span>
              </div>
            </div>
            <span className="rounded-full bg-[#00e58a]/12 px-4 py-2 font-tech text-[10px] text-[#00f080]">
              ACTIVE
            </span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="font-tech text-sm">LV. 12</span>
            <div className="h-1.5 min-w-0 flex-1 rounded-full bg-white/8">
              <div className="h-full w-[48%] rounded-full bg-gradient-to-r from-[#7430ff] to-[#b12eff]" />
            </div>
            <span className="text-xs text-white/58">2,450 / 3,600 XP</span>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-0 rounded-md border border-white/8 bg-white/[0.015] sm:grid-cols-4">
            <Metric label="Battles" value="32" />
            <Metric label="Wins" value="20" />
            <Metric label="Win Rate" value="62.5%" />
            <Metric label="Power Score" value="12,850" icon />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_180px_50px]">
            <a
              href="/my-agents"
              className="btn-primary flex h-11 items-center justify-center gap-3 rounded-md font-tech text-xs"
            >
              VIEW AGENT <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="/training"
              className="flex h-11 items-center justify-center rounded-md border border-white/13 bg-transparent font-tech text-xs"
            >
              TRAIN AGENT
            </a>
            <a
              href="/my-agents"
              className="flex h-11 items-center justify-center rounded-md border border-white/13 bg-transparent font-tech text-lg sm:col-start-3"
            >
              ...
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, icon = false }: { label: string; value: string; icon?: boolean }) {
  return (
    <div className="border-white/8 px-5 py-4 sm:border-r last:border-r-0">
      <div className="font-tech text-[9px] uppercase text-white/42">{label}</div>
      <div className="mt-1 flex items-center gap-2 text-xl font-semibold">
        {icon && <Hexagon className="h-5 w-5 text-[#9b33ff]" />} {value}
      </div>
    </div>
  );
}

function RecentActivity() {
  const items = [
    {
      icon: Trophy,
      title: "NEXUS-01 won a Ranked Battle",
      sub: "vs VOIDWALKER",
      value: "+24 $ARENA",
      color: "#00e88f",
      time: "2h ago",
    },
    {
      icon: Shield,
      title: "NEXUS-01 completed training",
      sub: "Stealth Mastery Lv. 3",
      value: "+150 XP",
      color: "#a036ff",
      time: "5h ago",
    },
    {
      icon: Hexagon,
      title: "Autonomous earnings collected",
      sub: "From Arena matches",
      value: "+12.50 $ARENA",
      color: "#f6bb00",
      time: "8h ago",
    },
    {
      icon: Swords,
      title: "NEXUS-01 joined Arena Championship",
      sub: "Round 2",
      value: "",
      color: "#0089ff",
      time: "1d ago",
    },
  ];
  return (
    <section className="arena-panel p-4">
      <h3 className="font-tech text-xs uppercase">Recent Activity</h3>
      <div className="mt-4 divide-y divide-white/7">
        {items.map((item) => (
          <div
            key={item.title}
            className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 py-3"
          >
            <div
              className="grid h-9 w-9 place-items-center rounded-full bg-white/5"
              style={{ color: item.color }}
            >
              <item.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 text-xs">
              <div className="truncate text-white/82">{item.title}</div>
              <div className="mt-0.5 text-white/45">{item.sub}</div>
            </div>
            <div className="text-right text-xs">
              {item.value && <div className="font-semibold text-[#00f080]">{item.value}</div>}
              <div className="text-white/45">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Quests() {
  const quests = [
    ["Win 3 battles in any mode", "2 / 3", "+20 $ARENA", 58],
    ["Train your agent 1 time", "1 / 1", "+10 $ARENA ✓", 100],
    ["Earn 50 $ARENA", "30 / 50", "+15 $ARENA ✓", 55],
  ] as const;
  return (
    <section className="arena-panel p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-tech text-xs uppercase">Quests</h3>
        <span className="font-tech text-[10px] text-white/40">RESETS IN 12:45:30</span>
      </div>
      <div className="mt-3 space-y-2">
        {quests.map(([title, count, reward, pct]) => (
          <div key={title} className="rounded-md border border-white/7 bg-white/[0.015] p-3">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span>{title}</span>
              <span className="font-semibold">{count}</span>
              <span className="text-[#00f080]">{reward}</span>
            </div>
            <div className="mt-3 h-1 rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#6737ff] to-[#b048ff]"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <a
        href="/achievements"
        className="mt-3 flex h-10 w-full items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#45156e] to-[#7121c8] font-tech text-xs"
      >
        VIEW ALL QUESTS <ArrowUpRight className="h-4 w-4" />
      </a>
    </section>
  );
}

function BattleStrip() {
  const cards = [
    {
      title: "Ranked Battle",
      sub: "Diamond League",
      left: agentAegis,
      right: agentShadow,
      time: "Today, 08:00 PM",
      reward: "+25 $ARENA",
      color: "#0089ff",
    },
    {
      title: "Arena Championship",
      sub: "Round 2",
      left: agentNexus,
      right: agentVoid,
      time: "Tomorrow, 06:00 PM",
      reward: "+50 $ARENA",
      color: "#8b29ff",
    },
    {
      title: "Community Battle",
      sub: "Open Arena",
      left: agentRage,
      right: agentVoid,
      time: "May 18, 07:00 PM",
      reward: "+10 $ARENA",
      color: "#f4b400",
    },
  ];
  return (
    <section>
      <div className="mb-4 flex items-center gap-4">
        <h3 className="font-tech text-xs uppercase">Battles</h3>
        <div className="h-px flex-1 bg-white/8" />
      </div>
      <div className="relative grid gap-3 md:grid-cols-3">
        <button className="absolute -left-3 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 rounded-full border border-white/15 bg-[#050913] md:grid place-items-center">
          <ChevronLeft className="h-4 w-4" />
        </button>
        {cards.map((card) => (
          <div key={card.title} className="arena-panel relative h-[178px] overflow-hidden p-4">
            <div className="relative z-10 flex items-start gap-3">
              <Shield className="h-8 w-8" style={{ color: card.color }} />
              <div className="font-tech text-[10px] uppercase">
                <div>{card.title}</div>
                <div className="mt-1 text-white/55">{card.sub}</div>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-[1fr_auto_1fr] items-end gap-1 px-3">
              <img
                src={card.left}
                alt=""
                className="h-28 w-full object-cover object-top opacity-90"
              />
              <span className="pb-12 font-tech text-5xl italic text-white/52">VS</span>
              <img
                src={card.right}
                alt=""
                className="h-28 w-full object-cover object-top opacity-90"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 flex justify-between bg-gradient-to-t from-[#070a13] to-transparent px-4 pb-3 pt-8 text-xs">
              <span className="text-white/58">{card.time}</span>
              <span className="text-[#00f080]">{card.reward}</span>
            </div>
          </div>
        ))}
        <button className="absolute -right-3 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 rounded-full border border-white/15 bg-[#050913] md:grid place-items-center">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function BalancePanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
      <section className="arena-panel relative min-h-[84px] overflow-hidden p-4">
        <div className="font-tech text-[10px] uppercase text-white/45">$Arena Balance</div>
        <div className="mt-2 flex items-center gap-4">
          <span className="text-2xl font-semibold">1,250.50</span>
          <Hexagon className="h-9 w-9 text-[#f4b400]" />
        </div>
        <img
          src={dashboardCrest}
          alt=""
          className="absolute right-4 top-0 h-[132px] w-[138px] object-contain opacity-95"
        />
      </section>
      <section className="arena-panel flex items-center justify-between p-4">
        <div>
          <div className="font-tech text-[10px] uppercase text-white/45">Rank</div>
          <div className="mt-2 text-xl font-semibold">#1,248</div>
          <div className="mt-1 text-xs text-white/45">TOP 11%</div>
        </div>
        <ChevronRight className="h-5 w-5 text-white/60" />
      </section>
    </div>
  );
}

function TraitsPanel() {
  return (
    <section className="arena-panel p-4">
      <h3 className="font-tech text-xs uppercase">Traits Overview</h3>
      <div className="mt-3 grid place-items-center">
        <div className="relative h-[210px] w-[250px] max-w-full">
          <svg viewBox="0 0 250 210" className="h-full w-full">
            <polygon
              points="125,18 180,42 216,96 194,158 125,190 56,158 34,96 70,42"
              fill="rgba(123,37,255,.24)"
              stroke="#8531ff"
            />
            <polygon
              points="125,44 164,58 186,96 174,142 125,164 76,142 64,96 86,58"
              fill="rgba(141,41,255,.34)"
              stroke="#b13fff"
              strokeWidth="2"
            />
            {[0, 1, 2].map((i) => (
              <polygon
                key={i}
                points="125,18 180,42 216,96 194,158 125,190 56,158 34,96 70,42"
                fill="none"
                stroke="rgba(255,255,255,.12)"
                transform={`translate(${i * 0.3} ${i * 0.3}) scale(${1 - i * 0.18})`}
                style={{ transformOrigin: "125px 104px" }}
              />
            ))}
          </svg>
          {traits.map((trait, i) => {
            const pos = [
              "left-[112px] top-0 text-center",
              "right-1 top-10 text-right",
              "right-0 top-[92px] text-right",
              "right-8 bottom-6 text-right",
              "left-[105px] bottom-0 text-center",
              "left-8 bottom-6",
              "left-0 top-[92px]",
              "left-4 top-10",
            ][i];
            return (
              <div key={trait.name} className={`absolute text-[10px] text-white/70 ${pos}`}>
                <div>{trait.name}</div>
                <strong className="font-tech text-[#c896ff]">{trait.value}</strong>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-2 flex justify-center gap-8 text-xs text-white/58">
        <span className="flex items-center gap-2">
          <span className="h-px w-6 bg-[#a833ff]" /> This Agent
        </span>
        <span className="flex items-center gap-2">
          <span className="h-px w-6 border-t border-dashed border-white/40" /> Average
        </span>
      </div>
    </section>
  );
}

function AutonomousPanel() {
  return (
    <section className="arena-panel p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-tech text-xs uppercase">Autonomous Status</h3>
        <span className="font-tech text-[10px] text-[#00f080]">
          ACTIVE <Radio className="ml-1 inline h-3.5 w-3.5" />
        </span>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-white/66">
        Your agent is operating autonomously.
        <br />
        Earning, training, and competing while you're away.
      </p>
      <div className="mt-4 grid grid-cols-2 border-t border-white/8 pt-4 text-xs">
        <div className="border-r border-white/8 pr-4">
          <div className="text-white/50">Current Strategy</div>
          <div className="mt-1 flex items-center justify-between font-semibold">
            Balanced Growth <ChevronRight className="h-4 w-4" />
          </div>
        </div>
        <div className="pl-4">
          <div className="text-white/50">Risk Level</div>
          <div className="mt-1 flex items-center justify-between font-semibold">
            Medium <span className="text-[#f4b400]">▮▮▮▮▯</span>
          </div>
        </div>
      </div>
      <a
        href="/autonomous"
        className="mt-4 flex h-10 w-full items-center justify-center gap-3 rounded-md border border-[#8b29ff]/60 bg-[#46136f]/70 font-tech text-xs"
      >
        MANAGE AUTONOMOUS <ArrowUpRight className="h-4 w-4" />
      </a>
    </section>
  );
}

function QuickActions() {
  const actions = [
    { label: "Create Agent", icon: Box, color: "#9b4dff", href: "/my-agents" },
    { label: "Train Agent", icon: Home, color: "#0089ff", href: "/training" },
    { label: "Find Battle", icon: Swords, color: "#ffc000", href: "/battles" },
    { label: "Marketplace", icon: ShoppingCart, color: "#00e68a", href: "/inventory" },
  ];
  return (
    <section className="arena-panel p-4">
      <h3 className="font-tech text-xs uppercase">Quick Actions</h3>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-4">
        {actions.map((action) => (
          <a
            href={action.href}
            key={action.label}
            className="grid h-[88px] place-items-center rounded-md border border-white/10 bg-white/[0.02] p-2"
          >
            <action.icon className="h-9 w-9" style={{ color: action.color }} />
            <span className="font-tech text-[9px] uppercase">{action.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function DashboardFooter() {
  return (
    <footer className="border-t border-white/7 px-4 py-4 text-xs text-white/42 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1284px] items-center justify-between">
        <span>© 2024 AI Arena. All rights reserved.</span>
        <span className="flex items-center gap-3">
          Powered by <img src={zeroGLogo} alt="0G" className="h-5 w-auto" />
        </span>
      </div>
    </footer>
  );
}
