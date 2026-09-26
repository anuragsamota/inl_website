import React, { useState, useEffect, useCallback } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  MapPin, 
  BookOpen, 
  FileText,
  Check,
  Share2
} from 'lucide-react';
import { GitHubIcon } from '../components/common/SocialIcons';
import SEO from '../components/common/SEO';
import PublicationCard from '../components/cards/PublicationCard';
import { getPersonById, getPublications } from '../services/api';
import { Globe } from 'lucide-react';

// Clean SVG avatar silhouette fallback image
const FALLBACK_AVATAR = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='100%25' height='100%25' fill='%231f2937'/%3E%3Ccircle cx='60' cy='45' r='20' fill='%239ca3af'/%3E%3Cpath d='M25 95 C25 70, 95 70, 95 95' fill='%239ca3af'/%3E%3C/svg%3E";

export default function PersonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState(FALLBACK_AVATAR);
  const [personPubs, setPersonPubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const res = await getPersonById(id);
        const pubsRes = await getPublications();

        if (isMounted) {
          if (res.data) {
            setPerson(res.data);
            setAvatarSrc(res.data.avatar || FALLBACK_AVATAR);
            
            // Bulletproof author matching logic: ignore case and guard against undefined properties
            const name = (res.data.name || '').toLowerCase().trim();
            if (name && pubsRes.data) {
              const matchedPubs = pubsRes.data.filter(pub => 
                Array.isArray(pub.authors) && pub.authors.some(author => {
                  const authorLower = (author || '').toLowerCase().trim();
                  return authorLower.includes(name) || name.includes(authorLower);
                })
              );
              setPersonPubs(matchedPubs);
            } else {
              setPersonPubs([]);
            }
          } else {
            setPerson(null);
            setPersonPubs([]);
          }
        }
      } catch (err) {
        console.error('Error loading person detail:', err);
        if (isMounted) {
          setPersonPubs([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    window.scrollTo(0, 0);
    return () => { isMounted = false; };
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleAvatarError = useCallback(() => {
    setAvatarSrc(FALLBACK_AVATAR);
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="h-6 w-32 bg-base-200 rounded animate-pulse" />
        <div className="h-48 bg-base-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-base-content">Profile Not Found</h2>
        <p className="text-xs text-base-content/70">The requested member profile could not be found.</p>
        <button onClick={() => navigate('/people')} className="btn btn-sm btn-primary">
          Back to People Directory
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${person.name} | Intelligent Networks Laboratory`}
        description={`${person.role} at Intelligent Networks Laboratory. Research interests: ${person.researchInterests?.join(', ')}.`}
      />

      <div className="space-y-10 max-w-4xl mx-auto px-4">
        
        {/* Back Link */}
        <NavLink to="/people" className="btn btn-ghost btn-xs gap-1.5 text-xs font-mono">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to People Directory</span>
        </NavLink>

        {/* Profile Card Header */}
        <div className="card card-border bg-base-100 p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* Avatar */}
            <div className="avatar animate-in fade-in duration-200">
              <div className="w-28 h-28 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden shadow-sm">
                <img 
                  src={avatarSrc} 
                  alt={person.name} 
                  onError={handleAvatarError}
                  className="object-cover w-full h-full" 
                />
              </div>
            </div>

            {/* Main Info */}
            <div className="space-y-3 text-center sm:text-left flex-1">
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {person.category && (
                  <span className="badge badge-primary text-xs font-mono">
                    {person.category}
                  </span>
                )}
                {person.role && (
                  <span className="badge badge-outline text-xs font-mono">
                    {person.role}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold font-display text-base-content tracking-tight">
                {person.name || "Member Profile"}
              </h1>

              <p className="text-xs font-mono text-base-content/70">
                {person.title || person.role}
              </p>

              {/* Contact Links */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs">
                {person.email && (
                  <a href={`mailto:${person.email}`} className="flex items-center gap-1.5 link link-hover text-base-content/80">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <span>{person.email}</span>
                  </a>
                )}

                {person.office && (
                  <div className="flex items-center gap-1.5 text-base-content/70">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{person.office}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
                {person.scholar && (
                  <a href={person.scholar} target="_blank" rel="noreferrer noopener" className="btn btn-outline btn-xs gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                    <span>Google Scholar</span>
                  </a>
                )}

                {person.github && (
                  <a href={person.github} target="_blank" rel="noreferrer noopener" className="btn btn-outline btn-xs gap-1">
                    <GitHubIcon className="w-3.5 h-3.5 text-primary" />
                    <span>GitHub</span>
                  </a>
                )}

                {person.website && (
                  <a href={person.website} target="_blank" rel="noreferrer noopener" className="btn btn-outline btn-xs gap-1">
                    <Globe className="w-3.5 h-3.5 text-primary" />
                    <span>Website</span>
                  </a>
                )}

                {/* Share Button */}
                <button onClick={handleShare} className="btn btn-ghost btn-xs gap-1">
                  {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Biography */}
          {person.bio && (
            <div className="pt-6 border-t border-base-200 space-y-2">
              <h3 className="font-bold text-sm text-base-content font-display uppercase tracking-wide">
                Biography & Academic Background
              </h3>
              <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed whitespace-pre-line">
                {person.bio}
              </p>
            </div>
          )}

          {/* Research Interests */}
          {person.researchInterests && person.researchInterests.length > 0 && (
            <div className="pt-4 border-t border-base-200 space-y-2">
              <h3 className="font-bold text-xs font-mono uppercase text-base-content/60">
                Research Focus & Expertise
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {person.researchInterests.map((interest, idx) => (
                  <span key={idx} className="badge badge-secondary badge-soft text-xs">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Publications by this person - Strictly show only if matched pubs count > 0 */}
        {Array.isArray(personPubs) && personPubs.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-display text-base-content flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>Publications ({personPubs.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personPubs.map(pub => (
                <PublicationCard key={pub.$id} publication={pub} />
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
