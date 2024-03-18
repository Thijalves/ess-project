import styles from './Discipline_in_Folder_Card.module.css';
import course_icon from '../../../assets/course_icon.png';

const CardCourse = ({name, rating, professor, code }) => {
  const rating_str: string = `${rating}`;
  return (
    <a className={styles.card} href={`/course/${code}`}>
      <div className={styles.course_box} >
        <div className={styles.course_title} > {name} </div>
        <div className={styles.course_professor} > Professor: {professor} </div>
        <div className={styles.course_rating} > 
          {rating != -1 ?
          (
            <>Minha Nota: {rating_str}</>
          ):(
            <>Minha Nota: --</>
          )} 
        </div>

      </div>
      <div className={styles.square}>
            <img src={course_icon} alt={name}/>
      </div>
    </a>
  );
};

export default CardCourse;