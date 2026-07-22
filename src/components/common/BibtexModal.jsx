import React, { useState, useCallback, memo } from 'react';
import { Copy, Check, X, FileCode } from 'lucide-react';

const BibtexModal = memo(function BibtexModal({ isOpen, onClose, publication }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!publication?.bibtex) return;
    navigator.clipboard.writeText(publication.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [publication]);

  if (!isOpen || !publication) return null;

  return (
    <div className="modal modal-open z-[100] animate-in fade-in duration-200">
      <div className="modal-box max-w-2xl bg-base-100 border border-base-300 p-6 space-y-4 shadow-2xl rounded-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-200 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs text-primary font-semibold">
            <FileCode className="w-4 h-4" />
            <span>BibTeX Citation Exporter</span>
          </div>
          <button 
            onClick={onClose} 
            className="btn btn-ghost btn-xs btn-square text-base-content/70 hover:text-base-content"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Paper Title */}
        <div className="space-y-1">
          <h4 className="font-serif font-bold text-sm text-base-content leading-snug">
            {publication.title}
          </h4>
          <p className="text-xs text-base-content/60 font-mono">
            {publication.venue} ({publication.year})
          </p>
        </div>

        {/* BibTeX Code Snippet Container */}
        <div className="relative group">
          <pre className="bg-base-200 p-4 rounded-lg border border-base-300 font-mono text-[11px] leading-relaxed text-base-content/90 overflow-x-auto select-all">
            {publication.bibtex}
          </pre>

          <button
            onClick={handleCopy}
            className="btn btn-primary btn-xs absolute top-3 right-3 gap-1 shadow-sm font-mono text-[11px]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-success-content" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Actions */}
        <div className="modal-action border-t border-base-200 pt-3">
          <button onClick={onClose} className="btn btn-sm btn-ghost text-xs">
            Close Window
          </button>
        </div>

      </div>
      <div className="modal-backdrop bg-black/50 backdrop-blur-xs" onClick={onClose} />
    </div>
  );
});

export default BibtexModal;
