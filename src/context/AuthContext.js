import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Güvenli JSON ayrıştırma fonksiyonu, dışarıda tanımlanmalı
function safeJSONParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error("JSON ayrıştırma hatası:", e);
    return null; // veya uygun bir hata değeri döndürün
  }
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Uygulama yüklendiğinde, kullanıcı bilgisini ve token'ı localStorage'dan al
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(safeJSONParse(user)); // Güvenli JSON ayrıştırma kullan
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('https://mbat4seniors-8ed6b159bacd.herokuapp.com/auth/generateToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Giriş başarısız');
      }
      const token = await response.text();
      const user = { username }; // Basit bir kullanıcı objesi oluştur
      localStorage.setItem('user', JSON.stringify(user)); // Kullanıcı bilgisini localStorage'a kaydet
      localStorage.setItem('token', token); // Token'ı localStorage'a kaydet
      setCurrentUser(user); // Kullanıcı durumunu güncelle
    } catch (error) {
      console.error("Login işlemi sırasında bir hata oluştu:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
