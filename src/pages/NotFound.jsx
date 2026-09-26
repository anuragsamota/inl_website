import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/common/SEO';
import NetworkCanvas from '../components/visualizers/NetworkCanvas';

const NotFound = memo(function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found | 404 Error"
        description="The requested page could not be located on the Intelligent Networks Laboratory website."
      />

      <div className="relative min-h-[75vh] w-full flex items-center justify-center overflow-hidden px-4">
        
        {/* Background Network visuals */}
        <NetworkCanvas />

        <div className="relative z-10 max-w-md w-full bg-base-100/70 backdrop-blur-md border border-base-300 p-8 sm:p-10 rounded-2xl text-center space-y-6 shadow-2xl">
          
          {/* Animated 404 Circle */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-error/10 border border-error/20 flex items-center justify-center text-error animate-bounce">
              <ShieldAlert className="w-8 h-8" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs text-error font-semibold tracking-widest uppercase">
              Error Code: 404
            </span>
            <h1 className="text-3xl font-extrabold font-display text-base-content leading-tight">
              Page Not Found
            </h1>
            <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
              The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>

          {/* Action Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-outline btn-sm gap-2 flex-1 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>

            <NavLink 
              to="/" 
              className="btn btn-primary btn-sm gap-2 flex-1 min-h-[44px]"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </NavLink>
          </div>

        </div>

      </div>
    </>
  );
});

export default NotFound;
