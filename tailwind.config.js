/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1E40AF', // Deep institutional blue - blue-800
        'primary-50': '#EFF6FF', // Very light blue - blue-50
        'primary-100': '#DBEAFE', // Light blue - blue-100
        'primary-500': '#3B82F6', // Medium blue - blue-500
        'primary-600': '#2563EB', // Darker blue - blue-600
        'primary-700': '#1D4ED8', // Dark blue - blue-700
        
        // Secondary Colors
        'secondary': '#7C3AED', // Sophisticated purple - violet-600
        'secondary-50': '#F5F3FF', // Very light purple - violet-50
        'secondary-100': '#EDE9FE', // Light purple - violet-100
        'secondary-500': '#8B5CF6', // Medium purple - violet-500
        
        // Accent Colors
        'accent': '#F59E0B', // Warm amber - amber-500
        'accent-50': '#FFFBEB', // Very light amber - amber-50
        'accent-100': '#FEF3C7', // Light amber - amber-100
        'accent-600': '#D97706', // Darker amber - amber-600
        
        // Background Colors
        'background': '#FAFBFC', // Soft off-white - slate-50
        'surface': '#FFFFFF', // Pure white - white
        
        // Text Colors
        'text-primary': '#1F2937', // Rich charcoal - gray-800
        'text-secondary': '#6B7280', // Balanced gray - gray-500
        
        // Status Colors
        'success': '#10B981', // Fresh green - emerald-500
        'success-50': '#ECFDF5', // Very light green - emerald-50
        'success-100': '#D1FAE5', // Light green - emerald-100
        
        'warning': '#F59E0B', // Amber warning - amber-500
        'warning-50': '#FFFBEB', // Very light amber - amber-50
        'warning-100': '#FEF3C7', // Light amber - amber-100
        
        'error': '#EF4444', // Clear red - red-500
        'error-50': '#FEF2F2', // Very light red - red-50
        'error-100': '#FEE2E2', // Light red - red-100
        
        // Border Colors
        'border': '#E5E7EB', // Light gray border - gray-200
        'border-strong': '#D1D5DB', // Stronger gray border - gray-300
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'elevated': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'smooth': 'ease-out',
        'layout': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '900': '900',
        '950': '950',
        '1000': '1000',
        '1100': '1100',
      },
    },
  },
  plugins: [],
}