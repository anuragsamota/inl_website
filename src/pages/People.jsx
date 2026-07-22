import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import PersonCard from '../components/cards/PersonCard';
import SEO from '../components/common/SEO';
import { getPeople, getRuntimeFilters } from '../services/api';

export default function People() {
  const [people, setPeople] = useState([]);
  const [categories, setCategories] = useState(['All', 'Faculty', 'Postdocs', 'PhD Students', 'Alumni']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadFilters() {
      const filters = await getRuntimeFilters();
      if (isMounted && filters?.peopleCategories) setCategories(filters.peopleCategories);
    }
    loadFilters();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function fetchPeopleData() {
      setLoading(true);
      try {
        const res = await getPeople(activeCategory);
        if (isMounted) setPeople(res.data);
      } catch (err) {
        console.error('Error fetching people data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchPeopleData();
    return () => { isMounted = false; };
  }, [activeCategory]);

  return (
    <>
      <SEO 
        title="People | Intelligent Networks Laboratory"
        description="Faculty, doctoral candidates, and alumni directory at the Intelligent Networks Laboratory."
      />

      <div className="space-y-8 max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="border-b border-base-200 pb-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
            <Users className="w-4 h-4" />
            <span>Lab Members</span>
          </div>
          <h1 className="text-3xl font-extrabold font-display text-base-content">
            People & Directory
          </h1>
          <p className="text-xs text-base-content/70 max-w-2xl">
            Faculty, postdoctoral scholars, doctoral candidates, and distinguished alumni driving research.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1 bg-base-200 p-1.5 rounded-lg border border-base-300 max-w-xl">
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

        {/* Grid Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-56 rounded-lg bg-base-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {people.map((person) => (
              <PersonCard key={person.$id} person={person} />
            ))}
          </div>
        )}

      </div>
    </>
  );
}
