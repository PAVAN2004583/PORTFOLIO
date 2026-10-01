import { BriefcaseBusiness, GraduationCap, House, MessageSquareText, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: House },
  { to: '/about', label: 'About', icon: BriefcaseBusiness },
  { to: '/projects', label: 'Projects', icon: Sparkles },
  { to: '/education', label: 'Education', icon: GraduationCap },
  { to: '/assistant', label: 'AI Assistant', icon: Sparkles },
  { to: '/contact', label: 'Contact', icon: MessageSquareText },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <NavLink to="/" className="text-xl font-semibold tracking-tight text-white">
            Pavan<span className="text-cyan-400">.Cloud</span>
          </NavLink>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm text-slate-300 transition hover:text-white ${isActive ? 'text-cyan-400' : ''}`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
          <NavLink
            to="/admin"
            className="rounded-full border border-cyan-500/60 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 hover:bg-cyan-500/20"
          >
            Admin
          </NavLink>
        </div>
      </header>
      {children}
    </div>
  );
}
