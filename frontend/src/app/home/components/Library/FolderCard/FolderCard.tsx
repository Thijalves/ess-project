import styles from './FolderCard.module.css';
import plus_icon from '../../../assets/plus-icon.png';

const CardFolder = ({ top_discipline, name, added }) => {
  const folder_name = name.replace(/\s+/g, "_");
  return (
    <a className={styles.card} href={`/${folder_name}`}>
      <div className={styles.folder_box} >
        <div className={styles.folder_title} > {name} </div>
      </div>
      <div className={styles.square}>
          {added ? (
              top_discipline
          ) : (
            <img src={plus_icon} alt="Pasta vazia"/>
          )}
      </div>
    </a>
  );
};

export default CardFolder;