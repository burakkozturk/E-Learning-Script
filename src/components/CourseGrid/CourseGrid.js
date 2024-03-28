import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AboutSection from '../AboutSection/AboutSection';
import LanguageBar from '../LanguageBar/LanguageBar';
import { useLanguage } from '../../context/LanguageContext'; // Context'i kullanmak için
import './CourseGrid.css'; // Stil dosyasını import edin


function CourseGrid() {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [courses, setCourses] = useState([]);
    const [startCourseButtonText, setStartCourseButtonText] = useState("");

    useEffect(() => {
        // Dil dosyası çekme işlemi
        fetch(`/lang/${language}.json`)
            .then((response) => response.json())
            .then((data) => {
                setCourses(data.courses);
                setStartCourseButtonText(data.startCourse);
            })
            .catch((error) => console.error("Veri yüklenirken bir hata oluştu:", error));
    }, [language]);

    const startCourse = (courseId) => {
        navigate(`/unit-detail/${courseId}`, { state: { language } });
    };

    

    // Kurslar ve butonlar
    return (
        <div>
            <LanguageBar />
            <div className='container'>
                {courses.map((course) => (
                    <div key={course.id} className='box'>
                        <img src={course.imageUrl} alt="Kurs Logosu" />
                        <h1>{course.name}</h1>
                        <button className="button-30" onClick={() => startCourse(course.id)}>
                            {startCourseButtonText}
                        </button>
                    </div>
                ))}
            </div>
            <AboutSection />
        </div>
    );
}

export default CourseGrid;
