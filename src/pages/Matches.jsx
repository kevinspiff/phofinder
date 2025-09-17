import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Camera, MapPin, Heart, Send, Utensils, Star, Navigation, Clock, Phone } from 'lucide-react';
import { mockUsers, phoSpots } from '../data/mockData';

const Matches = ({ currentUser }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('chats'); // 'chats' | 'history'
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [ratings, setRatings] = useState(() => {
    try {
      const saved = localStorage.getItem(`matchRatings_${currentUser.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Mock matches (users who liked back)
  const matches = mockUsers.filter(user => user.id !== currentUser.id).slice(0, 3);

  const deriveRestaurantForMatch = (match) => {
    const hasJourney = Array.isArray(match.phoJourney) && match.phoJourney.length > 0;
    const journeyPick = hasJourney ? match.phoJourney[Math.floor(Math.random() * match.phoJourney.length)] : null;
    if (journeyPick && journeyPick.restaurant) {
      const byName = phoSpots.find(s => s.name === journeyPick.restaurant);
      if (byName) return byName;
    }
    return phoSpots[Math.floor(Math.random() * phoSpots.length)];
  };

  const [pastMatches, setPastMatches] = useState([]);

  useEffect(() => {
    const uniqueById = [];
    const seen = new Set();
    matches.forEach(m => { if (!seen.has(m.id)) { seen.add(m.id); uniqueById.push(m); } });
    const enriched = uniqueById.map(m => ({ match: m, restaurant: deriveRestaurantForMatch(m) }));
    setPastMatches(enriched);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.id]);

  useEffect(() => {
    try {
      localStorage.setItem(`matchRatings_${currentUser.id}`, JSON.stringify(ratings));
    } catch (e) {
      // ignore write errors
    }
  }, [ratings, currentUser.id]);

  const handleRate = (matchId, value) => {
    setRatings(prev => ({ ...prev, [matchId]: value }));
  };

  const sendMessage = (matchId) => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => ({
        ...prev,
        [matchId]: [...(prev[matchId] || []), newMessage]
      }));

      setMessage('');

      // Simulate response after 2 seconds
      setTimeout(() => {
        const responses = [
          "That sounds amazing! I'd love to try that place! 🍜",
          "I've been there! Their broth is incredible!",
          "Omg yes! When should we go?",
          "I'm so excited to try pho with you!",
          "That's one of my favorite spots! We have great taste 😊"
        ];
        
        const response = {
          id: Date.now() + 1,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'them',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => ({
          ...prev,
          [matchId]: [...(prev[matchId] || []), response]
        }));
      }, 2000);
    }
  };

  const sendPhoPhoto = (matchId) => {
    const phoPhoto = {
      id: Date.now(),
      type: 'photo',
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop",
      caption: "Just had the most amazing pho! 🍜"
    };

    setMessages(prev => ({
      ...prev,
      [matchId]: [...(prev[matchId] || []), phoPhoto]
    }));
  };

  const suggestPhoDate = (matchId) => {
    const randomSpot = phoSpots[Math.floor(Math.random() * phoSpots.length)];
    const dateSuggestion = {
      id: Date.now(),
      type: 'date-suggestion',
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      restaurant: randomSpot,
      message: `Want to grab pho at ${randomSpot.name}? They have amazing ${randomSpot.specialties[0]}!`
    };

    setMessages(prev => ({
      ...prev,
      [matchId]: [...(prev[matchId] || []), dateSuggestion]
    }));
  };

  const goOnAnotherDate = (match) => {
    setActiveSubTab('chats');
    setSelectedMatch(match);
    suggestPhoDate(match.id);
  };

  // Get top 3 pho spots by rating
  const getTopPhoSpots = () => {
    return phoSpots
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  };

  // Open map with directions
  const openMapDirections = (spot) => {
    const { lat, lng } = spot.coordinates;
    const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(mapUrl, '_blank');
  };

  // Create a simple map placeholder component
  const MapPlaceholder = ({ spot }) => {
    const { lat, lng } = spot.coordinates;
    return (
      <div style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Map grid pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
        
        {/* Location marker */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '12px',
          height: '12px',
          background: '#ff4444',
          borderRadius: '50%',
          border: '2px solid white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }} />
        
        {/* Coordinates display */}
        <div style={{
          position: 'absolute',
          bottom: '4px',
          left: '4px',
          fontSize: '8px',
          opacity: 0.8
        }}>
          {lat.toFixed(3)}, {lng.toFixed(3)}
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'white', padding: '10px 20px', borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => { setActiveSubTab('chats'); }}
            style={{
              background: activeSubTab === 'chats' ? '#ff6b6b' : 'transparent',
              color: activeSubTab === 'chats' ? 'white' : '#333',
              border: '1px solid #ff6b6b',
              borderRadius: '20px',
              padding: '8px 14px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Chats
          </button>
          <button
            onClick={() => { setSelectedMatch(null); setActiveSubTab('history'); }}
            style={{
              background: activeSubTab === 'history' ? '#ff6b6b' : 'transparent',
              color: activeSubTab === 'history' ? 'white' : '#333',
              border: '1px solid #ff6b6b',
              borderRadius: '20px',
              padding: '8px 14px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            History
          </button>
        </div>
      </div>

      {activeSubTab === 'history' ? (
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Match History</h2>
          {pastMatches.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '50vh',
              textAlign: 'center'
            }}>
              <Heart size={64} color="#ff6b6b" style={{ marginBottom: '20px' }} />
              <h3 style={{ color: '#333', marginBottom: '10px' }}>No previous matches</h3>
              <p style={{ color: '#666' }}>
                Your past matches will appear here. Rate them to keep track!
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {pastMatches.map(({ match, restaurant }, index) => (
                <motion.div
                  key={`${match.id}-${restaurant.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    background: 'white',
                    borderRadius: '15px',
                    padding: '16px',
                    display: 'grid',
                    gridTemplateColumns: '56px 1fr auto',
                    alignItems: 'center',
                    columnGap: '15px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}
                >
                  <img
                    src={match.mainPhoto}
                    alt={match.name}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 4px 0', color: '#333' }}>{match.name}</h3>
                    <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>{match.phoCompatibility}% pho compatibility · {match.preferences.brothType} lover</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                      <img src={restaurant.image} alt={restaurant.name} style={{ width: '36px', height: '28px', objectFit: 'cover', borderRadius: '6px' }} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={14} color="#ff6b6b" />
                          <strong style={{ fontSize: '13px' }}>{restaurant.name}</strong>
                        </div>
                        <span style={{ fontSize: '12px', color: '#777' }}>{restaurant.location}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => handleRate(match.id, star)}
                          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            lineHeight: 0
                          }}
                        >
                          <Star
                            size={20}
                            color={star <= (ratings[match.id] || 0) ? '#ffd700' : '#ccc'}
                            fill={star <= (ratings[match.id] || 0) ? '#ffd700' : 'none'}
                          />
                        </button>
                      ))}
                      {ratings[match.id] ? (
                        <span style={{ color: '#666', fontSize: '12px' }}>Rated {ratings[match.id]} / 5</span>
                      ) : (
                        <span style={{ color: '#999', fontSize: '12px' }}>Not rated</span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      onClick={() => goOnAnotherDate(match)}
                      style={{
                        background: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <MapPin size={16} />
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Go on another date</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      ) : (
        !selectedMatch ? (
          // Matches List (Chats tab)
          <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Your Matches</h2>
            {matches.length === 0 ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50vh',
                textAlign: 'center'
              }}>
                <Heart size={64} color="#ff6b6b" style={{ marginBottom: '20px' }} />
                <h3 style={{ color: '#333', marginBottom: '10px' }}>No matches yet</h3>
                <p style={{ color: '#666' }}>
                  Keep swiping to find your perfect pho partner!
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '15px' }}>
                {matches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedMatch(match)}
                    style={{
                      background: 'white',
                      borderRadius: '15px',
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <img
                      src={match.mainPhoto}
                      alt={match.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{match.name}</h3>
                      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                        {match.phoCompatibility}% pho compatibility
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '5px' }}>
                        <div style={{
                          background: '#4CAF50',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '12px'
                        }}>
                          {match.preferences.brothType} lover
                        </div>
                      </div>
                    </div>
                    <MessageCircle size={24} color="#ff6b6b" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Chat Interface
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Chat Header */}
          <div style={{
            background: 'white',
            padding: '15px 20px',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <button
              onClick={() => setSelectedMatch(null)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ←
            </button>
            <img
              src={selectedMatch.mainPhoto}
              alt={selectedMatch.name}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <div>
              <h3 style={{ margin: 0, color: '#333' }}>{selectedMatch.name}</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '12px' }}>
                {selectedMatch.phoCompatibility}% pho compatibility
              </p>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            background: '#f8f9fa'
          }}>
            {/* Top Pho Spots Display */}
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '20px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '15px'
              }}>
                <Utensils size={20} color="#ff6b6b" />
                <h3 style={{ margin: 0, color: '#333', fontSize: '16px' }}>
                  Top 3 Pho Spots
                </h3>
              </div>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                {getTopPhoSpots().map((spot, index) => (
                  <motion.div
                    key={spot.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      background: '#f8f9fa',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    {/* Header with ranking and basic info */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      const dateSuggestion = {
                        id: Date.now(),
                        type: 'date-suggestion',
                        sender: 'me',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        restaurant: spot,
                        message: `Want to grab pho at ${spot.name}? They have amazing ${spot.specialties[0]}!`
                      };
                      setMessages(prev => ({
                        ...prev,
                        [selectedMatch.id]: [...(prev[selectedMatch.id] || []), dateSuggestion]
                      }));
                    }}>
                      <div style={{
                        background: '#ff6b6b',
                        color: 'white',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>
                        {index + 1}
                      </div>
                      
                      <img
                        src={spot.image}
                        alt={spot.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '8px',
                          objectFit: 'cover'
                        }}
                      />
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px 0', color: '#333', fontSize: '16px', fontWeight: '600' }}>
                          {spot.name}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <MapPin size={12} color="#666" />
                          <span style={{ color: '#666', fontSize: '12px' }}>
                            {spot.distance} away
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[1, 2, 3, 4, 5].map(star => (
                              <div
                                key={star}
                                style={{
                                  width: '12px',
                                  height: '12px',
                                  background: star <= Math.floor(spot.rating) ? '#ffd700' : '#e0e0e0',
                                  borderRadius: '50%'
                                }}
                              />
                            ))}
                          </div>
                          <span style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>
                            {spot.rating}
                          </span>
                        </div>
                      </div>
                      
                      <div style={{
                        background: '#4CAF50',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '15px',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>
                        Suggest
                      </div>
                    </div>

                    {/* Map and detailed info */}
                    <div style={{
                      display: 'flex',
                      background: 'white',
                      borderTop: '1px solid #e0e0e0'
                    }}>
                      {/* Map */}
                      <div style={{
                        width: '120px',
                        height: '80px',
                        position: 'relative',
                        cursor: 'pointer',
                        borderRadius: '0 0 0 8px',
                        overflow: 'hidden'
                      }}
                      onClick={() => openMapDirections(spot)}>
                        <MapPlaceholder spot={spot} />
                        <div style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}>
                          <Navigation size={8} />
                          Directions
                        </div>
                      </div>

                      {/* Location details */}
                      <div style={{
                        flex: 1,
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={12} color="#666" />
                          <span style={{ fontSize: '11px', color: '#666' }}>
                            {spot.address}
                          </span>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={12} color="#666" />
                          <span style={{ fontSize: '11px', color: '#666' }}>
                            {spot.hours}
                          </span>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Phone size={12} color="#666" />
                          <span style={{ fontSize: '11px', color: '#666' }}>
                            {spot.phone}
                          </span>
                        </div>

                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '4px',
                          marginTop: '4px'
                        }}>
                          {spot.specialties.slice(0, 2).map((specialty, idx) => (
                            <span
                              key={idx}
                              style={{
                                background: '#ff6b6b',
                                color: 'white',
                                padding: '2px 6px',
                                borderRadius: '8px',
                                fontSize: '9px',
                                fontWeight: '500'
                              }}
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {(messages[selectedMatch.id] || []).map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                    marginBottom: '15px'
                  }}
                >
                  <div style={{
                    maxWidth: '70%',
                    background: msg.sender === 'me' ? '#ff6b6b' : 'white',
                    color: msg.sender === 'me' ? 'white' : '#333',
                    padding: '12px 16px',
                    borderRadius: '18px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    {msg.type === 'photo' ? (
                      <div>
                        <img
                          src={msg.image}
                          alt="Pho photo"
                          style={{
                            width: '100%',
                            borderRadius: '8px',
                            marginBottom: '8px'
                          }}
                        />
                        <p style={{ margin: 0, fontSize: '14px' }}>{msg.caption}</p>
                      </div>
                    ) : msg.type === 'date-suggestion' ? (
                      <div>
                        <p style={{ margin: '0 0 10px 0' }}>{msg.message}</p>
                        <div style={{
                          background: 'rgba(255,255,255,0.2)',
                          padding: '10px',
                          borderRadius: '8px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                            <MapPin size={16} />
                            <strong>{msg.restaurant.name}</strong>
                          </div>
                          <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>
                            {msg.restaurant.location}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ display: 'flex', gap: '2px' }}>
                              {[1, 2, 3, 4, 5].map(star => (
                                <div
                                  key={star}
                                  style={{
                                    width: '12px',
                                    height: '12px',
                                    background: star <= Math.floor(msg.restaurant.rating) ? '#ffd700' : '#e0e0e0',
                                    borderRadius: '50%'
                                  }}
                                />
                              ))}
                            </div>
                            <span style={{ fontSize: '12px' }}>{msg.restaurant.rating}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p style={{ margin: 0 }}>{msg.text}</p>
                    )}
                    <p style={{
                      margin: '5px 0 0 0',
                      fontSize: '11px',
                      opacity: 0.7
                    }}>
                      {msg.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Welcome message if no messages */}
            {(!messages[selectedMatch.id] || messages[selectedMatch.id].length === 0) && (
              <div style={{
                textAlign: 'center',
                color: '#666',
                marginTop: '50px'
              }}>
                <Utensils size={48} color="#ff6b6b" style={{ marginBottom: '15px' }} />
                <h3 style={{ marginBottom: '10px' }}>Start your pho conversation!</h3>
                <p>Share your favorite pho spots or suggest a pho date!</p>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div style={{
            background: 'white',
            padding: '15px 20px',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <button
              onClick={() => sendPhoPhoto(selectedMatch.id)}
              style={{
                background: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Camera size={20} />
            </button>
            
            <button
              onClick={() => suggestPhoDate(selectedMatch.id)}
              style={{
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <MapPin size={20} />
            </button>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(selectedMatch.id)}
              placeholder="Type a message..."
              className="input"
              style={{ flex: 1, margin: 0 }}
            />
            
            <button
              onClick={() => sendMessage(selectedMatch.id)}
              style={{
                background: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
        )
      )}
    </div>
  );
};

export default Matches;
