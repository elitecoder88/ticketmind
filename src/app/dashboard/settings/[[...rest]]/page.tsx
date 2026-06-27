"use client";

import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal profile, update security credentials, and configure active session preferences.
        </p>
      </div>

      <div className="max-w-4xl xl:max-w-none flex justify-start pt-2">
        <UserProfile
          appearance={{
            elements: {
              cardBox: "shadow-sm border border-slate-200/60 rounded-xl overflow-hidden w-full",
              navbar: "border-r border-slate-100 bg-slate-50/50",
              scrollBox: "bg-white",
            }
          }}
        />
      </div>
      
    </div>
  );
}