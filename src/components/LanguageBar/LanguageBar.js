// components/LanguageBar.js
import React from 'react';
import { useLanguage } from '../../context/LanguageContext'; // Context'i import edin
import './LanguageBar.css'; // Stil dosyası için

function LanguageBar() {

  const { setLanguage } = useLanguage();

  
  return (
    <div className="language-bar">
      <img src="./united-kingdom.png" alt="English" title="English" onClick={() => setLanguage('en')} />
      <img src="./lithuania.png" alt="Lithuanian" title="Lithuanian" onClick={() => setLanguage('lt')} />
      <img src="./denmark.png" alt="Danish" title="Danish" onClick={() => setLanguage('da')} />
      <img src="./turkey.png" alt="Turkish" title="Turkish" onClick={() => setLanguage('tr')} />
      <img src="./greece.png" alt="Greek" title="Greek" onClick={() => setLanguage('el')} />
      <img src="./spain.png" alt="Spanish" title="Spanish" onClick={() => setLanguage('es')} />
      <img src="./poland.png" alt="Polish" title="Polish" onClick={() => setLanguage('pl')} />
      {/* Daha fazla dil ekleyebilirsiniz */}
    </div>
  );
}

export default LanguageBar;
