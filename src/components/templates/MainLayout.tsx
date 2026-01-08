import { ReactNode } from "react";
import { Navbar } from "@/components/organisms/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {children}
      </main>
      <footer className="border-t border-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Built with Next.js & Cloudflare
          </p>
        </div>
      </footer>
    </div>
  );
};