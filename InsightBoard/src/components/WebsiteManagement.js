import React, { useState } from 'react';

export default function WebsiteManagement({ websites, addWebsite, selectWebsite, selectedWebsite }) {
  const [newUrl, setNewUrl] = useState('');

  const handleAdd = () => {
    if (newUrl.trim()) {
      addWebsite(newUrl.trim());
      setNewUrl('');
    }
  };

  return (
    <div>
      <h2>Managing Business Websites</h2>
      <input
        type="text"
        placeholder="Enter website URL"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <button onClick={handleAdd}>Add Website</button>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px' }}>
        {websites.map((website) => (
          <li
            key={website.id}
            onClick={() => selectWebsite(website)}
            style={{
              padding: '8px',
              cursor: 'pointer',
              backgroundColor: selectedWebsite && selectedWebsite.id === website.id ? '#00BCD4' : 'transparent',
              color: selectedWebsite && selectedWebsite.id === website.id ? 'white' : 'black',
              borderRadius: '4px',
              marginBottom: '4px',
              transition: 'background-color 0.3s ease',
            }}
          >
            {website.url}
          </li>
        ))}
      </ul>
    </div>
  );
}
