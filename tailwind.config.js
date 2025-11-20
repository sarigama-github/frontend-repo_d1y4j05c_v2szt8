/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        secondary: '#059669',
        accent: '#34D399',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6',
        neutral: '#1F2937',
        background: '#F9FAFB',
      },
      boxShadow: {
        soft: '0 10px 25px -5px rgba(16,185,129,0.15), 0 8px 10px -6px rgba(16,185,129,0.1)'
      },
      borderRadius: {
        xl: '14px',
      }
    }
  },
  plugins: [],
}
