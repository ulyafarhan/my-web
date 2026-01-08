"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAdminToken } from "@/utils/admin-client";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";

export default function LoginPage() {
  const [token, setToken] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.length > 5) {
      setAdminToken(token);
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Admin Access
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <Input 
            type="password" 
            placeholder="Enter Admin Token" 
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}