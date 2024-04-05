import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext'; // Dil context'ini import edin
import './UnitContent.css';

function UnitContent() {
  const [contents, setContents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { unitId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage(); // Context'ten dil bilgisini alın
  const [unitDetails, setUnitDetails] = useState({});
  const [error, setError] = useState('');
  const [hasQuiz, setHasQuiz] = useState(false);

  useEffect(() => {
    const fetchUnitContent = async () => {
      try {
        const response = await fetch(`/lang/${language}/unit${unitId}.json`);
        if (!response.ok) throw new Error('Data could not be fetched');
        const data = await response.json();
        setContents(data.contents);
        setUnitDetails({ pdfUrl: data.unitDetails.pdfUrl }); // API'dan gelen pdfUrl'i burada ayarlayın
        setHasQuiz(data.hasQuiz);
      } catch (error) {
        console.error("Error:", error);
        setError('Failed to load unit data.');
      }
    };

    fetchUnitContent();
  }, [unitId, language]); // Dil veya unitId değiştiğinde içerikleri yeniden yükleyin

  const handleNext = () => setCurrentIndex(currentIndex < contents.length - 1 ? currentIndex + 1 : currentIndex);
  const handleDone = () => navigate(`/`);
  const handleViewPdf = () => {
    // unitDetails içinde pdfUrl var mı diye kontrol edin
    if (unitDetails && unitDetails.pdfUrl) {
      // Eğer varsa, yeni sekmede açın
      window.open(unitDetails.pdfUrl, '_blank');
    } else {
      // Eğer yoksa, kullanıcıya hata mesajı gösterin
      alert('PDF URL not found for this unit');
    }
  };
  const handleGoToQuiz = () => hasQuiz ? navigate(`/quizzes/${unitId}`) : console.log('No quiz available for this unit');

  const renderContentItem = (content) => (
    <>
      {content.description && <p>{content.description}</p>}
      {content.imgUrl && <img src={content.imgUrl} alt="Content" />}
    </>
  );

  return (
    <div className="unit-content">
      <h2>Unit Contents</h2>
      {error && <p className="error">{error}</p>}
      {contents.length > 0 ? (
        <div className="content-item">
          <h3>Content {currentIndex + 1} of {contents.length}</h3>
          {renderContentItem(contents[currentIndex])}
          <div className="content-navigation">
            {currentIndex < contents.length - 1 ? (
              <button onClick={handleNext} className="next-button">Next</button>
            ) : (
              <button onClick={handleDone} className="done-button">Done</button>
            )}
            <button onClick={handleViewPdf} className="view-button">View PDF</button>
            {hasQuiz && <button onClick={handleGoToQuiz} className="quiz-button">Go to Quiz</button>}
          </div>
        </div>
      ) : <p>No contents available.</p>}
    </div>
  );
}

export default UnitContent;
