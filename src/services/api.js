import { fetchRuntimeConfig } from './configService';

// Helper to safely parse array attributes
const safeArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      return val.split(',').map(s => s.trim()).filter(Boolean);
    }
  }
  return [];
};

export const getLabInfo = async () => {
  const config = await fetchRuntimeConfig();
  return config.labInfo;
};

export const getRuntimeFilters = async () => {
  const config = await fetchRuntimeConfig();
  return config.filters;
};

export const getRuntimeThemes = async () => {
  const config = await fetchRuntimeConfig();
  return config.themes;
};

export const getProjects = async (categoryFilter = null) => {
  let data = [];
  try {
    // Explicitly bypass browser caching with no-store request policy
    const response = await fetch('/data/projects.json?cache_bust=' + Date.now(), { cache: 'no-store' });
    if (response.ok) {
      const list = await response.json();
      data = list
        .filter(item => item.title && item.title.trim() !== '' && item.lead && item.lead.trim() !== '')
        .map(item => ({
          $id: item.$id || item.id,
          title: item.title,
          category: item.category || 'General',
          status: item.status || 'Active',
          lead: item.lead,
          description: item.description || '',
          tags: safeArray(item.tags),
          featured: Boolean(item.featured),
          image: item.image || '',
          startDate: item.startDate || '',
          sponsor: item.sponsor || ''
        }));
    }
  } catch (err) {
    console.warn('Could not fetch projects.json:', err);
  }

  if (categoryFilter && categoryFilter !== 'All') {
    data = data.filter(item => 
      item.category === categoryFilter || (item.tags && item.tags.includes(categoryFilter))
    );
  }

  return { data };
};

export const getPublications = async (searchQuery = '', typeFilter = 'All', yearFilter = 'All') => {
  let data = [];
  try {
    const response = await fetch('/data/publications.json?cache_bust=' + Date.now(), { cache: 'no-store' });
    if (response.ok) {
      const list = await response.json();
      data = list
        .filter(item => item.title && item.title.trim() !== '' && item.venue && item.venue.trim() !== '')
        .map(item => ({
          $id: item.$id || item.id,
          title: item.title,
          authors: safeArray(item.authors),
          venue: item.venue,
          year: item.year ? parseInt(item.year, 10) : new Date().getFullYear(),
          type: item.type || 'Conference',
          doi: item.doi || '',
          pdfUrl: item.pdfUrl || '',
          abstract: item.abstract || '',
          tags: safeArray(item.tags),
          featured: Boolean(item.featured)
        }));
    }
  } catch (err) {
    console.warn('Could not fetch publications.json:', err);
  }

  if (typeFilter && typeFilter !== 'All') {
    data = data.filter(item => item.type === typeFilter);
  }
  if (yearFilter && yearFilter !== 'All') {
    data = data.filter(item => item.year === parseInt(yearFilter, 10));
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    data = data.filter(p => 
      p.title.toLowerCase().includes(q) ||
      (p.authors && p.authors.some(a => a.toLowerCase().includes(q))) ||
      p.venue.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  return { data };
};

export const getPeople = async (categoryFilter = 'All') => {
  let data = [];
  try {
    const response = await fetch('/data/people.json?cache_bust=' + Date.now(), { cache: 'no-store' });
    if (response.ok) {
      const list = await response.json();
      data = list
        .filter(item => item.name && item.name.trim() !== '' && item.role && item.role.trim() !== '')
        .map(item => ({
          $id: item.$id || item.id,
          name: item.name,
          role: item.role,
          category: item.category || 'PhD Students',
          title: item.title || '',
          avatar: item.avatar || '',
          bio: item.bio || '',
          researchInterests: safeArray(item.researchInterests),
          scholar: item.scholar || '',
          github: item.github || '',
          email: item.email || '',
          office: item.office || '',
          website: item.website || ''
        }));
    }
  } catch (err) {
    console.warn('Could not fetch people.json:', err);
  }

  if (categoryFilter && categoryFilter !== 'All') {
    data = data.filter(item => item.category === categoryFilter);
  }

  return { data };
};

export const getPersonById = async (id) => {
  const all = await getPeople();
  const found = all.data.find(p => p.$id === id);
  return { data: found || null };
};

export const getNews = async () => {
  let data = [];
  try {
    const response = await fetch('/data/news.json?cache_bust=' + Date.now(), { cache: 'no-store' });
    if (response.ok) {
      const list = await response.json();
      data = list
        .filter(item => item.title && item.title.trim() !== '' && item.date && item.date.trim() !== '')
        .map(item => ({
          $id: item.$id || item.id,
          title: item.title,
          date: item.date,
          category: item.category || 'Announcement',
          summary: item.summary || item.content || '',
          content: item.content || item.summary || ''
        }));
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  } catch (err) {
    console.warn('Could not fetch news.json:', err);
  }

  return { data };
};

export const getNewsById = async (id) => {
  const all = await getNews();
  const found = all.data.find(n => n.$id === id);
  return { data: found || null };
};

export const submitContactForm = async (formData) => {
  console.log('Inquiry submitted locally:', formData);
  return { success: true, message: 'Message sent successfully.' };
};
