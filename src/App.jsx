import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import PhoDiscovery from './pages/PhoDiscovery';
import Profile from './pages/Profile';
import Matches from './pages/Matches';
import PhoPedia from './pages/PhoPedia';
import TopSpots from './pages/TopSpots';
import { mockUsers } from './data/mockData';

function App() {
  const [currentUser] = useState(mockUsers[0]); // Maya as current user
  const [activeTab, setActiveTab] = useState('discovery');

  return (
    <Router>
      <div className="App">
        <Header currentUser={currentUser} />
        
        <main style={{ paddingBottom: '80px' }}>
          <Routes>
            <Route path="/" element={
              activeTab === 'discovery' ? <PhoDiscovery currentUser={currentUser} /> :
              activeTab === 'matches' ? <Matches currentUser={currentUser} /> :
              activeTab === 'profile' ? <Profile currentUser={currentUser} /> :
              activeTab === 'phopedia' ? <PhoPedia /> :
              activeTab === 'spots' ? <TopSpots /> :
              <PhoDiscovery currentUser={currentUser} />
            } />
          </Routes>
        </main>

        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </Router>
  );
}

export default App;
