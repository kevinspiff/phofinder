import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Edit3, MapPin, Utensils, Heart } from 'lucide-react';
import { phoPreferences } from '../data/mockData';

const Profile = ({ currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(currentUser);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
    console.log('Profile saved:', editedProfile);
  };

  const addPhoJourneyEntry = () => {
    const newEntry = {
      id: Date.now(),
      restaurant: "New Pho Spot",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
      rating: 5,
      description: "Tell us about this pho experience..."
    };
    setEditedProfile(prev => ({
      ...prev,
      phoJourney: [...prev.phoJourney, newEntry]
    }));
  };

  const updatePhoJourneyEntry = (id, field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      phoJourney: prev.phoJourney.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    }));
  };

  const removePhoJourneyEntry = (id) => {
    setEditedProfile(prev => ({
      ...prev,
      phoJourney: prev.phoJourney.filter(entry => entry.id !== id)
    }));
  };

  const updatePreference = (category, value) => {
    setEditedProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: value
      }
    }));
  };

  const updateMultiPreference = (category, value, isSelected) => {
    setEditedProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: isSelected 
          ? [...prev.preferences[category], value]
          : prev.preferences[category].filter(item => item !== value)
      }
    }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ padding: '30px', textAlign: 'center', marginBottom: '20px' }}
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={editedProfile.mainPhoto}
            alt={editedProfile.name}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid #ff6b6b'
            }}
          />
          {isEditing && (
            <button
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                background: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <Edit3 size={18} />
            </button>
          )}
        </div>
        
        <h1 style={{ margin: '20px 0 10px 0', fontSize: '28px', color: '#333' }}>
          {isEditing ? (
            <input
              type="text"
              value={editedProfile.name}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
              className="input"
              style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', border: 'none', background: 'transparent' }}
            />
          ) : (
            editedProfile.name
          )}
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#666', marginBottom: '20px' }}>
          <MapPin size={16} />
          <span>{editedProfile.location}</span>
        </div>

        <div style={{ marginBottom: '20px' }}>
          {isEditing ? (
            <textarea
              value={editedProfile.bio}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
              className="input"
              rows={3}
              placeholder="Tell us about yourself and your pho journey..."
            />
          ) : (
            <p style={{ color: '#666', lineHeight: '1.6' }}>{editedProfile.bio}</p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {isEditing ? (
            <>
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </motion.div>

      {/* Pho Journey Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
        style={{ padding: '25px', marginBottom: '20px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#333' }}>
            <Utensils color="#ff6b6b" />
            My Pho Journey
          </h2>
          {isEditing && (
            <button
              onClick={addPhoJourneyEntry}
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
              <Plus size={20} />
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          {editedProfile.phoJourney.map((pho, index) => (
            <motion.div
              key={pho.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '15px',
                position: 'relative'
              }}
            >
              {isEditing && (
                <button
                  onClick={() => removePhoJourneyEntry(pho.id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ×
                </button>
              )}

              <div style={{ display: 'flex', gap: '15px' }}>
                <img
                  src={pho.image}
                  alt={pho.restaurant}
                  style={{
                    width: '100px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    {isEditing ? (
                      <input
                        type="text"
                        value={pho.restaurant}
                        onChange={(e) => updatePhoJourneyEntry(pho.id, 'restaurant', e.target.value)}
                        className="input"
                        style={{ fontSize: '16px', fontWeight: '600', padding: '4px 8px' }}
                      />
                    ) : (
                      <h3 style={{ margin: 0, fontSize: '16px', color: '#333' }}>{pho.restaurant}</h3>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          fill={star <= pho.rating ? '#ffd700' : '#e0e0e0'}
                          color={star <= pho.rating ? '#ffd700' : '#e0e0e0'}
                          style={{ cursor: isEditing ? 'pointer' : 'default' }}
                          onClick={() => isEditing && updatePhoJourneyEntry(pho.id, 'rating', star)}
                        />
                      ))}
                    </div>
                  </div>
                  {isEditing ? (
                    <textarea
                      value={pho.description}
                      onChange={(e) => updatePhoJourneyEntry(pho.id, 'description', e.target.value)}
                      className="input"
                      rows={2}
                      style={{ fontSize: '14px', padding: '8px' }}
                    />
                  ) : (
                    <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.4' }}>{pho.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pho Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
        style={{ padding: '25px' }}
      >
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#333', marginBottom: '20px' }}>
          <Heart color="#ff6b6b" />
          Pho Preferences
        </h2>

        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Broth Type */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              Broth Type
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {phoPreferences.brothTypes.map(type => (
                <button
                  key={type}
                  onClick={() => isEditing && updatePreference('brothType', type)}
                  style={{
                    padding: '8px 16px',
                    border: '2px solid',
                    borderRadius: '20px',
                    background: editedProfile.preferences.brothType === type ? '#ff6b6b' : 'white',
                    color: editedProfile.preferences.brothType === type ? 'white' : '#ff6b6b',
                    borderColor: '#ff6b6b',
                    cursor: isEditing ? 'pointer' : 'default',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Noodle Type */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              Noodle Type
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {phoPreferences.noodleTypes.map(type => (
                <button
                  key={type}
                  onClick={() => isEditing && updatePreference('noodleType', type)}
                  style={{
                    padding: '8px 16px',
                    border: '2px solid',
                    borderRadius: '20px',
                    background: editedProfile.preferences.noodleType === type ? '#ff8e53' : 'white',
                    color: editedProfile.preferences.noodleType === type ? 'white' : '#ff8e53',
                    borderColor: '#ff8e53',
                    cursor: isEditing ? 'pointer' : 'default',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Proteins */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              Protein Preferences
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {phoPreferences.proteins.map(protein => (
                <button
                  key={protein}
                  onClick={() => isEditing && updateMultiPreference('proteins', protein, !editedProfile.preferences.proteins.includes(protein))}
                  style={{
                    padding: '6px 12px',
                    border: '2px solid',
                    borderRadius: '16px',
                    background: editedProfile.preferences.proteins.includes(protein) ? '#4CAF50' : 'white',
                    color: editedProfile.preferences.proteins.includes(protein) ? 'white' : '#4CAF50',
                    borderColor: '#4CAF50',
                    cursor: isEditing ? 'pointer' : 'default',
                    transition: 'all 0.2s ease',
                    fontSize: '14px'
                  }}
                >
                  {protein}
                </button>
              ))}
            </div>
          </div>

          {/* Garnishes */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              Garnish Preferences
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {phoPreferences.garnishes.map(garnish => (
                <button
                  key={garnish}
                  onClick={() => isEditing && updateMultiPreference('garnishes', garnish, !editedProfile.preferences.garnishes.includes(garnish))}
                  style={{
                    padding: '6px 12px',
                    border: '2px solid',
                    borderRadius: '16px',
                    background: editedProfile.preferences.garnishes.includes(garnish) ? '#9C27B0' : 'white',
                    color: editedProfile.preferences.garnishes.includes(garnish) ? 'white' : '#9C27B0',
                    borderColor: '#9C27B0',
                    cursor: isEditing ? 'pointer' : 'default',
                    transition: 'all 0.2s ease',
                    fontSize: '14px'
                  }}
                >
                  {garnish}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
