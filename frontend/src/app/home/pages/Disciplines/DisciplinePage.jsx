import React, { useState, useEffect } from 'react';
import DisciplineList from '../../components/Disciplines/DisciplineList';
import styles from './DisciplinePage.module.css';

const DisciplinesPage = () => {
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    const fetchDisciplines = async () => {
      // Certifique-se de que a URL esteja apontando para o endpoint correto
      const response = await fetch('http://localhost:8000/discipline/get_all');
      if (response.ok) {
        const data = await response.json();
        setDisciplines(data);
      } else {
        // Tratamento de erro
        console.error('Failed to fetch disciplines');
      }
    };
  
    fetchDisciplines();
  }, []);
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Disciplinas</h1>
      <DisciplineList disciplines={disciplines} />
    </div>
  );
};

export default DisciplinesPage;
