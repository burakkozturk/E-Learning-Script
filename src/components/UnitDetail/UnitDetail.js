import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './UnitDetail.css'; // Stil dosyasını import edin

function UnitDetail() {
  const [units, setUnits] = useState([]);
  const { courseId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const language = state?.language || "en";

  useEffect(() => {
    // Bu fonksiyon artık useEffect içinde doğrudan tanımlanıyor.
    const loadCourseUnits = async () => {
      try {
        const url = `/lang/${language}/course${courseId}.json`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Data could not be fetched');
        const data = await response.json();
        setUnits(data || []);
      } catch (error) {
        console.error("An error occurred while loading the file", error);
        setUnits([]);
      }
    };

    loadCourseUnits();
  }, [courseId, language]); // Bağımlılıkları buraya ekleyin.

  const handleUnitClick = (unitId) => {
    navigate(`/unit-content/${unitId}`);
  };

  return (
    <div>
      <div className="unit-detail">
        <h2>Course Units</h2>
        <ul className="unit-list">
          {units.map((unit) => (
            <li key={unit.id} onClick={() => handleUnitClick(unit.id)}>
              <h3>{unit.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UnitDetail;
