import React, { useState } from 'react';
import TopUsers from './components/TopUsers';
import Posts from './components/Posts';

function App() {
  const [activeTab, setActiveTab] = useState('topUsers');

  return (
    <div className="app">
      <header className="header">
        <h1>Social Media Analytics</h1>
      </header>

      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'topUsers' ? 'active' : ''}`} 
          onClick={() => setActiveTab('topUsers')}
        >
          Top Users
        </div>
        <div 
          className={`tab ${activeTab === 'popular' ? 'active' : ''}`} 
          onClick={() => setActiveTab('popular')}
        >
          Popular Posts
        </div>
        <div 
          className={`tab ${activeTab === 'latest' ? 'active' : ''}`} 
          onClick={() => setActiveTab('latest')}
        >
          Latest Posts
        </div>
      </div>

      <div className="content">
        {activeTab === 'topUsers' && <TopUsers />}
        {activeTab === 'popular' && <Posts type="popular" />}
        {activeTab === 'latest' && <Posts type="latest" />}
      </div>
    </div>
  );
}

export default App; 