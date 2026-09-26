import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Newspaper, Calendar, ArrowUpRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import { getNews } from '../services/api';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) {
    return dateStr;
  }
};

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [localQuery, setLocalQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchNewsData() {
      setLoading(true);
      try {
        const res = await getNews();
        if (isMounted) setNewsList(res.data || []);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchNewsData();
    return () => { isMounted = false; };
  }, []);

  // Debounced search logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 220);
    return () => clearTimeout(handler);
  }, [localQuery]);

  const filteredNews = newsList.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.summary && item.summary.toLowerCase().includes(q)) ||
      (item.content && item.content.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <SEO 
        title="News & Announcements | Intelligent Networks Laboratory"
        description="Recent research grants, paper acceptances, and announcements at the Intelligent Networks Laboratory."
      />

      <div className="space-y-8 max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="border-b border-base-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
              <Newspaper className="w-4 h-4" />
              <span>Announcements</span>
            </div>
            <h1 className="text-3xl font-extrabold font-display text-base-content">
              News & Updates
            </h1>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search announcements..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="input input-sm input-bordered w-full text-xs"
            />
          </div>
        </div>

        {/* Content List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(n => <div key={n} className="h-32 rounded-lg bg-base-200 animate-pulse" />)}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-12 bg-base-100 border border-base-200 rounded-lg space-y-2">
            <p className="text-xs text-base-content/70">No announcements found matching search query.</p>
            <button 
              onClick={() => setLocalQuery('')}
              className="btn btn-xs btn-outline"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNews.map((item) => (
              <div key={item.$id} className="card card-border bg-base-100 p-5 space-y-3 hover:border-primary transition-all">
                <div className="flex items-center justify-between text-xs font-mono text-base-content/60">
                  <span className="flex items-center gap-1.5 font-semibold text-primary">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(item.date)}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-serif text-base-content leading-snug">
                  <NavLink to={`/news/${item.$id}`} className="hover:text-primary transition-colors">
                    {item.title}
                  </NavLink>
                </h3>

                <p className="text-xs text-base-content/80 leading-relaxed">
                  {item.summary}
                </p>

                <div className="pt-2 border-t border-base-200 flex justify-end">
                  <NavLink
                    to={`/news/${item.$id}`}
                    className="btn btn-ghost btn-xs text-xs gap-1 text-primary"
                  >
                    <span>Read Full Page</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}
