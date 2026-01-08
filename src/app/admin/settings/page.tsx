"use client";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your profile and site preferences.</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900">General Information</h3>
          <p className="text-sm text-gray-500">This will be displayed on your portfolio footer.</p>
        </div>
        
        <div className="grid gap-4">
            <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">Site Title</label>
                <Input defaultValue="My Awesome Portfolio" />
            </div>
            <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">Contact Email</label>
                <Input defaultValue="me@example.com" />
            </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
            <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}