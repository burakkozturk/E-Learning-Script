// src/context/LanguageContext.js
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Varsayılan dil olarak 'en' (İngilizce) seçildi

  const value = {
    language,
    setLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
