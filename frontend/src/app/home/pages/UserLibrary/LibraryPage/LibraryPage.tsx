import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/navbar';
import CardFolder from '../../../components/Library/FolderCard/FolderCard'; 
import styles from './LibraryPage.module.css'
interface Folder{
    name: string
    classes_id: number[]
}
interface UserLibrary{
    user_id: string
    folders: Folder[]
}

const LibraryPage = () => {
    const [library, setLibrary] = useState<UserLibrary>({user_id: "", folders: [{name: 'cadeiras atuais', classes_id: []},
    {name: 'cadeiras pagas', classes_id: []}, {name: 'eletivas', classes_id: []},
    {name: 'cadeiras que eu quero pagar', classes_id: []}]})
    const navigate = useNavigate();
    const currUser = localStorage.getItem('user') || '{}';

    const getLibrary = async () => {
        try{
            const response = await fetch('http://localhost:8000/library/get_user_library', {
            method: 'GET',
            body: JSON.parse(currUser).id
            });
        
            if (response.status === 200){
                const data = await response.json();
                setLibrary({user_id: JSON.parse(currUser).id, folders: data});
            }

        }catch(error){
            console.error('Erro ao enviar a solicitação GET:', error);
        }
    }

    useEffect(() => {
        getLibrary();
      }, [library]);
    
    if (!library) {
        navigate('/login');
        return null;
    }

    return (
        <div>
        <section className={styles.container}>
        <Navbar />
            <h2 className={styles.heading}>Pastas</h2>
            <div>
                <Link to="/library/create-folder" className={styles.heading2}>ADICIONAR PASTA</Link>
            </div>
            <section className={styles.layers}>
                {library.folders.map((folder, index) => (
                <div key={index}>
                    <CardFolder
                    top_discipline={folder.classes_id[0]}
                    name={folder.name}
                    added={(folder.classes_id.length != 0) ? true : false}
                    />
                </div>
                ))}
            </section>
        </section>
        </div>
      );
    
}

export default LibraryPage;