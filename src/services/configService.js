// Runtime Configuration Service - Fetches public/lab-config.json at runtime without requiring rebuilds

let cachedConfig = null;

export const DEFAULT_CONFIG = {
  labInfo: {
    name: "Intelligent Networks Laboratory",
    shortName: "Intelligent Networks Laboratory",
    department: "Department of Computer Science & Engineering",
    university: "Institute of Advanced Engineering & Technology",
    tagline: "Research in Intelligent Wireless Networks, Programmable Data Planes, and Quantum Communication",
    description: "The Intelligent Networks Laboratory conducts fundamental and applied research in 6G systems, software-defined networking (SDN), network security, and quantum communications.",
    location: "Computer Science Building, Room 402",
    address: "100 University Parkway, Campus Box 104",
    email: "contact@intelligent-networks-lab.org",
    phone: "+1 (555) 019-2834",
    socials: {
      github: "https://github.com",
      scholar: "https://scholar.google.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    },
    stats: [
      { label: "Citations", value: "5,400+", icon: "TrendingUp" },
      { label: "Publications", value: "135+", icon: "BookOpen" },
      { label: "Active Grants", value: "$6.8M", icon: "Award" },
      { label: "Alumni Placements", value: "100%", icon: "GraduationCap" }
    ]
  },
  filters: {
    researchCategories: ["All", "6G & Wireless", "Network Security", "Quantum Networks", "SDN & Routing", "Satellite Networks"],
    peopleCategories: ["All", "Faculty", "Postdocs", "PhD Students", "Alumni"],
    publicationTypes: ["All", "Conference", "Journal"],
    publicationYears: ["All", "2025", "2024", "2023"]
  },
  themes: [
    { id: "lofi-dark", label: "Monochrome Lofi Dark", color: "#000000" },
    { id: "lofi", label: "Monochrome Lofi Light", color: "#ffffff" },
    { id: "academic", label: "Oxford Navy (Academic Light)", color: "#0f2942" },
    { id: "academic-dark", label: "Oxford Midnight (Academic Dark)", color: "#38bdf8" },
    { id: "emerald", label: "Cambridge Emerald", color: "#059669" },
    { id: "nord", label: "Nordic Slate", color: "#5e81ac" },
    { id: "corporate", label: "Corporate Clean", color: "#2563eb" }
  ]
};

export const fetchRuntimeConfig = async () => {
  if (cachedConfig) return cachedConfig;
  try {
    const response = await fetch('/lab-config.json?cache_bust=' + Date.now());
    if (response.ok) {
      const data = await response.json();
      cachedConfig = { ...DEFAULT_CONFIG, ...data };
      return cachedConfig;
    }
  } catch (err) {
    console.warn('Could not fetch runtime lab-config.json, using default configuration:', err);
  }
  cachedConfig = DEFAULT_CONFIG;
  return cachedConfig;
};
