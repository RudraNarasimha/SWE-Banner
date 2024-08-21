import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainPage.css';

const MainPage = () => {
  const [banner, setBanner] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/banner-settings');
        setBanner(response.data);
        setTimeLeft(response.data.timer);

        const countdown = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 0) {
              clearInterval(countdown);
              setShowBanner(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(countdown);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBanner();
  }, []);

  

  const handleToggleBanner = () => {
    setShowBanner(prevShowBanner => !prevShowBanner);
  };

  return (
    <div>
      {/* Toggle Button */}
      <button onClick={handleToggleBanner} className="toggle-button">
        {showBanner ? 'Hide Banner' : 'Show Banner'}
      </button>

      {/* Banner */}
      {showBanner && (
        <div className="banner">
          <h1>{banner.description}</h1>
          <p>{new Date(timeLeft * 1000).toISOString().substr(11, 8)}</p>
          <a
            href={banner.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Click here for more information"
          >
            Click
          </a>
        </div>
      )}

      {/* Content */}
      <div className="content">
        <h1>Welcome to the Main Page!</h1>
      </div>
    </div>
  );
};

export default MainPage;
