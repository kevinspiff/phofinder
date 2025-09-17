import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Camera, MapPin, Heart, Send, Utensils } from 'lucide-react';
import { mockUsers, phoSpots } from '../data/mockData';

const Matches = ({ currentUser }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});

  // Mock matches (users who liked back)
  const matches = mockUsers.filter(user => user.id !== currentUser.id).slice(0, 3);

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

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!selectedMatch ? (
        // Matches List
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
      )}
    </div>
  );
};

export default Matches;
