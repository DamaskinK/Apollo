import React from 'react';
import './Footer.css';

import logoPng from '../assets/Logo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo-section">
        <div className="footer-logo-container">
          <div className="footer-logo-image-wrapper">
            <img 
              src={logoPng}
              alt="Apollo Logo" 
              className="footer-logo-image" 
            />
          </div>
          <div className="footer-logo-text">
            <p>Apollo</p>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>© 2025 Technical University in Košice, All rights reserved</p>
      </div>

      <div className="footer-support">
        <p>
          Support: <a href="mailto:apollo@helpdesk.tuke.sk">apollo@helpdesk.tuke.sk</a>
        </p>
      </div>
    </footer>
  );
}