import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, MapPin, Utensils } from 'lucide-react';
import { mockUsers } from '../data/mockData';

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
        padding: '20px',
        textAlign: 'center'
      }}>
        <Heart size={64} color="#ff6b6b" style={{ marginBottom: '20px' }} />
        <h2 style={{ color: '#333', marginBottom: '10px' }}>No more pho lovers nearby!</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
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
    <div style={{ padding: '20px', minHeight: '100vh' }}>
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
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={closeMatchModal}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                textAlign: 'center',
                maxWidth: '300px',
                width: '100%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
              <h2 style={{ color: '#ff6b6b', marginBottom: '10px' }}>It's a Match!</h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>
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
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
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
          top: '20px',
          right: '20px',
          background: 'rgba(255, 107, 107, 0.9)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Star size={16} fill="white" />
          {compatibility}% Match
        </div>

        {/* Swipe Indicators */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '20px',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 107, 107, 0.9)',
          color: 'white',
          padding: '10px',
          borderRadius: '50%',
          opacity: dragDirection === 1 ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}>
          <Heart size={24} fill="white" />
        </div>
        
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 0, 0, 0.9)',
          color: 'white',
          padding: '10px',
          borderRadius: '50%',
          opacity: dragDirection === -1 ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}>
          <X size={24} />
        </div>
      </div>

      {/* User Info */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', color: '#333' }}>
            {user.name}, {user.age}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666' }}>
            <MapPin size={16} />
            <span style={{ fontSize: '14px' }}>{user.distance}</span>
          </div>
        </div>
        
        <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.5' }}>
          {user.bio}
        </p>

        {/* Pho Journey Preview */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', color: '#333', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Utensils size={18} color="#ff6b6b" />
            My Pho Journey
          </h3>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
            {user.phoJourney.slice(0, 3).map((pho, index) => (
              <div key={pho.id} style={{ minWidth: '120px', textAlign: 'center' }}>
                <img
                  src={pho.image}
                  alt={pho.restaurant}
                  style={{
                    width: '120px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '5px'
                  }}
                />
                <div style={{ fontSize: '12px', color: '#666' }}>
                  <div style={{ fontWeight: '600' }}>{pho.restaurant}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                    <Star size={12} fill="#ffd700" color="#ffd700" />
                    <span>{pho.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '14px', color: '#333', marginBottom: '8px' }}>Pho Preferences</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <span style={{
              background: '#ff6b6b',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              {user.preferences.brothType} Broth
            </span>
            <span style={{
              background: '#ff8e53',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              {user.preferences.noodleType} Noodles
            </span>
            {user.preferences.proteins.slice(0, 2).map(protein => (
              <span key={protein} style={{
                background: '#e0e0e0',
                color: '#666',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                {protein}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            onClick={() => onSwipe('left', user.id)}
            style={{
              background: 'white',
              border: '3px solid #ff6b6b',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#ff6b6b';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#ff6b6b';
            }}
          >
            <X size={24} color="#ff6b6b" />
          </button>
          
          <button
            onClick={() => onSwipe('right', user.id)}
            style={{
              background: 'white',
              border: '3px solid #4CAF50',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#4CAF50';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#4CAF50';
            }}
          >
            <Heart size={24} color="#4CAF50" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PhoDiscovery;
