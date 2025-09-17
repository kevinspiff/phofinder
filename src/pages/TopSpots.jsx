import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Navigation, Phone, Clock, Heart, Filter } from 'lucide-react';
import { phoSpots } from '../data/mockData';

const TopSpots = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [favorites, setFavorites] = useState(new Set());

  const filters = [
    { id: 'all', name: 'All Spots' },
    { id: 'nearby', name: 'Nearby' },
    { id: 'highly-rated', name: 'Highly Rated' },
    { id: 'traditional', name: 'Traditional' },
    { id: 'modern', name: 'Modern' }
  ];

  const toggleFavorite = (spotId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(spotId)) {
        newFavorites.delete(spotId);
      } else {
        newFavorites.add(spotId);
      }
      return newFavorites;
    });
  };

  const filteredSpots = phoSpots.filter(spot => {
    switch (selectedFilter) {
      case 'nearby':
        return spot.location.includes('San Jose') || spot.location.includes('San Francisco');
      case 'highly-rated':
        return spot.rating >= 4.7;
      case 'traditional':
        return spot.specialties.some(s => s.includes('Traditional') || s.includes('Rare Beef'));
      case 'modern':
        return spot.specialties.some(s => s.includes('Bone Marrow') || s.includes('Vegetarian'));
      default:
        return true;
    }
  });

  const getDistance = (location) => {
    // Mock distance calculation
    const distances = {
      'Little Saigon, San Jose': '2.3 miles',
      'Westminster, CA': '45 miles',
      'San Francisco, CA': '8.7 miles',
      'Oakland, CA': '12.1 miles'
    };
    return distances[location] || 'Distance unknown';
  };

  const getPriceRange = (rating) => {
    if (rating >= 4.8) return '$$$';
    if (rating >= 4.6) return '$$';
    return '$';
  };

  const getWaitTime = () => {
    const times = ['5-10 min', '10-15 min', '15-20 min', '20-30 min'];
    return times[Math.floor(Math.random() * times.length)];
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '30px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
          <MapPin size={32} color="#ff6b6b" />
          <h1 style={{ margin: 0, color: '#333' }}>Top Pho Spots</h1>
        </div>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Discover the best pho restaurants in your area
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '25px',
          overflowX: 'auto',
          paddingBottom: '10px'
        }}
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            style={{
              padding: '8px 16px',
              border: '2px solid',
              borderRadius: '20px',
              background: selectedFilter === filter.id ? '#ff6b6b' : 'white',
              color: selectedFilter === filter.id ? 'white' : '#ff6b6b',
              borderColor: '#ff6b6b',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {filter.id === 'all' && <Filter size={16} />}
            {filter.name}
          </button>
        ))}
      </motion.div>

      {/* Spots List */}
      <div style={{ display: 'grid', gap: '20px' }}>
        {filteredSpots.map((spot, index) => (
          <motion.div
            key={spot.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
            style={{ padding: '0', overflow: 'hidden' }}
          >
            {/* Restaurant Image */}
            <div style={{ position: 'relative', height: '200px' }}>
              <img
                src={spot.image}
                alt={spot.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(spot.id)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Heart 
                  size={20} 
                  fill={favorites.has(spot.id) ? '#ff6b6b' : 'none'} 
                  color={favorites.has(spot.id) ? '#ff6b6b' : '#666'} 
                />
              </button>

              {/* Rating Badge */}
              <div style={{
                position: 'absolute',
                bottom: '15px',
                left: '15px',
                background: 'rgba(255, 107, 107, 0.9)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <Star size={16} fill="white" />
                {spot.rating}
              </div>
            </div>

            {/* Restaurant Info */}
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '20px', color: '#333' }}>{spot.name}</h3>
                <span style={{
                  background: '#4CAF50',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {getPriceRange(spot.rating)}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '15px', color: '#666' }}>
                <MapPin size={16} />
                <span style={{ fontSize: '14px' }}>{spot.location}</span>
                <span style={{ fontSize: '12px', color: '#999' }}>• {getDistance(spot.location)}</span>
              </div>

              {/* Specialties */}
              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#333' }}>Specialties:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {spot.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      style={{
                        background: '#f0f0f0',
                        color: '#666',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Restaurant Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666' }}>
                  <Clock size={14} />
                  <span style={{ fontSize: '12px' }}>{getWaitTime()} wait</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666' }}>
                  <Phone size={14} />
                  <span style={{ fontSize: '12px' }}>Call ahead</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  style={{
                    flex: 1,
                    background: '#ff6b6b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#ff5252'}
                  onMouseOut={(e) => e.target.style.background = '#ff6b6b'}
                >
                  <Navigation size={16} />
                  Get Directions
                </button>
                
                <button
                  style={{
                    flex: 1,
                    background: 'white',
                    color: '#ff6b6b',
                    border: '2px solid #ff6b6b',
                    borderRadius: '25px',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
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
                  <Heart size={16} />
                  Save for Date
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSpots.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666'
          }}
        >
          <MapPin size={64} color="#ccc" style={{ marginBottom: '20px' }} />
          <h3 style={{ marginBottom: '10px', color: '#333' }}>No spots found</h3>
          <p>Try adjusting your filters to see more pho restaurants.</p>
        </motion.div>
      )}
    </div>
  );
};

export default TopSpots;
