
import React from 'react';
import './ProgressLog.css'; // Özel CSS stil dosyanız

function ProgressLog({ progressValues }) {
  // Ünitelerin listesini ve tamamlanma durumlarını gösterecek bir yapı
  const units = [
    { name: 'Unit 1: Introduction', key: 'c1Status' },
    { name: 'Unit 2: Advanced Concepts', key: 'c2Status' },
    { name: 'Unit 3: Practical Applications', key: 'c3Status' },
    // Diğer üniteleri de benzer şekilde ekleyebilirsiniz...
  ];

  return (
    <div className="progress-log">
      <h3>Course Progress</h3>
      <ul>
        {units.map(unit => (
          <li key={unit.key} className={progressValues[unit.key] === 100 ? 'completed' : 'pending'}>
            {unit.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgressLog;