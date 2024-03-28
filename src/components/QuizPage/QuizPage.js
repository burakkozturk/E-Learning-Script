import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './QuizPage.css';
import quizDataJSON from '../../data/quizzes/quiz-unit4.json'; // JSON dosyanızın yolu

function QuizPage() {
    const { unitId } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                // JSON dosyasını doğrudan import ederek kullan
                // Örnek: unitId'ye göre filtreleme yapabilirsiniz. Burada basit bir örnek verilmiştir.
                const data = quizDataJSON.find(quiz => quiz.unitId.toString() === unitId); // unitId string olduğu için dönüşüm yapılıyor
                if (!data) {
                    throw new Error('Quiz data could not be fetched');
                }
                setQuizData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [unitId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!quizData) {
        return <div>Quiz not found.</div>;
    }
    const handleSubmit = (e) => {
        e.preventDefault(); // Formun varsayılan gönderim davranışını engelle

        let correctCount = 0;
        const formData = new FormData(e.target);
        const userAnswers = Object.fromEntries(formData.entries());

        quizData.questions.forEach(question => {
            const correctOption = question.options.find(option => option.correct);
            if (correctOption && userAnswers[`question-${question.id}`] === correctOption.id.toString()) {
                correctCount++;
            }
        });

        const incorrectCount = quizData.questions.length - correctCount;
        alert(`Doğru: ${correctCount}, Yanlış: ${incorrectCount}`);
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
