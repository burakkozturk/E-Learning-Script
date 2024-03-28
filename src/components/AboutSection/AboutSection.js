// components/AboutSection.js
import React from 'react';
import './AboutSection.css'; // Stil dosyasını import edin


function AboutSection() {
  return (
    <div className="about-section">
      <h2>About MBAT</h2>
      <p>MBAT is a new method of psychological intervention first proposed by Laury Rappaport in the US 12 years ago. Practitioners of MBAT are of the opinion that this method greatly benefits patients participating in therapy and helps to cope with depression, anxiety and stress. The project products are made to achieve high-quality skills and competences for educators such as supporting individuals with mental health issues and delivering MBAT sessions.</p>
      <img src='./erasmus-logo.png' alt="MBAT Method" />
    </div>
  );
}

export default AboutSection;
