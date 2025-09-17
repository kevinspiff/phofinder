import React from 'react';
import { Heart, MapPin } from 'lucide-react';

const Header = ({ currentUser }) => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <Heart size={28} fill="white" />
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold',
          margin: 0,
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          Pho Mate
        </h1>
      </div>
      <p style={{ 
        margin: '8px 0 0 0', 
        fontSize: '14px', 
        opacity: 0.9,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px'
      }}>
        <MapPin size={16} />
        Find love over a shared bowl of pho
      </p>
    </header>
  );
};

export default Header;
