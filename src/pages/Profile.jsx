import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Edit3, MapPin, Utensils, Heart } from 'lucide-react';
import { phoPreferences } from '../data/mockData';
import { colors, spacing, typography, borderRadius, shadows, iconSize } from '../design-tokens';

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
    <div style={{ padding: spacing['5xl'], maxWidth: '600px', margin: '0 auto' }}>
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ padding: spacing['8xl'], textAlign: 'center', marginBottom: spacing['5xl'] }}
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={editedProfile.mainPhoto}
            alt={editedProfile.name}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: borderRadius.full,
              objectFit: 'cover',
              border: `4px solid ${colors.primary}`
            }}
          />
          {isEditing && (
            <button
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                background: colors.primary,
                color: colors.textWhite,
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
        
        <h1 style={{ margin: `${spacing['5xl']} 0 ${spacing.xl} 0`, fontSize: typography.fontSize['3xl'], color: colors.textPrimary }}>
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
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: spacing.lg, color: colors.textSecondary, marginBottom: spacing['5xl'] }}>
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
            <p style={{ color: colors.textSecondary, lineHeight: typography.lineHeight.relaxed }}>{editedProfile.bio}</p>
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
        style={{ padding: spacing['7xl'], marginBottom: spacing['5xl'] }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: spacing.xl, color: colors.textPrimary }}>
            <Utensils color={colors.primary} />
            My Pho Journey
          </h2>
          {isEditing && (
            <button
              onClick={addPhoJourneyEntry}
              style={{
                background: colors.primary,
                color: colors.textWhite,
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
                border: `1px solid ${colors.border}`,
                borderRadius: borderRadius.lg,
                padding: spacing['3xl'],
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
                    background: colors.error,
                    color: colors.textWhite,
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
                    borderRadius: borderRadius.md
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xl, marginBottom: spacing.lg }}>
                    {isEditing ? (
                      <input
                        type="text"
                        value={pho.restaurant}
                        onChange={(e) => updatePhoJourneyEntry(pho.id, 'restaurant', e.target.value)}
                        className="input"
                        style={{ fontSize: typography.fontSize['4xl'], fontWeight: typography.fontWeight.semibold, padding: `${spacing.xs} ${spacing.lg}` }}
                      />
                    ) : (
                      <h3 style={{ margin: 0, fontSize: typography.fontSize['4xl'], color: colors.textPrimary }}>{pho.restaurant}</h3>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={iconSize['4xl']}
                          fill={star <= pho.rating ? colors.star : colors.border}
                          color={star <= pho.rating ? colors.star : colors.border}
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
                    <p style={{ color: colors.textSecondary, fontSize: typography.fontSize.md, lineHeight: typography.lineHeight.tight }}>{pho.description}</p>
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
        <h2 style={{ display: 'flex', alignItems: 'center', gap: spacing.xl, color: colors.textPrimary, marginBottom: spacing['5xl'] }}>
          <Heart color={colors.primary} />
          Pho Preferences
        </h2>

        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Broth Type */}
          <div>
            <label style={{ display: 'block', marginBottom: spacing.lg, fontWeight: typography.fontWeight.semibold, color: colors.textPrimary }}>
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
                    borderRadius: borderRadius['4xl'],
                    background: editedProfile.preferences.brothType === type ? colors.primary : colors.background,
                    color: editedProfile.preferences.brothType === type ? colors.textWhite : colors.primary,
                    borderColor: colors.primary,
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
            <label style={{ display: 'block', marginBottom: spacing.lg, fontWeight: typography.fontWeight.semibold, color: colors.textPrimary }}>
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
                    borderRadius: borderRadius['4xl'],
                    background: editedProfile.preferences.noodleType === type ? colors.primaryGradientEnd : colors.background,
                    color: editedProfile.preferences.noodleType === type ? colors.textWhite : colors.primaryGradientEnd,
                    borderColor: colors.primaryGradientEnd,
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
            <label style={{ display: 'block', marginBottom: spacing.lg, fontWeight: typography.fontWeight.semibold, color: colors.textPrimary }}>
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
                    borderRadius: borderRadius['2xl'],
                    background: editedProfile.preferences.proteins.includes(protein) ? colors.secondary : colors.background,
                    color: editedProfile.preferences.proteins.includes(protein) ? colors.textWhite : colors.secondary,
                    borderColor: colors.secondary,
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
            <label style={{ display: 'block', marginBottom: spacing.lg, fontWeight: typography.fontWeight.semibold, color: colors.textPrimary }}>
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
                    borderRadius: borderRadius['2xl'],
                    background: editedProfile.preferences.garnishes.includes(garnish) ? colors.accent : colors.background,
                    color: editedProfile.preferences.garnishes.includes(garnish) ? colors.textWhite : colors.accent,
                    borderColor: colors.accent,
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
