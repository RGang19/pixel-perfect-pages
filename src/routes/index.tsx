import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight, Menu, Box, ArrowUp, Swords, Globe, TrendingUp,
  ChevronLeft, ChevronRight, Eye, Twitter, Send, Youtube, Instagram,
  MessageCircle, Wallet, ArrowRight, Sparkles
} from "lucide-react";
import heroTrio from "@/assets/hero-trio.jpg";
import agentNexus from "@/assets/agent-nexus.jpg";
import agentShadow from "@/assets/agent-shadow.jpg";
import agentAegis from "@/assets/agent-aegis.jpg";
import agentVoid from "@/assets/agent-voidwalker.jpg";
import agentRage from "@/assets/agent-rageborn.jpg";
import agentLumen from "@/assets/agent-lumen.jpg";
import iconTrain from "@/assets/icon-train.jpg";
import iconBattle from "@/assets/icon-battle.jpg";
import iconEarn from "@/assets/icon-earn.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neon Arena — Where AI Agents Battle for Supremacy" },
      { name: "description", content: "Collect, train, and battle unique AI Agents in a Web3 arena. Own your journey. Rule the Arena." },
      { property: "og:title", content: "Neon Arena — AI Agent Battles" },
      { property: "og:description", content: "Collect, train, and battle unique AI Agents in a Web3 arena." },
    ],
  }),
  component: Landing,
});

const agents = [
  { rank: "01", name: "NEXUS-01", chain: "NovaChain", tier: "Legendary", lvl: 12, power: "14,850", img: agentNexus, color: "var(--neon)" },
  { rank: "02", name: "SHADOW-9", chain: "Helios", tier: "Epic", lvl: 11, power: "13,420", img: agentShadow, color: "var(--lime)" },
  { rank: "03", name: "AEGIS-07", chain: "Aether", tier: "Epic", lvl: 12, power: "12,980", img: agentAegis, color: "var(--cyan)" },
  { rank: "04", name: "VOIDWALKER", chain: "NovaChain", tier: "Epic", lvl: 11, power: "12,150", img: agentVoid, color: "var(--neon-2)" },
  { rank: "05", name: "RAGEBORN", chain: "Helios", tier: "Legendary", lvl: 12, power: "11,870", img: agentRage, color: "var(--amber)" },
];

const battles = [
  { tag: "Arena Championship", round: "Round 2", time: "02:45", a: { name: "NEXUS-01", chain: "NovaChain", img: agentNexus }, b: { name: "SHADOW-9", chain: "Helios", img: agentShadow }, views: "1,245" },
  { tag: "Ranked Battle", round: "Diamond League", time: "01:15", a: { name: "AEGIS-07", chain: "Aether", img: agentAegis }, b: { name: "VOIDWALKER", chain: "NovaChain", img: agentVoid }, views: "856" },
  { tag: "Community Battle", round: "Open Arena", time: "00:45", a: { name: "RAGEBORN", chain: "Helios", img: agentRage }, b: { name: "LUMEN-22", chain: "Aether", img: agentLumen }, views: "624" },
];

function Landing() {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <StatsBar />
      <FeaturesBlock />
      <HowItWorks />
      <TopAgents />
      <LiveBattles />
      <PartnersBlock />
      <Subscribe />
      <Footer />
    </div>
  );
}

function Logo({ size = "text-2xl" }: { size?: string }) {
  return (
    <div className="flex flex-col leading-none">
      <span className={`font-display ${size} text-gradient glow-text`}>NEON ARENA</span>
      <span className="text-[9px] tracking-[0.3em] text-muted-foreground font-tech mt-1">POWERED BY KULT GAMES</span>
    </div>
  );
}

function Header() {
  const links = ["Home", "Games", "Marketplace", "AI Arena", "Moments", "Leaderboard"];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Logo />
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {links.map((l, i) => (
            <a key={l} href="#" className={`relative transition hover:text-foreground ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}>
              {l}
              {i === 0 && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-primary rounded-full" />}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent" />
            <span className="font-tech text-xs">$ARENA</span>
            <span className="font-tech text-xs text-accent">1.00</span>
          </div>
          <button className="btn-primary hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-md font-tech text-xs tracking-wider">
            <Wallet className="w-4 h-4" /> CONNECT WALLET
          </button>
          <button className="p-2 rounded-md border border-border"><Menu className="w-5 h-5" /></button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroTrio} alt="Neon Arena agents" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 min-h-[680px] flex items-center">
        <div className="max-w-xl">
            <span className="inline-block px-3 py-1 text-[10px] tracking-[0.3em] font-tech border border-primary/40 text-primary rounded-sm mb-6">BUILT FOR WEB3</span>
            <h1 className="font-display text-7xl md:text-8xl leading-[0.9] text-gradient glow-text">NEON<br/>ARENA</h1>
            <h2 className="font-display text-3xl md:text-4xl mt-6 text-foreground/90">
              Where AI agents<br/>battle for <span className="underline decoration-accent decoration-4 underline-offset-4">supremacy</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md">
              Collect, train, and battle unique AI Agents.<br/>Own your journey. Rule the Arena.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="btn-primary px-7 py-3.5 rounded-md font-tech text-xs tracking-[0.2em] flex items-center gap-3">
                PLAY ARENA <ArrowUpRight className="w-4 h-4" />
              </button>
              <button className="px-7 py-3.5 rounded-md font-tech text-xs tracking-[0.2em] border border-border bg-card/60 hover:bg-card flex items-center gap-3 transition">
                <Box className="w-4 h-4" /> CREATE AI AGENT
              </button>
            </div>
        </div>
        <div className="hidden md:block absolute top-10 right-10 font-display text-9xl text-primary/30 select-none pointer-events-none">OG</div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { icon: Box, label: "TOTAL AGENTS", value: "1,248,721", c: "var(--neon)" },
    { icon: Swords, label: "BATTLES TODAY", value: "24,891", c: "var(--cyan)" },
    { icon: TrendingUp, label: "TOTAL PRIZE POOL", value: "$2,451,891", c: "var(--amber)" },
    { icon: Sparkles, label: "ACTIVE USERS", value: "12,450", c: "var(--lime)" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 -mt-6 relative z-10">
      <div className="card-glass rounded-xl p-5 grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="flex items-center gap-3 border-r border-border/50 pr-4 col-span-2 md:col-span-1">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-display text-primary">OG</div>
          <div>
            <div className="text-[10px] tracking-[0.2em] text-muted-foreground font-tech">POWERED BY</div>
            <div className="font-tech text-sm">NovaChain</div>
          </div>
        </div>
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <s.icon className="w-6 h-6" style={{ color: `oklch(from ${s.c} l c h)` }} />
            <div>
              <div className="text-[10px] tracking-[0.2em] text-muted-foreground font-tech">{s.label}</div>
              <div className="font-tech text-lg">{s.value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesBlock() {
  const features = [
    { icon: Box, title: "OWN YOUR AI", desc: "Each AI Agent is an NFT that you truly own.", c: "var(--neon)" },
    { icon: ArrowUp, title: "TRAIN & EVOLVE", desc: "Train, upgrade and evolve your agent to unlock their full potential.", c: "var(--neon-2)" },
    { icon: Swords, title: "BATTLE & EARN", desc: "Compete in battles, climb the ranks and earn massive rewards.", c: "var(--amber)" },
    { icon: Globe, title: "BUILT ON OG", desc: "Ultra-fast, scalable infrastructure for the next era of AI gaming.", c: "var(--lime)" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-[1fr_2.4fr_1fr] gap-6">
        <div>
          <span className="text-[10px] tracking-[0.3em] font-tech text-accent">BUILT DIFFERENT</span>
          <h3 className="font-display text-4xl mt-3 leading-tight">THE NEXT ERA<br/>OF <span className="text-gradient">AI GAMING</span></h3>
          <p className="text-sm text-muted-foreground mt-4">Neon Arena is the ultimate battleground for AI Agents across Web3. Powered by NovaChain, owned by you.</p>
          <button className="btn-primary mt-6 px-5 py-2.5 rounded-md font-tech text-xs tracking-[0.2em] flex items-center gap-2">
            LEARN MORE <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((f) => (
            <div key={f.title} className="card-glass rounded-xl p-5 transition">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `oklch(from ${f.c} l c h / 0.15)`, border: `1px solid oklch(from ${f.c} l c h / 0.4)` }}>
                <f.icon className="w-6 h-6" style={{ color: `oklch(from ${f.c} l c h)` }} />
              </div>
              <h4 className="font-tech text-sm tracking-wider mb-2" style={{ color: `oklch(from ${f.c} l c h)` }}>{f.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="card-glass rounded-xl p-5">
          <div className="text-[10px] tracking-[0.3em] font-tech text-muted-foreground">$ARENA TOKEN</div>
          <div className="font-display text-2xl text-accent mt-1 glow-text">FUEL THE ARENA</div>
          <p className="text-xs text-muted-foreground mt-3">The native token of Neon Arena. Use it to play, earn, govern and own the future.</p>
          <div className="text-[10px] tracking-[0.3em] font-tech text-muted-foreground mt-5">$ARENA PRICE</div>
          <div className="flex items-end gap-2 mt-1">
            <span className="font-tech text-3xl">1.00</span>
            <span className="text-xs text-lime-400" style={{ color: "oklch(0.82 0.22 145)" }}>+4.35%</span>
          </div>
          <div className="mt-3 h-10 relative">
            <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
              <polyline points="0,25 15,22 30,24 45,18 60,20 75,12 90,8 100,4" fill="none" stroke="oklch(0.7 0.28 320)" strokeWidth="1.5" />
            </svg>
          </div>
          <button className="btn-primary w-full mt-4 px-5 py-2.5 rounded-md font-tech text-xs tracking-[0.2em] flex items-center justify-center gap-2">
            VIEW TOKEN <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "CREATE", desc: "Create your AI Agent and choose its path.", img: agentNexus },
    { n: "02", title: "TRAIN", desc: "Train and evolve your agent to make it stronger.", img: iconTrain },
    { n: "03", title: "BATTLE", desc: "Enter the Arena and battle players worldwide.", img: iconBattle },
    { n: "04", title: "EARN", desc: "Win battles, earn rewards and climb the leaderboard.", img: iconEarn },
    { n: "05", title: "OWN", desc: "Your AI. Your NFT. Your legacy.", img: agentVoid },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-center gap-4 mb-12">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary" />
        <h3 className="font-display text-3xl">HOW IT WORKS</h3>
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-stretch">
        {steps.map((s, i) => (
          <div key={s.n} className="relative">
            <div className="card-glass rounded-xl overflow-hidden h-full flex flex-col">
              <div className="aspect-square overflow-hidden bg-background/50">
                <img src={s.img} alt={s.title} loading="lazy" width={400} height={400} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="font-display text-xl text-primary glow-text">{s.n}</div>
                <div className="font-tech text-sm mt-2 tracking-wider">{s.title}</div>
                <p className="text-xs text-muted-foreground mt-2">{s.desc}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="hidden md:block absolute top-1/3 -right-2 w-5 h-5 text-primary z-10" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function TopAgents() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-6">
        <h3 className="font-display text-3xl">TOP AI AGENTS</h3>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-accent hover:underline">View All</a>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => scroll(1)} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto scrollbar-none">
        {agents.map((a) => (
          <div key={a.name} className="card-glass rounded-xl overflow-hidden group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={a.img} alt={a.name} loading="lazy" width={640} height={800} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md font-tech text-xs" style={{ background: `oklch(from ${a.color} l c h / 0.2)`, color: `oklch(from ${a.color} l c h)`, border: `1px solid oklch(from ${a.color} l c h / 0.5)` }}>{a.rank}</div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-tech text-sm">{a.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-sm font-tech" style={{ background: a.tier === "Legendary" ? "oklch(0.78 0.18 75 / 0.2)" : "oklch(0.62 0.25 295 / 0.2)", color: a.tier === "Legendary" ? "oklch(0.85 0.18 75)" : "oklch(0.75 0.25 300)" }}>{a.tier}</span>
              </div>
              <div className="text-xs text-muted-foreground">{a.chain}</div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50 text-xs font-tech">
                <span className="text-muted-foreground">LV. {a.lvl}</span>
                <span className="flex items-center gap-1"><Swords className="w-3 h-3 text-accent" />{a.power}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LiveBattles() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-6">
        <h3 className="font-display text-3xl">LIVE BATTLES</h3>
        <a href="#" className="text-sm text-accent hover:underline">View All Battles</a>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {battles.map((b, i) => (
          <div key={i} className="card-glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-tech text-xs tracking-wider text-red-400">LIVE</span>
              </div>
              <div className="text-right">
                <div className="text-xs">{b.tag}</div>
                <div className="text-[10px] text-muted-foreground">{b.round}</div>
              </div>
              <div className="font-tech text-sm text-accent">{b.time}</div>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <Fighter f={b.a} />
              <span className="font-display text-2xl text-muted-foreground">VS</span>
              <Fighter f={b.b} flip />
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
              <a href="#" className="text-xs text-accent hover:underline font-tech">Watch Now</a>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="w-3 h-3" />{b.views}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Fighter({ f, flip }: { f: { name: string; chain: string; img: string }; flip?: boolean }) {
  return (
    <div className={`flex flex-col items-center ${flip ? "" : ""}`}>
      <div className="w-20 h-20 rounded-lg overflow-hidden border border-primary/40 glow-primary">
        <img src={f.img} alt={f.name} loading="lazy" width={160} height={160} className="w-full h-full object-cover" />
      </div>
      <div className="mt-2 text-center">
        <div className="font-tech text-xs">{f.name}</div>
        <div className="text-[10px] text-muted-foreground">{f.chain}</div>
      </div>
    </div>
  );
}

function PartnersBlock() {
  const partners = ["NovaChain", "Helios", "Aether", "Nexus Wallet", "Spectre"];
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="card-glass rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative grid md:grid-cols-[auto_1fr_auto] items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="text-[10px] tracking-[0.3em] font-tech text-muted-foreground">POWERED BY</div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-display text-primary">OG</div>
            <span className="font-tech">NovaChain</span>
          </div>
          <div className="font-display text-2xl md:text-3xl text-center">
            BUILDING THE FUTURE<br/>OF AI GAMING <span className="text-accent">TOGETHER</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-end">
            {partners.map((p) => (
              <div key={p} className="px-3 py-2 rounded-md border border-border bg-card/50 font-tech text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />{p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Subscribe() {
  const [email, setEmail] = useState("");
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-3 gap-8 items-center">
        <div>
          <div className="text-xs tracking-[0.3em] font-tech text-accent mb-2">STAY UPDATED</div>
          <p className="text-sm text-muted-foreground">Get the latest news, updates and exclusive rewards.</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 card-glass rounded-md p-1">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="flex-1 bg-transparent px-4 py-2 text-sm outline-none" />
          <button className="btn-primary px-5 py-2 rounded-md font-tech text-xs tracking-[0.2em] flex items-center gap-2">SUBSCRIBE <ArrowUpRight className="w-3 h-3" /></button>
        </form>
        <div>
          <div className="text-xs tracking-[0.3em] font-tech text-accent mb-3">FOLLOW US</div>
          <div className="flex gap-2">
            {[Twitter, MessageCircle, Send, Youtube, Instagram].map((Ic, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-md card-glass flex items-center justify-center hover:border-primary transition">
                <Ic className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "PLATFORM", items: ["Games", "Marketplace", "AI Arena", "Moments", "Leaderboard"] },
    { title: "RESOURCES", items: ["Docs", "Blog", "Help Center", "Brand Kit", "Careers"] },
    { title: "COMPANY", items: ["About Kult Games", "Partners", "Terms of Service", "Privacy Policy", "Contact"] },
  ];
  return (
    <footer className="border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="text-sm text-muted-foreground mt-4 max-w-xs">Neon Arena is a next-gen AI gaming ecosystem where intelligent agents battle, evolve and dominate.</p>
          <p className="text-xs text-muted-foreground mt-6">© 2026 Neon Arena. All rights reserved.</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="font-tech text-xs tracking-[0.2em] text-foreground mb-4">{c.title}</div>
            <ul className="space-y-2">
              {c.items.map((i) => <li key={i}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">{i}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
