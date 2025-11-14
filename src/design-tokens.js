/**
 * Design Tokens
 * 
 * Centralized design system values extracted from the codebase and Figma.
 * Replace hardcoded values throughout the app with these tokens.
 * 
 * Note: Some values were extracted from Figma (marked with [Figma]),
 * others were extracted from current codebase usage.
 */

export const designTokens = {
  // Colors
  colors: {
    // Primary Colors
    primary: '#ff6b6b',
    primaryGradientEnd: '#ff8e53',
    primaryHover: '#ff5252',
    primaryLight: 'rgba(255, 107, 107, 0.9)',
    primaryLight2: 'rgba(255, 107, 107, 0.3)',
    
    // Secondary Colors
    secondary: '#4CAF50',
    secondaryLight: 'rgba(76, 175, 80, 0.9)',
    
    // Accent Colors
    accent: '#9C27B0',
    
    // Text Colors
    textPrimary: '#333',
    textSecondary: '#666',
    textTertiary: '#999',
    textWhite: 'white',
    
    // Background Colors
    background: 'white',
    backgroundSecondary: '#f8f9fa',
    backgroundGradient: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
    
    // Border Colors
    border: '#e0e0e0',
    borderLight: 'rgba(224, 224, 224, 0.5)',
    
    // Semantic Colors
    success: '#4CAF50',
    error: '#ff4444',
    warning: '#ffd700',
    star: '#ffd700',
    
    // Overlay/Modal Colors
    overlay: 'rgba(0,0,0,0.8)',
    overlayLight: 'rgba(0,0,0,0.1)',
    
    // Figma Colors
    blackTransparent60: '#2B2826', // [Figma] Foundation / Black Transparent / 60
    
    // Scrollbar Colors
    scrollbarTrack: '#f1f1f1',
    scrollbarThumb: '#ff6b6b',
    scrollbarThumbHover: '#ff5252',
  },

  // Typography
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    
    fontSize: {
      xs: '11px',
      sm: '12px',
      md: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '28px',
      '4xl': '32px',
    },
    
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 'bold',
    },
    
    lineHeight: {
      tight: 1.4,
      normal: 1.5,
      relaxed: 1.6,
    },
  },

  // Spacing Scale (4px base unit)
  spacing: {
    xs: '4px',
    sm: '5px',
    md: '6px',
    lg: '8px',
    xl: '10px',
    '2xl': '12px',
    '3xl': '15px',
    '4xl': '16px',
    '5xl': '20px',
    '6xl': '24px',
    '7xl': '25px',
    '8xl': '30px',
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '3px',
    md: '8px',
    lg: '12px',
    xl: '15px',
    '2xl': '16px',
    '3xl': '18px',
    '4xl': '20px',
    '5xl': '25px',
    full: '50%',
  },

  // Shadows
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.2)',
    md: '0 2px 8px rgba(0,0,0,0.1)',
    lg: '0 4px 12px rgba(0,0,0,0.2)',
    xl: '0 4px 15px rgba(0,0,0,0.1)',
    '2xl': '0 4px 20px rgba(0,0,0,0.1)',
    '3xl': '0 8px 25px rgba(255, 107, 107, 0.3)',
    '4xl': '0 10px 30px rgba(0,0,0,0.1)',
    text: '0 2px 4px rgba(0,0,0,0.2)',
  },

  // Transitions
  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
    all: 'all 0.2s ease',
  },

  // Z-Index Scale
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 100,
    overlay: 1000,
  },

  // Icon Sizes
  iconSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 48,
    '6xl': 64,
  },
};

// Helper function to get CSS variable format
export const getCSSVariable = (category, key) => {
  const value = designTokens[category]?.[key];
  if (typeof value === 'object' && value !== null) {
    return value;
  }
  return value;
};

// Export individual categories for easier imports
export const colors = designTokens.colors;
export const typography = designTokens.typography;
export const spacing = designTokens.spacing;
export const borderRadius = designTokens.borderRadius;
export const shadows = designTokens.shadows;
export const transitions = designTokens.transitions;
export const zIndex = designTokens.zIndex;
export const iconSize = designTokens.iconSize;

