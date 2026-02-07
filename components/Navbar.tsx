"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo - Left */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-2 group"
            aria-label="Home"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:via-purple-700 group-hover:to-pink-700 transition-all duration-300">
              Luminous
            </span>
          </Link>

          {/* Menu - Center */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${isActive
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                    }
                  `}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  )}
                  <span className="absolute inset-0 rounded-lg bg-indigo-500/0 hover:bg-indigo-500/5 transition-colors duration-300 -z-[0]" />
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/login"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-gray-50 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
            >
              Sign up
            </Link>
          </div>

          {/* Login / Signup - Right (desktop) */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/login"
              className="relative px-5 py-2.5 text-sm font-semibold text-gray-700 rounded-full overflow-hidden
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-500/10 before:to-purple-500/10 before:opacity-0 hover:before:opacity-100 before:transition before:duration-300
                hover:text-indigo-600 transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="relative px-5 py-2.5 text-sm font-bold text-white rounded-full
                bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md hover:shadow-lg
                hover:from-indigo-700 hover:to-purple-700 transition-all duration-300
                transform hover:scale-105 active:scale-100"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Mobile menu - full nav */}
        <div className="md:hidden pb-3 flex flex-wrap justify-center gap-1 border-t border-gray-100 pt-2">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                  isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
