import React, { useState, useEffect, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Mail, BookOpen } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';
import { getLabInfo } from '../../services/api';

const Footer = memo(function Footer() {
  const [labInfo, setLabInfo] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadInfo() {
      const info = await getLabInfo();
      if (isMounted) setLabInfo(info);
    }
    loadInfo();
    return () => { isMounted = false; };
  }, []);

  if (!labInfo) return null;

  return (
    <footer className="footer p-10 bg-base-200 text-base-content border-t border-base-300 mt-20 text-xs">
      
      {/* Col 1: Lab info */}
      <aside className="space-y-2 max-w-sm">
        <div className="flex items-center gap-2 font-display font-bold text-base text-base-content">
          <img src="/logo-icon.svg" alt="Logo" className="w-5 h-5" />
          <span>{labInfo.name}</span>
        </div>
        <p className="text-base-content/70 leading-relaxed">
          {labInfo.tagline}
        </p>
        <p className="text-base-content/50 pt-2 font-mono">
          © {new Date().getFullYear()} {labInfo.name}. All rights reserved.
        </p>
      </aside>

      {/* Col 2: Navigation */}
      <nav>
        <h6 className="footer-title text-xs">Navigation</h6>
        <NavLink to="/publications" className="link link-hover">Publications</NavLink>
        <NavLink to="/people" className="link link-hover">People & Directory</NavLink>
        <NavLink to="/news" className="link link-hover">News & Updates</NavLink>
        <NavLink to="/contact" className="link link-hover">Contact Us</NavLink>
      </nav>

      {/* Col 3: Location & Contact */}
      <nav>
        <h6 className="footer-title text-xs">Contact & Location</h6>
        <div className="flex items-start gap-2 text-base-content/70">
          <MapPin className="w-4 h-4 shrink-0 text-primary mt-0.5" />
          <span>
            {labInfo.location}<br />
            {labInfo.department && <span>{labInfo.department}<br /></span>}
            {labInfo.university && <span>{labInfo.university}<br /></span>}
            <span>{labInfo.address}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-base-content/70">
          <Mail className="w-4 h-4 shrink-0 text-primary" />
          <a href={`mailto:${labInfo.email}`} className="link link-hover">{labInfo.email}</a>
        </div>
      </nav>

      {/* Col 4: Profiles */}
      <nav>
        <h6 className="footer-title text-xs">Academic Links</h6>
        <div className="flex items-center gap-3 pt-1">
          {labInfo.socials?.scholar && (
            <a 
              href={labInfo.socials.scholar} 
              target="_blank" 
              rel="noreferrer noopener" 
              className="btn btn-ghost btn-xs btn-square" 
              aria-label="Google Scholar"
            >
              <BookOpen className="w-4 h-4" />
            </a>
          )}
          {labInfo.socials?.github && (
            <a 
              href={labInfo.socials.github} 
              target="_blank" 
              rel="noreferrer noopener" 
              className="btn btn-ghost btn-xs btn-square" 
              aria-label="GitHub"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
          )}
          {labInfo.socials?.linkedin && (
            <a 
              href={labInfo.socials.linkedin} 
              target="_blank" 
              rel="noreferrer noopener" 
              className="btn btn-ghost btn-xs btn-square" 
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </nav>

    </footer>
  );
});

export default Footer;
