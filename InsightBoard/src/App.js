import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import WebsiteManagement from './components/WebsiteManagement';

export default function App() {
  const [websites, setWebsites] = useState([]);
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  const addWebsite = (url) => {
    if (!url) return;
    if (websites.find(w => w.url === url)) return;
    const newWebsite = { id: Date.now(), url, events: [] };
    setWebsites([...websites, newWebsite]);
  };

  const selectWebsite = (website) => {
    setSelectedWebsite(website);
  };

  const updateWebsiteEvents = (websiteId, events) => {
    setWebsites(websites.map(w => w.id === websiteId ? { ...w, events } : w));
  };

  return (
    <div className="container">
      <h1>Insight Board</h1>
      <div className="dashboard">
        <div className="dashboard-main">
          {selectedWebsite ? (
            <Dashboard
              website={selectedWebsite}
              updateEvents={(events) => updateWebsiteEvents(selectedWebsite.id, events)}
            />
          ) : (
            <p>Please select a website to view dashboard.</p>
          )}
        </div>
        <div className="dashboard-sidebar">
          <WebsiteManagement
            websites={websites}
            addWebsite={addWebsite}
            selectWebsite={selectWebsite}
            selectedWebsite={selectedWebsite}
          />
        </div>
      </div>
    </div>
  );
}
