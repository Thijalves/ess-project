import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import styles from "./index.module.css";
import MyReviewCard from "../../components/Course/MyReviewCard/MyReviewCard";
import DeleteReviewCard from "../../components/Course/DeleteReviewCard/DeleteReviewCard";
import AddReviewCard from "../../components/Course/AddReviewCard/AddReviewCard";
import EditReviewCard from "../../components/Course/EditReviewCard/EditReviewCard";
import CourseInfo from "../../components/Course/CourseInfo/CourseInfo";
import CourseReviews from "../../components/Course/CourseReviews/CourseReviews";

const Course = () => {
  const { code } = useParams(); // Get the course code from the URL params
  const [course, setcourse] = useState({}); // State to hold course information
  const [currentCard, setCurrentCard] = useState("myReview"); // State to manage the currently displayed card

  // Fetch course information when component mounts
  useEffect(() => {
    const fetchcourse = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/discipline/by_code/${code}`
        );
        if (response.ok) {
          const data = await response.json();
          setcourse(data); // Set course state with fetched data
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchcourse();
  }, [code]); // Fetch course whenever the code parameter changes

  // Render the currently selected card
  const renderCard = () => {
    switch (currentCard) {
      case "myReview":
        return (
          <MyReviewCard
            course={code}
            onDelete={() => setCurrentCard("deleteReview")}
            onEdit={() => setCurrentCard("editReview")}
            onAdd={() => setCurrentCard("addReview")}
          />
        );
      case "deleteReview":
        return (
          <DeleteReviewCard
            course={code}
            onCancel={() => setCurrentCard("myReview")}
          />
        );
      case "addReview":
        return (
          <AddReviewCard
            course={code}
            onCancel={() => setCurrentCard("myReview")}
          />
        );
      case "editReview":
        return (
          <EditReviewCard
            course={code}
            onCancel={() => setCurrentCard("myReview")}
          />
        );
      default:
        return (
          <DeleteReviewCard
            course={code}
            onCancel={() => setCurrentCard("myReview")}
          />
        );
    }
  };

  function select(course) {
    const getInitialState = () => {
      const value = "Mais recentes";
      return value;
    };

    const [value, setValue] = useState(getInitialState);

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    return (
      <div className={styles.selector}>
        <label>Método de ordenação :</label>
        <select value={value} onChange={handleChange}>
          <option value="recents">Mais recentes</option>
          <option value="oldest">Mais antigos</option>
          <option value="worstgrades">Menores notas</option>
          <option value="bestgrades">Maiores notas</option>
        </select>
        <CourseReviews course={[course, 1, value]}></CourseReviews>
      </div>
    );
  }

  return (
    <div>
      <section className={styles.container}>
        <Navbar />
        <CourseInfo course={course} />
        {renderCard()}
      </section>
      <div>{select(course)}</div>
    </div>
  );
};

export default Course;
