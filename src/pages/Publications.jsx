import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import PublicationCard from '../components/cards/PublicationCard';
import SEO from '../components/common/SEO';
import { getPublications, getRuntimeFilters } from '../services/api';

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [types, setTypes] = useState(['All', 'Conference', 'Journal']);
  const [years, setYears] = useState(['All', '2025', '2024', '2023']);
  const [searchQuery, setSearchQuery] = useState('');
  const [localQuery, setLocalQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadFilters() {
      const filters = await getRuntimeFilters();
      if (isMounted) {
        if (filters?.publicationTypes) setTypes(filters.publicationTypes);
        if (filters?.publicationYears) setYears(filters.publicationYears);
      }
    }
    loadFilters();
    return () => { isMounted = false; };
  }, []);

  // Debounced search logic to prevent execution on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 220);
    return () => clearTimeout(handler);
  }, [localQuery]);

  useEffect(() => {
    let isMounted = true;
    async function fetchPubs() {
      setLoading(true);
      try {
        const res = await getPublications(searchQuery, selectedType, selectedYear);
        if (isMounted) setPublications(res.data);
      } catch (err) {
        console.error('Error fetching publications:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchPubs();
    return () => { isMounted = false; };
  }, [searchQuery, selectedType, selectedYear]);

  return (
    <>
      <SEO 
        title="Publications | Intelligent Networks Laboratory"
        description="Peer-reviewed conference proceedings and journal articles from the Intelligent Networks Laboratory."
      />

      <div className="space-y-8 max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="border-b border-base-200 pb-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>Academic Bibliography</span>
          </div>
          <h1 className="text-3xl font-extrabold font-display text-base-content">
            Publications
          </h1>
          <p className="text-xs text-base-content/70 max-w-2xl">
            Peer-reviewed papers in top IEEE/ACM conferences and transactions. Includes 1-click BibTeX exports.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-base-200 p-3 rounded-lg border border-base-300">
          
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by title, author, or venue..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="input input-sm input-bordered w-full text-xs"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="select select-sm select-bordered text-xs font-medium"
            >
              {types.map(t => <option key={t} value={t}>Type: {t}</option>)}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="select select-sm select-bordered text-xs font-medium"
            >
              {years.map(y => <option key={y} value={y}>Year: {y}</option>)}
            </select>
          </div>

        </div>

        {/* Publications Grid */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(n => <div key={n} className="h-32 rounded-lg bg-base-200 animate-pulse" />)}
          </div>
        ) : publications.length === 0 ? (
          <div className="text-center py-12 bg-base-100 border border-base-200 rounded-lg space-y-2">
            <p className="text-xs text-base-content/70">No publications found matching criteria.</p>
            <button 
              onClick={() => { setLocalQuery(''); setSelectedType('All'); setSelectedYear('All'); }}
              className="btn btn-xs btn-outline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publications.map(pub => (
              <PublicationCard key={pub.$id} publication={pub} />
            ))}
          </div>
        )}

      </div>
    </>
  );
}
