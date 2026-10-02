import React, { useState, useEffect, useRef, memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Network,
  BookOpen,
  Users,
  Cpu,
  Newspaper,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';

const NAV_LINKS = [
  { path: '/', label: 'Home', icon: Network },
  { path: '/publications', label: 'Publications', icon: BookOpen },
  { path: '/people', label: 'People', icon: Users },
  { path: '/news', label: 'News', icon: Newspaper },
  { path: '/contact', label: 'Contact', icon: Mail },
];

const Navbar = memo(function Navbar() {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('inl_theme_mode') || 'system';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('inl_theme_mode', themeMode);

    const applyTheme = () => {
      if (themeMode === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'imc-dark' : 'imc-blue');
      } else if (themeMode === 'dark') {
        document.documentElement.setAttribute('data-theme', 'imc-dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'imc-blue');
      }
    };

    applyTheme();

    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = () => {
        applyTheme();
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemThemeChange);
      } else {
        mediaQuery.addListener(handleSystemThemeChange);
      }

      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleSystemThemeChange);
        } else {
          mediaQuery.removeListener(handleSystemThemeChange);
        }
      };
    }
  }, [themeMode]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Focus trap + body scroll lock while the mobile drawer is open
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const drawer = drawerRef.current;
    const focusableSelectors = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !drawer) return;

      const focusables = Array.from(drawer.querySelectorAll(focusableSelectors));
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Move focus into the drawer so keyboard users land on the menu
    const firstTabbable = drawer?.querySelector(focusableSelectors);
    firstTabbable?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="navbar bg-base-100/70 backdrop-blur-md border-b border-base-300/40 sticky top-0 z-50 px-4 sm:px-8 transition-colors duration-300 min-h-16">

      {/* Brand Logo */}
      <div className="navbar-start">
        <NavLink to="/" className="flex items-center gap-3 group min-h-11" aria-label="Home">
          <div className="w-12 h-12 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-105">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-display font-bold text-sm sm:text-base tracking-tight text-base-content block leading-tight">
              Intelligent Networks Laboratory
            </span>
          </div>
        </NavLink>
      </div>

      {/* Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={`text-xs font-medium rounded-md px-3 py-2 transition-all min-h-9 flex items-center ${isActive
                      ? 'active font-semibold'
                      : 'text-base-content/80 hover:bg-base-200/50'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right Actions: Theme Selector & Mobile Toggle */}
      <div className="navbar-end gap-2">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-xs sm:btn-sm gap-1.5 font-mono text-[11px] border border-base-300/60 bg-base-100/40 backdrop-blur-sm cursor-pointer min-h-9 px-3 flex items-center justify-center"
            title="Theme settings"
          >
            {themeMode === 'system' && <Monitor className="w-3.5 h-3.5 text-primary" />}
            {themeMode === 'light' && <Sun className="w-3.5 h-3.5 text-primary" />}
            {themeMode === 'dark' && <Moon className="w-3.5 h-3.5 text-primary" />}
            <span className="hidden sm:inline capitalize">{themeMode}</span>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-60 menu p-2 shadow-2xl bg-base-100 border border-base-300 rounded-lg w-40 mt-2 text-xs"
          >
            <li className="menu-title text-[10px] font-mono uppercase text-base-content/50 px-2 py-1">
              Select Mode
            </li>
            <li>
              <button
                onClick={() => setThemeMode('light')}
                className={`flex items-center gap-2 rounded-md py-2 ${themeMode === 'light' ? 'active' : ''}`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setThemeMode('dark')}
                className={`flex items-center gap-2 rounded-md py-2 ${themeMode === 'dark' ? 'active' : ''}`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setThemeMode('system')}
                className={`flex items-center gap-2 rounded-md py-2 ${themeMode === 'system' ? 'active' : ''}`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>System</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Toggle (44px touch target) */}
        <button
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="btn btn-ghost btn-sm btn-square lg:hidden min-h-11 min-w-11"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div ref={drawerRef} className="absolute top-full left-0 right-0 bg-base-100/95 backdrop-blur-lg border-b border-base-300/60 p-4 lg:hidden shadow-xl animate-in fade-in">
          <ul className="menu w-full gap-2">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={`text-sm font-medium py-3 px-4 rounded-lg min-h-11 flex items-center ${isActive ? 'active font-bold' : ''}`}
                  >
                    <Icon className="w-4 h-4 mr-2 text-primary" />
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}

    </nav>
  );
});

export default Navbar;
