import React, { useState } from 'react';
import styles from './EditReviewCard.module.css'; // Import CSS module for styling


const EditReviewCard = ({ course, onCancel }) => {
  const [updatedRating, setUpdatedRating] = useState(); // State to hold updated review rating
  const [updatedComment, setUpdatedComment] = useState(''); // State to hold updated review comment
  const [error, setError] = useState(''); // State to hold error message

  const updateReview = async () => {

    if (isNaN(updatedRating)) {
      setError('Por favor, insira uma nota.');
      return;
    }else{
      setError('');
    }

    if (updatedRating < 0 || updatedRating > 10) {
      setError('Por favor, insira uma nota entre 0 e 10.');
      return;
    }else{
      setError('');
    }

    try {
      // Get the user ID from local storage
      const user = JSON.parse(localStorage.getItem('user'));

      // Send PUT request to update the review
      const response = await fetch(`http://localhost:8000/review/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          discipline: course,
          rating: updatedRating,
          comment: updatedComment,
        }),
      });

      if (response.ok) {
        setUpdatedComment(''); // Reset updated comment
        setUpdatedRating(0); // Reset updated rating
        window.location.reload();
      } else {
        console.error('Failed to update review:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating review:', error);
    } finally {
      onCancel();
    }
  };


  return (
    <div>
      {/* Title outside the box */}
      <h2>Meu Review</h2>

      <div className={styles.EditReviewCard}>
        <label htmlFor="updatedRating">Nota:</label>
        <input type="number" id="updatedRating" value={updatedRating} onChange={(e) => setUpdatedRating(parseInt(e.target.value))} />
        <label htmlFor="updatedComment">Comentário:</label>
        <textarea id="updatedComment" value={updatedComment} onChange={(e) => setUpdatedComment(e.target.value)} />
        <p className={styles.error}>{error}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.noButton} onClick={onCancel}>Cancelar</button>
          <button className={styles.yesButton} onClick={updateReview}>Atualizar</button>
        </div>
      </div>

    </div>
  );
};

export default EditReviewCard;
