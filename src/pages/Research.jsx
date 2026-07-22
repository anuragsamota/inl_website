import React, { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';
import ProjectCard from '../components/cards/ProjectCard';
import SEO from '../components/common/SEO';
import { getProjects, getRuntimeFilters } from '../services/api';

export default function Research() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadFilters() {
      const filters = await getRuntimeFilters();
      if (isMounted && filters?.researchCategories) {
        setCategories(filters.researchCategories);
      }
    }
    loadFilters();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function fetchProjectsData() {
      setLoading(true);
      try {
        const res = await getProjects(activeCategory);
        if (isMounted) setProjects(res.data);
      } catch (err) {
        console.error('Error fetching research projects:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchProjectsData();
    return () => { isMounted = false; };
  }, [activeCategory]);

  const filteredProjects = projects.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
      p.lead.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <SEO 
        title="Research Projects | Intelligent Networks Laboratory"
        description="Active research projects at the Intelligent Networks Laboratory."
      />

      <div className="space-y-8 max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="border-b border-base-200 pb-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
            <Cpu className="w-4 h-4" />
            <span>Research Directions</span>
          </div>
          <h1 className="text-3xl font-extrabold font-display text-base-content">
            Research Areas & Projects
          </h1>
          <p className="text-xs text-base-content/70 max-w-2xl">
            Our research addresses fundamental limits and systems challenges across next-generation wireless networks, programmable data planes, and quantum communication lines.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-base-200 p-3 rounded-lg border border-base-300">
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn btn-xs ${activeCategory === cat ? 'btn-primary' : 'btn-ghost'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-sm input-bordered w-full text-xs"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-lg bg-base-200 animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-base-100 border border-base-200 rounded-lg space-y-2">
            <p className="text-xs text-base-content/70">No projects found matching criteria.</p>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="btn btn-xs btn-outline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.$id} project={project} />
            ))}
          </div>
        )}

      </div>
    </>
  );
}
