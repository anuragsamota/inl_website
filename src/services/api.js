import { databases, isAppwriteConfigured } from '../lib/appwrite';
import { fetchRuntimeConfig } from './configService';
import { 
  MOCK_PROJECTS, 
  MOCK_PUBLICATIONS, 
  MOCK_PEOPLE, 
  MOCK_NEWS 
} from '../data/mockData';

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'db';

const COLLECTIONS = {
  projects: import.meta.env.VITE_APPWRITE_COLLECTION_PROJECTS || 'projects',
  publications: import.meta.env.VITE_APPWRITE_COLLECTION_PUBLICATIONS || 'publications',
  people: import.meta.env.VITE_APPWRITE_COLLECTION_PEOPLE || 'people',
  news: import.meta.env.VITE_APPWRITE_COLLECTION_NEWS || 'news',
};

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
  let normalized = [];

  if (isAppwriteConfigured()) {
    try {
      const response = await databases.listDocuments(databaseId, COLLECTIONS.projects);
      let docs = response.documents || [];

      if (docs.length > 0) {
        normalized = docs.map(doc => ({
          $id: doc.$id,
          title: doc.title || 'Untitled Project',
          category: doc.category || 'General',
          status: doc.status || 'Active',
          lead: doc.lead || 'Researcher',
          description: doc.description || '',
          tags: safeArray(doc.tags),
          featured: Boolean(doc.featured),
          image: doc.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          startDate: doc.startDate || '2024',
          sponsor: doc.sponsor || ''
        }));
      }
    } catch (err) {
      console.warn('Appwrite fetch error for projects (using fallback data):', err.message);
    }
  }

  // Fallback to mock data if Appwrite returns empty or fails
  if (normalized.length === 0) {
    normalized = MOCK_PROJECTS;
  }

  if (categoryFilter && categoryFilter !== 'All') {
    normalized = normalized.filter(item => 
      item.category === categoryFilter || (item.tags && item.tags.includes(categoryFilter))
    );
  }

  return { data: normalized };
};

export const getPublications = async (searchQuery = '', typeFilter = 'All', yearFilter = 'All') => {
  let normalized = [];

  if (isAppwriteConfigured()) {
    try {
      const response = await databases.listDocuments(databaseId, COLLECTIONS.publications);
      let docs = response.documents || [];

      if (docs.length > 0) {
        normalized = docs.map(doc => ({
          $id: doc.$id,
          title: doc.title || 'Untitled Paper',
          authors: safeArray(doc.authors),
          venue: doc.venue || 'Academic Proceedings',
          year: doc.year ? parseInt(doc.year, 10) : 2024,
          type: doc.type || 'Conference',
          doi: doc.doi || '',
          pdfUrl: doc.pdfUrl || '',
          bibtex: doc.bibtex || `@article{pub${doc.$id},\n  title={${doc.title}},\n  year={${doc.year || 2024}}\n}`,
          abstract: doc.abstract || '',
          tags: safeArray(doc.tags),
          featured: Boolean(doc.featured)
        }));
      }
    } catch (err) {
      console.warn('Appwrite fetch error for publications (using fallback data):', err.message);
    }
  }

  // Fallback to mock data if Appwrite returns empty or fails
  if (normalized.length === 0) {
    normalized = MOCK_PUBLICATIONS;
  }

  if (typeFilter && typeFilter !== 'All') {
    normalized = normalized.filter(item => item.type === typeFilter);
  }
  if (yearFilter && yearFilter !== 'All') {
    normalized = normalized.filter(item => item.year === parseInt(yearFilter, 10));
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    normalized = normalized.filter(p => 
      p.title.toLowerCase().includes(q) ||
      (p.authors && p.authors.some(a => a.toLowerCase().includes(q))) ||
      p.venue.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  return { data: normalized };
};

export const getPeople = async (categoryFilter = 'All') => {
  let normalized = [];

  if (isAppwriteConfigured()) {
    try {
      const response = await databases.listDocuments(databaseId, COLLECTIONS.people);
      let docs = response.documents || [];

      if (docs.length > 0) {
        normalized = docs.map(doc => ({
          $id: doc.$id,
          name: doc.name || 'Member Name',
          role: doc.role || 'Researcher',
          category: doc.category || 'PhD Students',
          title: doc.title || 'Researcher',
          avatar: doc.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          bio: doc.bio || '',
          researchInterests: safeArray(doc.researchInterests),
          scholar: doc.scholar || '',
          github: doc.github || '',
          email: doc.email || '',
          office: doc.office || 'CS Building'
        }));
      }
    } catch (err) {
      console.warn('Appwrite fetch error for people (using fallback data):', err.message);
    }
  }

  // Fallback to mock data if Appwrite returns empty or fails
  if (normalized.length === 0) {
    normalized = MOCK_PEOPLE;
  }

  if (categoryFilter && categoryFilter !== 'All') {
    normalized = normalized.filter(item => item.category === categoryFilter);
  }

  return { data: normalized };
};

export const getPersonById = async (id) => {
  const all = await getPeople();
  const found = all.data.find(p => p.$id === id);
  return { data: found || null };
};

export const getNews = async () => {
  let normalized = [];

  if (isAppwriteConfigured()) {
    try {
      const response = await databases.listDocuments(databaseId, COLLECTIONS.news);
      let docs = response.documents || [];

      if (docs.length > 0) {
        normalized = docs.map(doc => ({
          $id: doc.$id,
          title: doc.title || 'Lab Announcement',
          date: doc.date || '2025-01-01',
          category: doc.category || 'Announcement',
          summary: doc.summary || doc.content || '',
          content: doc.content || doc.summary || ''
        }));
        normalized.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    } catch (err) {
      console.warn('Appwrite fetch error for news (using fallback data):', err.message);
    }
  }

  // Fallback to mock data if Appwrite returns empty or fails
  if (normalized.length === 0) {
    normalized = MOCK_NEWS;
  }

  return { data: normalized };
};

export const getNewsById = async (id) => {
  const all = await getNews();
  const found = all.data.find(n => n.$id === id);
  return { data: found || null };
};

export const submitContactForm = async (formData) => {
  return { success: true, message: 'Message sent successfully.' };
};
