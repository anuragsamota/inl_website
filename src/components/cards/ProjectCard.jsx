import React, { useState, useCallback, memo } from 'react';
import { Tag, User, Award, X, Sparkles } from 'lucide-react';

const ProjectCard = memo(function ProjectCard({ project }) {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen(prev => !prev);
  }, []);

  return (
    <>
      <div className="card card-border bg-base-100 shadow-xs hover:border-primary transition-all duration-300 flex flex-col justify-between overflow-hidden group min-h-[380px]">
        
        {/* Image Header with Aspect-Ratio Container to eliminate CLS */}
        <div className="relative aspect-video w-full overflow-hidden bg-base-200 shrink-0">
          <img 
            src={project.image} 
            alt={project.title} 
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-100/90 via-base-100/20 to-transparent" />
          
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="badge badge-sm badge-primary font-mono text-[10px]">
              {project.category}
            </span>
            <span className="badge badge-sm badge-outline bg-base-100/80 font-mono text-[10px]">
              {project.status}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body p-5 space-y-3 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="card-title text-base font-bold font-serif text-base-content leading-snug">
              {project.title}
            </h3>

            <p className="text-xs text-base-content/80 line-clamp-3 leading-relaxed min-h-[48px]">
              {project.description}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {/* Meta Lead & Sponsor */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono text-base-content/70 border-t border-base-200 pt-2">
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-primary" />
                <span>{project.lead}</span>
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
        <div className="modal modal-open z-[100] animate-in fade-in duration-200">
          <div className="modal-box max-w-2xl bg-base-100 border border-base-300 p-6 space-y-5 rounded-xl">
            
            <div className="flex items-start justify-between border-b border-base-200 pb-3">
              <div>
                <span className="badge badge-primary text-xs font-mono mb-1">{project.category}</span>
                <h3 className="font-serif font-bold text-lg text-base-content">{project.title}</h3>
              </div>
              <button onClick={toggleModal} className="btn btn-ghost btn-xs btn-square">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-base-content/85">
              <div className="grid grid-cols-2 gap-3 bg-base-200 p-3 rounded-lg font-mono">
                <div><strong>Lead Investigator:</strong> {project.lead}</div>
                <div><strong>Status:</strong> {project.status}</div>
                <div><strong>Start Date:</strong> {project.startDate || '2024'}</div>
                <div><strong>Sponsor:</strong> {project.sponsor || 'Departmental Research'}</div>
              </div>

              <div>
                <h4 className="font-bold text-xs font-mono uppercase text-base-content/60 mb-1">Abstract & Objectives</h4>
                <p className="whitespace-pre-line">{project.description}</p>
              </div>

              {project.tags && (
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
