import React, { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2, Check } from 'lucide-react';
import SEO from '../components/common/SEO';
import { getNewsById, getNews } from '../services/api';

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

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [otherNews, setOtherNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const res = await getNewsById(id);
        const allRes = await getNews();
        
        if (isMounted) {
          if (res.data) {
            setArticle(res.data);
            setOtherNews(allRes.data.filter(n => n.$id !== id).slice(0, 3));
          } else {
            setArticle(null);
          }
        }
      } catch (err) {
        console.error('Error loading news article detail:', err);
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="h-6 w-32 bg-base-200 rounded animate-pulse" />
        <div className="h-10 w-3/4 bg-base-200 rounded animate-pulse" />
        <div className="h-64 bg-base-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-base-content">Article Not Found</h2>
        <p className="text-xs text-base-content/70">The requested announcement could not be found.</p>
        <button onClick={() => navigate('/news')} className="btn btn-sm btn-primary">
          Back to All News
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${article.title} | Intelligent Networks Laboratory`}
        description={article.summary || article.content}
      />

      <div className="space-y-10 max-w-4xl mx-auto px-4">
        
        {/* Back Link */}
        <NavLink to="/news" className="btn btn-ghost btn-xs gap-1.5 text-xs font-mono">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News & Announcements</span>
        </NavLink>

        {/* Main Article Card */}
        <article className="card card-border bg-base-100 p-6 sm:p-10 space-y-6">
          
          <div className="space-y-3 border-b border-base-200 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="badge badge-primary text-xs font-mono font-semibold">
                  {article.category || 'Announcement'}
                </span>
                <span className="text-xs font-mono text-base-content/60 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  {formatDate(article.date)}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="btn btn-ghost btn-xs gap-1 font-mono text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-base-content leading-tight">
              {article.title}
            </h1>
          </div>

          {/* Body Content */}
          <div className="prose prose-sm max-w-none text-base-content/90 leading-relaxed space-y-4">
            <p className="text-sm font-medium text-base-content leading-relaxed">
              {article.summary}
            </p>

            {article.content && article.content !== article.summary && (
              <div className="pt-4 text-xs sm:text-sm text-base-content/80 space-y-4 whitespace-pre-line leading-relaxed">
                {article.content}
              </div>
            )}
          </div>

        </article>

        {/* Other Recent News */}
        {otherNews.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-base-200">
            <h3 className="text-base font-bold font-display text-base-content">
              More Recent Announcements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherNews.map(item => (
                <NavLink 
                  key={item.$id} 
                  to={`/news/${item.$id}`}
                  className="card card-border bg-base-100 p-4 space-y-2 hover:border-primary transition-colors"
                >
                  <span className="text-xs font-mono text-primary font-medium">{formatDate(item.date)}</span>
                  <h4 className="font-bold text-xs text-base-content line-clamp-2">{item.title}</h4>
                </NavLink>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
