import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CommonSchema from './components/common/CommonSchema';

// Lazy-loaded Page Routes for Code-Splitting and Optimal Load Performance
const Home = lazy(() => import('./pages/Home'));
const Publications = lazy(() => import('./pages/Publications'));
const People = lazy(() => import('./pages/People'));
const PersonDetail = lazy(() => import('./pages/PersonDetail'));
const News = lazy(() => import('./pages/News'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <span className="loading loading-spinner loading-md text-primary" />
    </div>
  );
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content selection:bg-primary selection:text-primary-content">
      <ScrollToTop />
      <CommonSchema />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Viewport with Suspense Code-Splitting */}
      <main className="flex-1 py-8">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/people" element={<People />} />
            <Route path="/people/:id" element={<PersonDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Catch-all 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
