/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        mono: ['Fira Code', 'monospace'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        academic: {
          "primary": "#0f2942",         // Oxford Navy Blue
          "primary-content": "#ffffff",
          "secondary": "#475569",       // Slate
          "secondary-content": "#ffffff",
          "accent": "#991b1b",          // Crimson
          "accent-content": "#ffffff",
          "neutral": "#0f172a",
          "neutral-content": "#f8fafc",
          "base-100": "#ffffff",        // Crisp White
          "base-200": "#f8fafc",        // Light Gray
          "base-300": "#e2e8f0",        // Border Tone
          "base-content": "#0f172a",    // Deep Navy Slate Text
          "info": "#2563eb",
          "success": "#059669",
          "warning": "#d97706",
          "error": "#dc2626",
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.375rem",
          "--rounded-badge": "0.25rem",
        },
        "academic-dark": {
          "primary": "#38bdf8",         // Cyan Glow Accent
          "primary-content": "#0f172a",
          "secondary": "#94a3b8",
          "secondary-content": "#0f172a",
          "accent": "#f43f5e",
          "neutral": "#0b1329",
          "neutral-content": "#f8fafc",
          "base-100": "#0b1329",        // Midnight Oxford Navy
          "base-200": "#111c38",
          "base-300": "#1e293b",
          "base-content": "#f1f5f9",
          "info": "#60a5fa",
          "success": "#34d399",
          "warning": "#fbbf24",
          "error": "#f87171",
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.375rem",
          "--rounded-badge": "0.25rem",
        },
        "lofi-dark": {
          "primary": "#ffffff",         // Stark White primary button/accent
          "primary-content": "#000000",
          "secondary": "#a3a3a3",       // Neutral Gray
          "secondary-content": "#000000",
          "accent": "#e5e5e5",
          "accent-content": "#000000",
          "neutral": "#171717",
          "neutral-content": "#ffffff",
          "base-100": "#000000",        // Pure Dark Pitch Canvas
          "base-200": "#121212",        // Elevating Dark Surface
          "base-300": "#262626",        // Crisp 1px Border Tone
          "base-content": "#f5f5f5",    // Crisp High-Contrast White Text
          "info": "#a3a3a3",
          "success": "#ffffff",
          "warning": "#d4d4d4",
          "error": "#ef4444",
          "--rounded-box": "0.375rem",
          "--rounded-btn": "0.25rem",
          "--rounded-badge": "0.125rem",
        }
      },
      "lofi",
      "nord",
      "emerald",
      "corporate"
    ],
    darkTheme: "lofi-dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
  },
}
