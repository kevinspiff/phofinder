import React from 'react';
import { Heart, MessageCircle, User, BookOpen, MapPin } from 'lucide-react';
import { colors, spacing, typography, borderRadius, transitions, zIndex, iconSize } from '../design-tokens';

const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'discovery', icon: Heart, label: 'Discover' },
    { id: 'matches', icon: MessageCircle, label: 'Matches' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'phopedia', icon: BookOpen, label: 'Pho-pedia' },
    { id: 'spots', icon: MapPin, label: 'Top Spots' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: colors.background,
      borderTop: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'space-around',
      padding: `${spacing.xl} 0`,
      zIndex: zIndex.sticky,
      boxShadow: `0 -4px ${spacing['5xl']} ${colors.overlayLight}`
    }}>
      {navItems.map(({ id, icon: Icon, label }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: spacing.xs,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: spacing.lg,
              borderRadius: borderRadius.md,
              transition: transitions.all,
              color: isActive ? colors.primary : colors.textSecondary,
              transform: isActive ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <Icon size={iconSize['2xl']} fill={isActive ? colors.primary : 'none'} />
            <span style={{ 
              fontSize: typography.fontSize.sm, 
              fontWeight: isActive ? typography.fontWeight.semibold : typography.fontWeight.regular 
            }}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
