// Runtime Configuration Service - Fetches public/lab-config.json at runtime without requiring rebuilds

let cachedConfig = null;

export const fetchRuntimeConfig = async () => {
  if (cachedConfig) return cachedConfig;
  try {
    // Force browser to bypass cache using no-store header options
    const response = await fetch('/lab-config.json?cache_bust=' + Date.now(), { cache: 'no-store' });
    if (response.ok) {
      cachedConfig = await response.json();
      return cachedConfig;
    }
  } catch (err) {
    console.warn('Could not fetch runtime lab-config.json:', err);
  }
  // Safe empty fallback state to prevent page crashes when configuration is missing
  cachedConfig = {
    labInfo: null,
    filters: {
      researchCategories: ["All"],
      peopleCategories: ["All"],
      publicationTypes: ["All"],
      publicationYears: ["All"]
    },
    themes: [
      { id: "imc-blue", label: "IMC Blue", color: "#1d4ed8" },
      { id: "imc-dark", label: "IMC Dark", color: "#0b1220" }
    ]
  };
  return cachedConfig;
};
