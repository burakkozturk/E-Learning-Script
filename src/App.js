import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext'; // LanguageProvider'ı import edin
import Navbar from './components/Navbar/Navbar';
import LoginForm from './components/LoginForm/LoginForm';
import CourseGrid from './components/CourseGrid/CourseGrid';
import Register from './components/Register/RegisterForm';
import Footer from './components/Footer/Footer';
import ProfilePage from './components/ProfilePage/ProfilePage';
import UnitDetail from './components/UnitDetail/UnitDetail';
import UnitContent from './components/UnitContent/UnitContent';
import QuizPage from './components/QuizPage/QuizPage';
import UpdateProfileForm from './components/UpdateProfileForm/UpdateProfileForm';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider> {/* AuthProvider ile tüm uygulamayı sarmalayın */}
        <LanguageProvider> {/* LanguageProvider ile içeriği sarmalayın */}
          <div className="App">
            <Navbar />

            <Routes>
              <Route path="/" element={<CourseGrid />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/unit-detail/:courseId" element={<UnitDetail />} />
              <Route path="/unit-content/:unitId" element={<UnitContent />} />
              <Route path="/quizzes/:unitId" element={<QuizPage />} />
              <Route path="/update-profile" element={<UpdateProfileForm />} />
          
              {/* Diğer route'lar buraya eklenebilir */}
            </Routes>
            <Footer />
          </div>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
