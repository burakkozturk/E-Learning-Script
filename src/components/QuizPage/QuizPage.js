import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './QuizPage.css';
// Tüm olası dil dosyalarını önceden import et
import quizDataEN from '../../data/quizzes/quiz-unit4-en.json';
import quizDataTR from '../../data/quizzes/quiz-unit4-tr.json'; // Örnek olarak Türkçe, diğer diller için benzer şekilde

function QuizPage() {
  const { unitId } = useParams();
  const { language } = useLanguage();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Aktif dil:", language); // Aktif dil değerini konsola yazdır
    console.log("Unit ID:", unitId); // Unit ID değerini konsola yazdır
    setLoading(true);
    let data;
    switch (language) {
      case 'en':
        data = quizDataEN;
        break;
      case 'tr':
        data = quizDataTR;
        break;
      // Diğer diller için ek case'ler eklenebilir
      default:
        data = quizDataEN; // Varsayılan olarak İngilizce
    }

    const filteredData = data.find(quiz => quiz.unitId.toString() === unitId); // unitId'ye göre filtreleme
    if (filteredData) {
      setQuizData(filteredData);
    } else {
      console.error('Quiz data could not be found for unitId:', unitId);
      setQuizData(null);
    }

    setLoading(false);
  }, [language, unitId]); // Dil veya unitId değiştiğinde içerikleri yeniden yükleyin

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quizData || !quizData.questions) {
    return <div>Quiz not found.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form işlemleri...
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {quizData.questions.map((question, index) => (
          <div key={index} className="question">
            <h3 className="question-text">{question.questionText}</h3>
            {question.options.map((option) => (
              <label key={option.id} className="option">
                <input type="radio" name={`question-${question.id}`} value={option.id} />
                {option.optionText}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default QuizPage;
