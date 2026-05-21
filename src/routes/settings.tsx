import { createFileRoute } from "@tanstack/react-router";
import { Bell, Shield, UserRoundCog, Wallet } from "lucide-react";
import { Sidebar, Topbar } from "./dashboard";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const sections = [
    {
      title: "Profile",
      body: "Manage player identity, active agent display, and public arena presence.",
      icon: UserRoundCog,
    },
    {
      title: "Wallet",
      body: "Review connected wallet state, balances, and marketplace access.",
      icon: Wallet,
    },
    {
      title: "Notifications",
      body: "Control battle alerts, training completion updates, and rewards reminders.",
      icon: Bell,
    },
    {
      title: "Security",
      body: "Configure account protection and session preferences.",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-[#03070d] text-white">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_78%_12%,rgba(139,37,255,0.18),transparent_28%),radial-gradient(circle_at_18%_90%,rgba(33,144,255,0.12),transparent_32%)]" />
      <div className="relative flex min-h-screen">
        <Sidebar active="Settings" />
        <main className="min-w-0 flex-1 lg:ml-[225px]">
          <Topbar />
          <section className="mx-auto max-w-[1284px] px-4 py-5 sm:px-6 lg:px-8">
            <div className="mb-5">
              <div className="font-tech text-[11px] italic text-[#a84cff]">ACCOUNT CONTROL</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight">Settings</h1>
              <p className="mt-1 text-sm text-white/62">
                Tune your Arena profile, wallet, alerts, and security preferences.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {sections.map((section) => (
                <section key={section.title} className="arena-panel p-5">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-[#8b29ff]/35 bg-[#8b29ff]/10 text-[#b85eff]">
                      <section.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-tech text-xs uppercase">{section.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-white/62">{section.body}</p>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
