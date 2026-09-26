import React, { useState, useCallback, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, BookOpen, User, Globe } from 'lucide-react';
import { GitHubIcon } from '../common/SocialIcons';

// Clean SVG avatar silhouette fallback image
const FALLBACK_AVATAR = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='100%25' height='100%25' fill='%231f2937'/%3E%3Ccircle cx='60' cy='45' r='20' fill='%239ca3af'/%3E%3Cpath d='M25 95 C25 70, 95 70, 95 95' fill='%239ca3af'/%3E%3C/svg%3E";

const PersonCard = memo(function PersonCard({ person }) {
  const profileUrl = `/people/${person.$id}`;
  const [avatarSrc, setAvatarSrc] = useState(person.avatar || FALLBACK_AVATAR);

  const handleAvatarError = useCallback(() => {
    setAvatarSrc(FALLBACK_AVATAR);
  }, []);

  return (
    <div className="card card-border bg-base-100 p-5 space-y-4 hover:border-primary transition-all duration-300 shadow-xs flex flex-col justify-between min-h-55">
      
      <div className="space-y-3">
        
        {/* Header with Avatar & Basic Info */}
        <div className="flex items-start gap-4">
          <NavLink to={profileUrl} className="avatar shrink-0" aria-label={person.name || "Member"}>
            <div className="w-14 h-14 rounded-lg bg-base-200 overflow-hidden border border-base-300 aspect-square flex items-center justify-center">
              <img 
                src={avatarSrc} 
                alt={person.name || "Member Avatar"} 
                width={56}
                height={56}
                onError={handleAvatarError}
                className="object-cover w-full h-full"
                loading="lazy"
                decoding="async"
              />
            </div>
          </NavLink>

          <div className="space-y-1 overflow-hidden">
            {person.category && (
              <span className="badge badge-xs badge-neutral font-mono">
                {person.category}
              </span>
            )}
            <h3 className="card-title text-base font-bold text-base-content leading-tight truncate">
              <NavLink to={profileUrl} className="hover:text-primary transition-colors">
                {person.name || "Lab Member"}
              </NavLink>
            </h3>
            <p className="text-xs text-base-content/70 font-mono truncate">
              {person.title || person.role || "Researcher"}
            </p>
          </div>
        </div>

        {/* Bio Snippet */}
        {person.bio && (
          <p className="text-xs text-base-content/80 line-clamp-2 leading-relaxed min-h-9">
            {person.bio}
          </p>
        )}

        {/* Research Interest Badges */}
        {person.researchInterests && person.researchInterests.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1 min-h-6" >
            {person.researchInterests.slice(0, 3).map((interest, idx) => (
              <span key={idx} className="badge badge-outline text-[10px]">
                {interest}
              </span>
            ))}
          </div>
        )}

      </div>

      {/* Footer Contact & Action Links */}
      <div className="pt-3 border-t border-base-200 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {person.email && (
            <a 
              href={`mailto:${person.email}`} 
              className="btn btn-ghost btn-xs btn-square text-base-content/70 hover:text-primary"
              title={person.email}
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          )}
          {person.scholar && (
            <a 
              href={person.scholar} 
              target="_blank" 
              rel="noreferrer noopener"
              className="btn btn-ghost btn-xs btn-square text-base-content/70 hover:text-primary"
              title="Google Scholar"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </a>
          )}
          {person.github && (
            <a 
              href={person.github} 
              target="_blank" 
              rel="noreferrer noopener"
              className="btn btn-ghost btn-xs btn-square text-base-content/70 hover:text-primary"
              title="GitHub Profile"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {person.website && (
            <a 
              href={person.website} 
              target="_blank" 
              rel="noreferrer noopener"
              className="btn btn-ghost btn-xs btn-square text-base-content/70 hover:text-primary"
              title="Personal Website"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <NavLink to={profileUrl} className="btn btn-xs btn-outline btn-primary gap-1">
          <User className="w-3 h-3" />
          <span>Profile</span>
        </NavLink>
      </div>

    </div>
  );
});

export default PersonCard;
