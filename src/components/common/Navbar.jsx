import React, { useState, useEffect, memo } from 'react';
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
  Palette,
  Check
} from 'lucide-react';
import { getRuntimeThemes } from '../../services/api';

const NAV_LINKS = [
  { path: '/', label: 'Home', icon: Network },
  { path: '/research', label: 'Research', icon: Cpu },
  { path: '/publications', label: 'Publications', icon: BookOpen },
  { path: '/people', label: 'People', icon: Users },
  { path: '/news', label: 'News', icon: Newspaper },
  { path: '/contact', label: 'Contact', icon: Mail },
];

const Navbar = memo(function Navbar() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('inl_theme') || 'lofi-dark';
  });
  const [themes, setThemes] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    async function loadThemes() {
      const themeList = await getRuntimeThemes();
      if (isMounted) setThemes(themeList);
    }
    loadThemes();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('inl_theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar bg-base-100/70 backdrop-blur-md border-b border-base-300/40 sticky top-0 z-50 px-4 sm:px-8 transition-colors duration-300 min-h-[64px]">
      
      {/* Brand Logo */}
      <div className="navbar-start">
        <NavLink to="/" className="flex items-center gap-3 group min-h-[44px]" aria-label="Home">
          <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center p-1.5 text-primary shrink-0 transition-transform group-hover:scale-105">
            <img src="/logo-icon.svg" alt="Logo" width={24} height={24} className="w-full h-full" />
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
                  className={`text-xs font-medium rounded-md px-3 py-2 transition-all min-h-[36px] flex items-center ${
                    isActive 
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
            className="btn btn-ghost btn-xs sm:btn-sm gap-1.5 font-mono text-[11px] border border-base-300/60 bg-base-100/40 backdrop-blur-sm cursor-pointer min-h-[36px] px-3"
            title="Select Theme"
          >
            <Palette className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">Theme</span>
          </label>
          <ul 
            tabIndex={0} 
            className="dropdown-content z-[60] menu p-2 shadow-2xl bg-base-100 border border-base-300 rounded-lg w-64 mt-2 text-xs"
          >
            <li className="menu-title text-[10px] font-mono uppercase text-base-content/50 px-2 py-1">
              Select Theme Style
            </li>
            {themes.map((theme) => (
              <li key={theme.id}>
                <button
                  onClick={() => setCurrentTheme(theme.id)}
                  className={`flex items-center justify-between py-2 rounded-md ${
                    currentTheme === theme.id ? 'active font-semibold' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-base-300" 
                      style={{ backgroundColor: theme.color }}
                    />
                    <span>{theme.label}</span>
                  </div>
                  {currentTheme === theme.id && <Check className="w-3.5 h-3.5" />}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Toggle (44px touch target) */}
        <button
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="btn btn-ghost btn-sm btn-square lg:hidden min-h-[44px] min-w-[44px]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-base-100/95 backdrop-blur-lg border-b border-base-300/60 p-4 lg:hidden shadow-xl animate-in fade-in">
          <ul className="menu w-full gap-2">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={`text-sm font-medium py-3 px-4 rounded-lg min-h-[44px] flex items-center ${isActive ? 'active font-bold' : ''}`}
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
