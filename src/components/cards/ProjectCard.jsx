import React, { useState, useCallback, memo } from 'react';
import { Tag, User, Award, X, Sparkles } from 'lucide-react';

// Inline SVG Data URI for clean fallback project image
const FALLBACK_PROJECT_IMG = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='100%25' height='100%25' fill='%231f2937'/%3E%3Ccircle cx='400' cy='225' r='80' fill='%233b82f6' fill-opacity='0.1'/%3E%3Cpath d='M360 225 L440 225 M400 185 L400 265' stroke='%233b82f6' stroke-width='4' stroke-linecap='round' stroke-opacity='0.4'/%3E%3Ctext x='50%25' y='70%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%239ca3af' font-weight='500'%3ENo Project Image%3C/text%3E%3C/svg%3E";

const isVideoUrl = (url) => {
  if (!url) return false;
  const pathPart = url.split('?')[0];
  const ext = pathPart.split('.').pop().toLowerCase();
  return ['mp4', 'webm', 'ogg', 'mov'].includes(ext);
};

const ProjectCard = memo(function ProjectCard({ project }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mediaSrc, setMediaSrc] = useState(project.image || FALLBACK_PROJECT_IMG);

  const toggleModal = useCallback(() => {
    setModalOpen(prev => !prev);
  }, []);

  const handleMediaError = useCallback(() => {
    setMediaSrc(FALLBACK_PROJECT_IMG);
  }, []);

  const isVideo = isVideoUrl(mediaSrc);

  return (
    <>
      <div className="card card-border bg-base-100 shadow-xs hover:border-primary transition-all duration-300 flex flex-col justify-between overflow-hidden group min-h-95">
        
        {/* Media Header (Image or Video) with Fallback */}
        <div className="relative aspect-video w-full overflow-hidden bg-base-200 shrink-0 flex items-center justify-center">
          {isVideo ? (
            <video
              src={mediaSrc}
              autoPlay
              loop
              muted
              playsInline
              onError={handleMediaError}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <img 
              src={mediaSrc} 
              alt={project.title || "Project"} 
              width={400}
              height={225}
              onError={handleMediaError}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
          )}
          
          <div className="absolute inset-0 bg-linear-to-t from-base-100/90 via-base-100/20 to-transparent" />
          
          <div className="absolute top-3 left-3 flex gap-2">
            {project.category && (
              <span className="badge badge-sm badge-primary font-mono text-[10px]">
                {project.category}
              </span>
            )}
            {project.status && (
              <span className="badge badge-sm badge-outline bg-base-100/80 font-mono text-[10px]">
                {project.status}
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body p-5 space-y-3 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="card-title text-base font-bold font-serif text-base-content leading-snug">
              {project.title || "Untitled Research"}
            </h3>

            {project.description && (
              <p className="text-xs text-base-content/80 line-clamp-3 leading-relaxed min-h-12">
                {project.description}
              </p>
            )}
          </div>

          <div className="space-y-3 pt-2">
            {/* Meta Lead & Sponsor */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono text-base-content/70 border-t border-base-200 pt-2">
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-primary" />
                <span>{project.lead || "Unspecified Lead"}</span>
              </div>
              {project.sponsor && (
                <div className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-primary" />
                  <span>{project.sponsor}</span>
                </div>
              )}
            </div>

            {/* Tag Pills */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="badge badge-ghost badge-xs text-[10px]">
                    <Tag className="w-2.5 h-2.5 mr-0.5" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card Action */}
        <div className="px-5 pb-5 pt-0">
          <button 
            onClick={toggleModal}
            className="btn btn-sm btn-outline btn-primary w-full text-xs gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Project Details</span>
          </button>
        </div>

      </div>

      {/* Detail Modal */}
      {modalOpen && (
        <div className="modal modal-open z-100 animate-in fade-in duration-200">
          <div className="modal-box max-w-2xl bg-base-100 border border-base-300 p-6 space-y-5 rounded-xl">
            
            <div className="flex items-start justify-between border-b border-base-200 pb-3">
              <div>
                {project.category && <span className="badge badge-primary text-xs font-mono mb-1">{project.category}</span>}
                <h3 className="font-serif font-bold text-lg text-base-content">{project.title || "Untitled Research"}</h3>
              </div>
              <button onClick={toggleModal} className="btn btn-ghost btn-xs btn-square">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-base-content/85">
              <div className="grid grid-cols-2 gap-3 bg-base-200 p-3 rounded-lg font-mono">
                <div><strong>Lead Investigator:</strong> {project.lead || "Unspecified"}</div>
                <div><strong>Status:</strong> {project.status || "Unknown"}</div>
                <div><strong>Start Date:</strong> {project.startDate || '2024'}</div>
                <div><strong>Sponsor:</strong> {project.sponsor || 'Departmental Research'}</div>
              </div>

              {project.description && (
                <div>
                  <h4 className="font-bold text-xs font-mono uppercase text-base-content/60 mb-1">Abstract & Objectives</h4>
                  <p className="whitespace-pre-line">{project.description}</p>
                </div>
              )}

              {project.tags && project.tags.length > 0 && (
                <div>
                  <h4 className="font-bold text-xs font-mono uppercase text-base-content/60 mb-1">Keywords</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((t, idx) => (
                      <span key={idx} className="badge badge-outline text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-action border-t border-base-200 pt-3">
              <button onClick={toggleModal} className="btn btn-sm btn-primary text-xs">
                Close
              </button>
            </div>

          </div>
          <div className="modal-backdrop bg-black/50 backdrop-blur-xs" onClick={toggleModal} />
        </div>
      )}
    </>
  );
});

export default ProjectCard;
