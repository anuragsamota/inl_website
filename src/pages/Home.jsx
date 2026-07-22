import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  Award, 
  GraduationCap, 
  Network, 
  ChevronRight,
  Newspaper,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import NetworkCanvas from '../components/visualizers/NetworkCanvas';
import PublicationCard from '../components/cards/PublicationCard';
import ProjectCard from '../components/cards/ProjectCard';
import SEO from '../components/common/SEO';
import { getLabInfo, getProjects, getPublications, getNews } from '../services/api';

export default function Home() {
  const [labInfo, setLabInfo] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [recentPubs, setRecentPubs] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadHomeData() {
      setLoading(true);
      try {
        const info = await getLabInfo();
        const projectsRes = await getProjects();
        const pubsRes = await getPublications();
        const newsRes = await getNews();

        if (isMounted) {
          setLabInfo(info);
          setFeaturedProjects(projectsRes.data.filter(p => p.featured).slice(0, 3));
          setRecentPubs(pubsRes.data.slice(0, 3));
          setNews(newsRes.data || []);
        }
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadHomeData();
    return () => { isMounted = false; };
  }, []);

  const featuredNews = news[0];
  const sideNews = news.slice(1, 4);

  return (
    <>
      <SEO 
        title="Intelligent Networks Laboratory"
        description="Research in Intelligent Wireless Networks, Programmable Data Planes, and Quantum Communication."
      />

      <div className="space-y-12 sm:space-y-16">
        
        {/* HERO SECTION - Stable Flex Layout with ZERO CLS */}
        <section className="relative w-full py-16 sm:py-24 border-b border-base-200 overflow-hidden flex items-center justify-center bg-base-100 min-h-[480px]">
          <NetworkCanvas />

          <div className="relative z-10 max-w-3xl w-full mx-auto px-4 text-center space-y-6">
            
            <div className="inline-block">
              <span className="badge badge-lg badge-outline badge-primary font-mono text-xs py-3 px-4">
                Intelligent Networks Laboratory
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-base-content leading-tight tracking-tight">
              Research in <span className="text-primary">Next-Gen Wireless</span> & Programmable Systems
            </h1>

            <p className="text-sm sm:text-base text-base-content/80 max-w-2xl mx-auto leading-relaxed">
              {labInfo?.description || "The Intelligent Networks Laboratory conducts research across 6G Open-RAN slicing, kernel-level eBPF security telemetry, and quantum optical mesh networks."}
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <NavLink to="/research" className="btn btn-primary btn-md gap-2 min-h-[44px] px-6">
                <span>Research Projects</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>

              <NavLink to="/publications" className="btn btn-outline btn-md gap-2 min-h-[44px] px-6">
                <BookOpen className="w-4 h-4" />
                <span>Publications</span>
              </NavLink>
            </div>

          </div>
        </section>

        {/* LAB STATS COMPONENT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="stats stats-vertical sm:stats-horizontal shadow-sm border border-base-300 w-full bg-base-100 rounded-xl">
            {labInfo?.stats.map((stat, idx) => {
              const icons = { TrendingUp, BookOpen, Award, GraduationCap };
              const Icon = icons[stat.icon] || Network;
              return (
                <div key={idx} className="stat text-center sm:text-left py-4 sm:py-6">
                  <div className="stat-figure text-primary hidden sm:block">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="stat-title text-xs uppercase font-mono">{stat.label}</div>
                  <div className="stat-value text-2xl sm:text-3xl text-primary">{stat.value}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FEATURED RESEARCH PROJECTS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-center justify-between border-b border-base-200 pb-3">
            <div>
              <span className="text-xs font-mono font-semibold text-primary uppercase">Focus Areas</span>
              <h2 className="text-xl sm:text-2xl font-bold text-base-content font-display">Featured Research</h2>
            </div>
            <NavLink to="/research" className="btn btn-sm btn-ghost gap-1 text-primary text-xs">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </NavLink>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(n => <div key={n} className="h-[360px] rounded-xl bg-base-200/60 animate-pulse border border-base-300" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map(project => (
                <ProjectCard key={project.$id} project={project} />
              ))}
            </div>
          )}
        </section>

        {/* RECENT PUBLICATIONS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-center justify-between border-b border-base-200 pb-3">
            <div>
              <span className="text-xs font-mono font-semibold text-primary uppercase">Academic Output</span>
              <h2 className="text-xl sm:text-2xl font-bold text-base-content font-display">Recent Publications</h2>
            </div>
            <NavLink to="/publications" className="btn btn-sm btn-ghost gap-1 text-primary text-xs">
              <span>Search All</span>
              <ChevronRight className="w-4 h-4" />
            </NavLink>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(n => <div key={n} className="h-[220px] rounded-xl bg-base-200/60 animate-pulse border border-base-300" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPubs.map(pub => (
                <PublicationCard key={pub.$id} publication={pub} />
              ))}
            </div>
          )}
        </section>

        {/* LAB NEWS & ANNOUNCEMENTS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-center justify-between border-b border-base-200 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-base-content font-display flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-primary" />
              <span>News & Announcements</span>
            </h2>
            <NavLink to="/news" className="btn btn-sm btn-ghost text-xs gap-1 text-primary">
              <span>All Announcements</span>
              <ChevronRight className="w-4 h-4" />
            </NavLink>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 h-[260px] bg-base-200/60 rounded-xl animate-pulse border border-base-300" />
              <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                {[1, 2, 3].map(n => <div key={n} className="h-[76px] bg-base-200/60 rounded-xl animate-pulse border border-base-300" />)}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Headline Announcement */}
              {featuredNews && (
                <div className="lg:col-span-7 card card-border bg-base-100 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{featuredNews.date}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-serif text-base-content leading-snug">
                      <NavLink to={`/news/${featuredNews.$id}`} className="hover:text-primary transition-colors">
                        {featuredNews.title}
                      </NavLink>
                    </h3>

                    <p className="text-xs text-base-content/80 leading-relaxed">
                      {featuredNews.summary || featuredNews.content}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-base-200 flex justify-end">
                    <NavLink to={`/news/${featuredNews.$id}`} className="btn btn-xs btn-outline btn-primary gap-1">
                      <span>Read Full Page</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </NavLink>
                  </div>
                </div>
              )}

              {/* Right Column: Recent News Bulletins */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                {sideNews.map((item) => (
                  <NavLink 
                    key={item.$id} 
                    to={`/news/${item.$id}`}
                    className="card card-border bg-base-100 p-4 space-y-2 hover:border-primary transition-colors block"
                  >
                    <div className="text-xs font-mono text-primary font-medium">
                      {item.date}
                    </div>

                    <h4 className="font-bold text-xs text-base-content leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-[11px] text-base-content/70 line-clamp-2 leading-relaxed">
                      {item.summary || item.content}
                    </p>
                  </NavLink>
                ))}
              </div>

            </div>
          )}
        </section>

        {/* PROSPECTIVE STUDENTS BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="card card-border bg-base-200 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="badge badge-primary text-xs">Join Us</span>
              <h2 className="text-xl sm:text-2xl font-bold text-base-content font-display">Prospective Researchers & Graduate Students</h2>
              <p className="text-xs text-base-content/70 max-w-xl">
                We invite applications from motivated doctoral students and postdoctoral researchers in wireless networks, eBPF telemetry, and quantum optics.
              </p>
            </div>
            <NavLink to="/contact" className="btn btn-primary text-xs gap-2 shrink-0 min-h-[44px] px-6">
              <span>Contact Admissions</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </section>

      </div>
    </>
  );
}
