import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(0);
  const [link, setLink] = useState('');

  useEffect(() => {
    const fetchBannerSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/banner-settings');
        setDescription(response.data.description);
        setTimer(response.data.timer);
        setLink(response.data.link);
      } catch (error) {
        console.error('Error fetching banner settings:', error);
      }
    };

    fetchBannerSettings();
  }, []);

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5000/api/banner-settings', { description, timer, link });
      alert('Banner settings updated');
    } catch (error) {
      console.error('Error updating banner settings:', error);
    }
  };

  return (
    <div>
      <h1>Banner Dashboard</h1>
      <label>
        Description:
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Timer (seconds):
        <input type="number" value={timer} onChange={e => setTimer(e.target.value)} />
      </label>
      <br />
      <label>
        Link:
        <input type="text" value={link} onChange={e => setLink(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default Dashboard;
