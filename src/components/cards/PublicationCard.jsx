import React, { memo } from 'react';
import { BookOpen, FileText, ExternalLink } from 'lucide-react';

const PublicationCard = memo(function PublicationCard({ publication }) {

  return (
    <>
      <div className="card card-border bg-base-100 p-5 space-y-4 shadow-xs hover:border-primary transition-all duration-300 flex flex-col justify-between">
        
        <div className="space-y-3">
          {/* Header Badges */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="badge badge-sm badge-primary font-mono text-[10px]">
                {publication.type}
              </span>
              <span className="text-xs font-mono text-base-content/60 font-semibold">
                {publication.year}
              </span>
            </div>

            {publication.featured && (
              <span className="badge badge-xs badge-neutral font-mono">
                Featured Paper
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="card-title text-base font-bold font-serif text-base-content leading-snug">
            {publication.title}
          </h3>

          {/* Authors */}
          <p className="text-xs font-mono text-base-content/80">
            {publication.authors?.join(', ')}
          </p>

          {/* Venue */}
          <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span className="italic">{publication.venue}</span>
          </div>

          {/* Abstract Snippet */}
          {publication.abstract && (
            <p className="text-xs text-base-content/75 line-clamp-2 leading-relaxed">
              {publication.abstract}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-base-200 flex items-center justify-end gap-2">
          
          <div className="flex items-center gap-2">
            {publication.pdfUrl && (
              <a
                href={publication.pdfUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-outline btn-xs gap-1 font-mono text-xs"
              >
                <FileText className="w-3 h-3" />
                <span>PDF</span>
              </a>
            )}

            {publication.doi && (
              <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-primary btn-xs gap-1 font-mono text-xs"
              >
                <ExternalLink className="w-3 h-3" />
                <span>DOI</span>
              </a>
            )}
          </div>

        </div>

      </div>
    </>
  );
});

export default PublicationCard;
