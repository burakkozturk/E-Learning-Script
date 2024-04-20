import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate eklenmeli
import { useLanguage } from '../../context/LanguageContext';
import './QuizPage.css';
// Tüm olası dil dosyalarını önceden import et
import quizDataEN from '../../data/quizzes/quiz-unit4-en.json';
import quizDataTR from '../../data/quizzes/quiz-unit4-tr.json';
import quizDataEL from '../../data/quizzes/quiz-unit4-el.json';
import quizDataES from '../../data/quizzes/quiz-unit4-es.json';
import quizDataDA from '../../data/quizzes/quiz-unit4-da.json';
import quizDataLT from '../../data/quizzes/quiz-unit4-lt.json';
import quizDataPL from '../../data/quizzes/quiz-unit4-pl.json';

function QuizPage() {
  const { unitId } = useParams();
  const { language } = useLanguage();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answerStatus, setAnswerStatus] = useState({});
  const navigate = useNavigate(); // useNavigate hook'u eklenmeli

  useEffect(() => {
    setLoading(true);
    let data;
    switch (language) {
      case 'en': data = quizDataEN; break;
      case 'tr': data = quizDataTR; break;
      case 'el': data = quizDataEL; break;
      case 'es': data = quizDataES; break;
      case 'lt': data = quizDataLT; break;
      case 'pl': data = quizDataPL; break;
      case 'da': data = quizDataDA; break;
      default:  data = quizDataEN;
    }

    const filteredData = data.find(quiz => quiz.unitId.toString() === unitId);
    if (filteredData) {
      setQuizData(filteredData);
    } else {
      console.error('Quiz data could not be found for unitId:', unitId);
      setQuizData(null);
    }
    setLoading(false);
  }, [language, unitId]);

  const handleChange = (questionId, selectedOptionId) => {
    const isCorrect = quizData.questions.find(q => q.id === questionId).options.find(o => o.id === selectedOptionId).correct;
    setAnswerStatus(prev => ({
      ...prev,
      [questionId]: isCorrect
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const correctCount = Object.values(answerStatus).filter(status => status === true).length;
    const incorrectCount = quizData.questions.length - correctCount;

    alert(`✓: ${correctCount} x: ${incorrectCount}`);

    // Bir önceki sayfaya yönlendirme
    navigate(-1); // -1, bir önceki sayfaya yönlendirir.
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quizData || !quizData.questions) {
    return <div>Quiz not found.</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {quizData.questions.map((question, index) => (
          <div key={index} className="question">
            <h3 className="question-text">{question.questionText}</h3>
            {question.options.map((option) => (
              <label key={option.id} className="option">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  onChange={() => handleChange(question.id, option.id)}
                />
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
