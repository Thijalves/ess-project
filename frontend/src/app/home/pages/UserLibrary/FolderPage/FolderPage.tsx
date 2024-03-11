import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/navbar';
import CardFolder from '../../../components/Library/FolderCard/FolderCard'; 
import styles from './FolderPage.module.css'

interface Folder{
    name: string
    classes_id: number[]
}
interface UserLibrary{
    user_id: string
    folders: Folder[]
}

const FolderPage = () => {
    const [library, setLibrary] = useState<UserLibrary>({user_id: "", folders: [{name: 'Atuais', classes_id: []},{name: 'Terminadas', classes_id: []}]})
    const [currentPage, setCurrentPage] = useState(1);
    const FoldersPerPage = 9;
    const navigate = useNavigate();
    const currUser = localStorage.getItem('user') || '{}';
    /*
        @router.get("/by_code/{code}",
            response_model=Discipline,
            summary="Get a discipline by code",
                    description="Retrieve detailed information of a specific discipline by its unique code.")
        def read_discipline(code: str):
            discipline = DisciplineService.get_discipline_by_code(code)
            if discipline:
                return discipline
            raise HTTPException(status_code=404, detail="Discipline not found")

    */
    const getUserFolder = async (name: string) => {
        try{
            const response = await fetch('http://localhost:8000/discipline/by_code/', {
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

    const handlePageClick = (type) => {
        if (type === 'prev') {
          setCurrentPage(currentPage - 1);
          setCurrFolders(currFolders.slice(0, currentPage*FoldersPerPage));
        } else {
          setCurrentPage(currentPage + 1);
          setCurrFolders(library.folders.slice(0, currentPage*FoldersPerPage));
        }
    };

    useEffect(() => {
        getUserFolder();
      }, [library]);
    
    if (!library) {
        navigate('/login');
        return null;
    }
    const [currFolders, setCurrFolders] =  useState(library.folders.length>6 ? library.folders.slice(0,6) : library.folders);

    return (
        <div>
        <section className={styles.container}>
        <Navbar />
            <h2 className={styles.heading}>Pastas</h2>
            <section className={styles.layers}>
                {currFolders.map((folder, index) => (
                <div key={index}>
                <Link to={`/library/${folder.name}`} style={{ textDecoration: 'none' }}>
                    <CardFolder
                    top_discipline={folder.classes_id[0]}
                    name={folder.name}
                    added={(folder.classes_id.length != 0) ? true : false}
                    />
                </Link>
                </div>
            ))}
            </section>
            
            <div>
            {currentPage > 1 && <button onClick={() => handlePageClick('prev')} className={styles.button}>Anterior</button>}
            {library.folders.length > currentPage * FoldersPerPage && <button onClick={() => handlePageClick('next')} className={styles.button}>Próxima</button>}
            </div>
        </section>
        </div>
      );
    
}

export default FolderPage;