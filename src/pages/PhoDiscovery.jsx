import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, MapPin, Utensils } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { colors, spacing, typography, borderRadius, shadows, zIndex, iconSize } from '../design-tokens';

const PhoDiscovery = ({ currentUser }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedUsers, setSwipedUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);

  // Filter out current user and already swiped users
  const availableUsers = mockUsers.filter(user => 
    user.id !== currentUser.id && !swipedUsers.includes(user.id)
  );

  const currentUserProfile = availableUsers[currentIndex];

  const handleSwipe = (direction, userId) => {
    setSwipedUsers(prev => [...prev, userId]);
    
    if (direction === 'right') {
      // Simulate match (random chance for demo)
      const isMatch = Math.random() > 0.6; // 40% match rate for demo
      if (isMatch) {
        setMatches(prev => [...prev, userId]);
        setMatchedUser(mockUsers.find(u => u.id === userId));
        setShowMatch(true);
      }
    }
    
    setCurrentIndex(prev => prev + 1);
  };

  const closeMatchModal = () => {
    setShowMatch(false);
    setMatchedUser(null);
  };

  if (!currentUserProfile) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        padding: spacing['5xl'],
        textAlign: 'center'
      }}>
        <Heart size={iconSize['6xl']} color={colors.primary} style={{ marginBottom: spacing['5xl'] }} />
        <h2 style={{ color: colors.textPrimary, marginBottom: spacing.xl }}>No more pho lovers nearby!</h2>
        <p style={{ color: colors.textSecondary, marginBottom: spacing['5xl'] }}>
          Check back later for new pho enthusiasts in your area.
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setCurrentIndex(0);
            setSwipedUsers([]);
          }}
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: spacing['5xl'], minHeight: '100vh' }}>
      <AnimatePresence>
        {currentUserProfile && (
          <motion.div
            key={currentUserProfile.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, x: 300 }}
            transition={{ duration: 0.3 }}
            style={{ maxWidth: '400px', margin: '0 auto' }}
          >
            <UserCard 
              user={currentUserProfile} 
              onSwipe={handleSwipe}
              currentUser={currentUser}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Match Modal */}
      <AnimatePresence>
        {showMatch && matchedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: colors.overlay,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: zIndex.overlay,
              padding: spacing['5xl']
            }}
            onClick={closeMatchModal}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              style={{
                background: colors.background,
                borderRadius: borderRadius['4xl'],
                padding: spacing['8xl'],
                textAlign: 'center',
                maxWidth: '300px',
                width: '100%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ fontSize: '48px', marginBottom: spacing['5xl'] }}>🎉</div>
              <h2 style={{ color: colors.primary, marginBottom: spacing.xl }}>It's a Match!</h2>
              <p style={{ color: colors.textSecondary, marginBottom: spacing['5xl'] }}>
                You and {matchedUser.name} both love pho! Start a conversation and plan your first pho date.
              </p>
              <button className="btn btn-primary" onClick={closeMatchModal}>
                Start Chatting
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UserCard = ({ user, onSwipe, currentUser }) => {
  const [dragDirection, setDragDirection] = useState(0);

  const handleDrag = (event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      setDragDirection(1); // Right
    } else if (info.offset.x < -threshold) {
      setDragDirection(-1); // Left
    } else {
      setDragDirection(0);
    }
  };

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe('right', user.id);
    } else if (info.offset.x < -threshold) {
      onSwipe('left', user.id);
    }
    setDragDirection(0);
  };

  // Calculate compatibility
  const calculateCompatibility = () => {
    let score = 0;
    const currentPrefs = currentUser.preferences;
    const userPrefs = user.preferences;

    // Broth type match
    if (currentPrefs.brothType === userPrefs.brothType) score += 30;
    
    // Noodle type match
    if (currentPrefs.noodleType === userPrefs.noodleType) score += 20;
    
    // Protein overlap
    const proteinOverlap = currentPrefs.proteins.filter(p => userPrefs.proteins.includes(p)).length;
    score += proteinOverlap * 15;
    
    // Garnish overlap
    const garnishOverlap = currentPrefs.garnishes.filter(g => userPrefs.garnishes.includes(g)).length;
    score += garnishOverlap * 5;

    return Math.min(score, 100);
  };

  const compatibility = calculateCompatibility();

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        background: colors.background,
        borderRadius: borderRadius['4xl'],
        overflow: 'hidden',
        boxShadow: shadows['4xl'],
        cursor: 'grab',
        transform: `rotate(${dragDirection * 5}deg)`,
        transition: 'transform 0.1s ease'
      }}
    >
      {/* Main Photo */}
      <div style={{ position: 'relative', height: '400px' }}>
        <img
          src={user.mainPhoto}
          alt={user.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Compatibility Badge */}
        <div style={{
          position: 'absolute',
          top: spacing['5xl'],
          right: spacing['5xl'],
          background: colors.primaryLight,
          color: colors.textWhite,
          padding: `${spacing.lg} ${spacing['2xl']}`,
          borderRadius: borderRadius['4xl'],
          fontSize: typography.fontSize.md,
          fontWeight: typography.fontWeight.semibold,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.xs
        }}>
          <Star size={iconSize['4xl']} fill={colors.textWhite} />
          {compatibility}% Match
        </div>

        {/* Swipe Indicators */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: spacing['5xl'],
          transform: 'translateY(-50%)',
          background: colors.primaryLight,
          color: colors.textWhite,
          padding: spacing.xl,
          borderRadius: borderRadius.full,
          opacity: dragDirection === 1 ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}>
          <Heart size={iconSize['2xl']} fill={colors.textWhite} />
        </div>
        
        <div style={{
          position: 'absolute',
          top: '50%',
          right: spacing['5xl'],
          transform: 'translateY(-50%)',
          background: 'rgba(255, 0, 0, 0.9)',
          color: colors.textWhite,
          padding: spacing.xl,
          borderRadius: borderRadius.full,
          opacity: dragDirection === -1 ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}>
          <X size={iconSize['2xl']} />
        </div>
      </div>

      {/* User Info */}
      <div style={{ padding: spacing['5xl'] }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl }}>
          <h2 style={{ margin: 0, fontSize: typography.fontSize['2xl'], color: colors.textPrimary }}>
            {user.name}, {user.age}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, color: colors.textSecondary }}>
            <MapPin size={iconSize['4xl']} />
            <span style={{ fontSize: typography.fontSize.md }}>{user.distance}</span>
          </div>
        </div>
        
        <p style={{ color: colors.textSecondary, marginBottom: spacing['5xl'], lineHeight: typography.lineHeight.normal }}>
          {user.bio}
        </p>

        {/* Pho Journey Preview */}
        <div style={{ marginBottom: spacing['5xl'] }}>
          <h3 style={{ fontSize: typography.fontSize['4xl'], color: colors.textPrimary, marginBottom: spacing.xl, display: 'flex', alignItems: 'center', gap: spacing.lg }}>
            <Utensils size={iconSize.lg} color={colors.primary} />
            My Pho Journey
          </h3>
          <div style={{ display: 'flex', gap: spacing.xl, overflowX: 'auto', paddingBottom: spacing.xl }}>
            {user.phoJourney.slice(0, 3).map((pho, index) => (
              <div key={pho.id} style={{ minWidth: '120px', textAlign: 'center' }}>
                <img
                  src={pho.image}
                  alt={pho.restaurant}
                  style={{
                    width: '120px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: borderRadius.md,
                    marginBottom: spacing.sm
                  }}
                />
                <div style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary }}>
                  <div style={{ fontWeight: typography.fontWeight.semibold }}>{pho.restaurant}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                    <Star size={iconSize.sm} fill={colors.star} color={colors.star} />
                    <span>{pho.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div style={{ marginBottom: spacing['5xl'] }}>
          <h4 style={{ fontSize: typography.fontSize.md, color: colors.textPrimary, marginBottom: spacing.lg }}>Pho Preferences</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.md }}>
            <span style={{
              background: colors.primary,
              color: colors.textWhite,
              padding: `${spacing.xs} ${spacing.lg}`,
              borderRadius: borderRadius.lg,
              fontSize: typography.fontSize.sm
            }}>
              {user.preferences.brothType} Broth
            </span>
            <span style={{
              background: colors.primaryGradientEnd,
              color: colors.textWhite,
              padding: `${spacing.xs} ${spacing.lg}`,
              borderRadius: borderRadius.lg,
              fontSize: typography.fontSize.sm
            }}>
              {user.preferences.noodleType} Noodles
            </span>
            {user.preferences.proteins.slice(0, 2).map(protein => (
              <span key={protein} style={{
                background: colors.border,
                color: colors.textSecondary,
                padding: `${spacing.xs} ${spacing.lg}`,
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.sm
              }}>
                {protein}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: spacing['3xl'], justifyContent: 'center' }}>
          <button
            onClick={() => onSwipe('left', user.id)}
            style={{
              background: colors.background,
              border: `3px solid ${colors.primary}`,
              borderRadius: borderRadius.full,
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: transitions.all
            }}
            onMouseOver={(e) => {
              e.target.style.background = colors.primary;
              e.target.style.color = colors.textWhite;
            }}
            onMouseOut={(e) => {
              e.target.style.background = colors.background;
              e.target.style.color = colors.primary;
            }}
          >
            <X size={iconSize['2xl']} color={colors.primary} />
          </button>
          
          <button
            onClick={() => onSwipe('right', user.id)}
            style={{
              background: colors.background,
              border: `3px solid ${colors.secondary}`,
              borderRadius: borderRadius.full,
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: transitions.all
            }}
            onMouseOver={(e) => {
              e.target.style.background = colors.secondary;
              e.target.style.color = colors.textWhite;
            }}
            onMouseOut={(e) => {
              e.target.style.background = colors.background;
              e.target.style.color = colors.secondary;
            }}
          >
            <Heart size={iconSize['2xl']} color={colors.secondary} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PhoDiscovery;
