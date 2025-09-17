import React from 'react';
import { Heart, MessageCircle, User, BookOpen, MapPin } from 'lucide-react';

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
      background: 'white',
      borderTop: '1px solid #e0e0e0',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '10px 0',
      zIndex: 100,
      boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
    }}>
      {navItems.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            color: activeTab === id ? '#ff6b6b' : '#666',
            transform: activeTab === id ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          <Icon size={24} fill={activeTab === id ? '#ff6b6b' : 'none'} />
          <span style={{ fontSize: '12px', fontWeight: activeTab === id ? '600' : '400' }}>
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
