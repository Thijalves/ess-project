import styles from './FolderCard.module.css';
import plus_icon from '../../../assets/plus_library.png';
import book_icon from '../../../assets/book.png';

const CardFolder = ({name, added }) => {
  const folder_name = name.replace(/\s+/g, "_");
  return (
    <a className={styles.card} href={`/library/${folder_name}`}>
      <div className={styles.folder_box} >
        <div className={styles.folder_title} > {name} </div>
      </div>
      <div className={styles.square}>
          {added ? (
            <img src={book_icon} alt={name}/>
          ) : (
            <img src={plus_icon} alt="Pasta vazia"/>
          )}
      </div>
    </a>
  );
};

export default CardFolder;