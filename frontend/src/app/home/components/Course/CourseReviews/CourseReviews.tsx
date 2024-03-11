import styles from "./CourseReviews.module.css"; // Import CSS module
import { useEffect, useState } from "react";

function CourseReviews({ course }) {
  const [reviews, setReviews] = useState([]);
  const method = course[2];
  const page = course[1];
  const code = course[0].code;
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/displayreviews/${method}/${code}/${page}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setReviews(data.filter((review) => true));
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [course.code]);

  if (reviews.length === 0)
    return (
      <p className={styles.NoReviewsFound}>
        Oops... parece que não há mais reviews disponíveis
      </p>
    );
  else
    return (
      <>
        <div className={styles.ReviewSection}>
          <h2>Reviews</h2>
        </div>
        <ul className="list-group">
          {reviews.map((review) => (
            <li className={styles.singlereview} key={review}>
              <div className={styles.row}>
                <div className={styles.reviewuser}>{review.username}</div>
                <div className={styles.reviewdate}>{review.time}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.reviewcomment}>{review.comment}</div>
                <div className={styles.reviewgrade}>{review.rating}</div>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
}

export default CourseReviews;
