"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthButton } from "@/components/auth-button";

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b border-gray-800/50 bg-[#0a0a0f]/95 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xl font-bold text-white hover:text-indigo-400 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/50">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <span>AlatFI</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/dashboard" isActive={isActive("/dashboard")}>
              Dashboard
            </NavLink>
            <NavLink href="/create" isActive={isActive("/create")}>
              Create Agent
            </NavLink>
            <NavLink href="/demos" isActive={isActive("/demos")}>
              Demos
            </NavLink>
          </div>

          {/* Right Side - Auth & Mobile Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <AuthButton />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-lg p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800/50 py-4 space-y-2">
            <MobileNavLink 
              href="/dashboard" 
              isActive={isActive("/dashboard")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </MobileNavLink>
            <MobileNavLink 
              href="/create" 
              isActive={isActive("/create")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Agent
            </MobileNavLink>
            <MobileNavLink 
              href="/demos" 
              isActive={isActive("/demos")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Demos
            </MobileNavLink>
            <div className="pt-2 border-t border-gray-800/50">
              <AuthButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// function NavLink({ 
//   href, 
//   isActive, 
//   children 
// }: { 
//   href: string; 
//   isActive: boolean; 
//   children: React.ReactNode;
// }) {
//   return (
//     <Link
//       href={href}
//       className={`
//         relative px-4 py-2 text-sm font-medium transition-all duration-200
//         ${isActive 
//           ? "text-white" 
//           : "text-gray-400 hover:text-white"
//         }
//       `}
//     >
//       <span className="relative z-10">{children}</span>
//       {isActive && (
//         <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
//       )}
//       {!isActive && (
//         <span className="absolute inset-0 rounded-lg bg-gray-800/50 opacity-0 hover:opacity-100 transition-opacity -z-0" />
//       )}
//     </Link>
//   );
// }

function MobileNavLink({
  href,
  isActive,
  onClick,
  children,
}: {
  href: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        block px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${isActive
          ? "bg-indigo-500/20 text-indigo-400 border-l-2 border-indigo-500"
          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
        }
      `}
    >
      {children}
    </Link>
  );
}

function NavLink({ 
  href, 
  isActive, 
  children 
}: { 
  href: string; 
  isActive: boolean; 
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`
        relative px-4 py-2 text-sm font-medium transition-all duration-200
        ${isActive 
          ? "text-white" 
          : "text-gray-400 hover:text-white"
        }
      `}
    >
      <span className="relative z-10">{children}</span>
      {isActive && (
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
      )}
      {!isActive && (
        <span className="absolute inset-0 rounded-lg bg-gray-800/50 opacity-0 hover:opacity-100 transition-opacity -z-0" />
      )}
    </Link>
  );
}

