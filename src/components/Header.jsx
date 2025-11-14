import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { colors, spacing, typography, shadows, zIndex, iconSize } from '../design-tokens';

const Header = ({ currentUser }) => {
  return (
    <header style={{
      background: colors.backgroundGradient,
      color: colors.textWhite,
      padding: spacing['5xl'],
      textAlign: 'center',
      position: 'sticky',
      top: 0,
      zIndex: zIndex.sticky,
      boxShadow: shadows['2xl']
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: spacing.xl }}>
        <Heart size={iconSize['3xl']} fill={colors.textWhite} />
        <h1 style={{ 
          fontSize: typography.fontSize['2xl'], 
          fontWeight: typography.fontWeight.bold,
          margin: 0,
          textShadow: shadows.text
        }}>
          Pho Mate
        </h1>
      </div>
      <p style={{ 
        margin: `${spacing.lg} 0 0 0`, 
        fontSize: typography.fontSize.md, 
        opacity: 0.9,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm
      }}>
        <MapPin size={iconSize['4xl']} />
        Find love over a shared bowl of pho
      </p>
    </header>
  );
};

export default Header;
