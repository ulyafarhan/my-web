import Link from "next/link";
import { Button } from "@/components/atoms/Button";

export const Navbar = () => {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tighter text-blue-600">
            PORTFOLIO.
          </Link>
          <div className="hidden md:flex md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/contact">
            <Button variant="primary" size="sm">
              Contact Me
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};