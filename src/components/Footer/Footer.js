// components/Footer/Footer.js

import React from 'react';
import './Footer.css'; // Footer CSS dosyasını import edin

function Footer() {
  return (
    <footer className="footer">
        <div className="logo-side">
            {/* Logo yolu proje yapınıza göre değişebilir */}
            <img src="/logo.png" alt="Logo" />
        </div>
        <div className="link-side">
            {/* Linklerinizi ve yönlendirmelerinizi güncelleyin */}
            <a href="#">Disclaimer</a>
            <a href="/privacy.html">Privacy Policy</a>
            <p>MBAT4Seniors All Rights Reserved.</p>
        </div>
    </footer>
  );
}

export default Footer;
