import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import PersonCard from '../components/cards/PersonCard';
import SEO from '../components/common/SEO';
import { getPeople, getRuntimeFilters } from '../services/api';

export default function People() {
  const [people, setPeople] = useState([]);
  const [categories, setCategories] = useState(['Supervisor', 'PhD Students', "Master's Students", 'Alumni']);
  const [activeCategory, setActiveCategory] = useState(() => {
    // Persist active tab filter state to prevent reload reset on profile navigation
    return sessionStorage.getItem('inl_active_people_category') || 'Supervisor';
  });
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

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    sessionStorage.setItem('inl_active_people_category', cat);
  };

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
            Research Team & Members
          </h1>
          <p className="text-xs text-base-content/70 max-w-2xl">
            Meet the faculty directors, graduate scholars, and distinguished alumni driving our core research.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1 bg-base-200 p-1.5 rounded-lg border border-base-300 max-w-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
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
        ) : people.length === 0 ? (
          <div className="text-center py-12 bg-base-100 border border-base-200 rounded-lg space-y-2">
            <p className="text-xs text-base-content/70">No {activeCategory.toLowerCase()} listed in this category yet.</p>
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
