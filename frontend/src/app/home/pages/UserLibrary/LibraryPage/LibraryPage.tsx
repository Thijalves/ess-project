import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/navbar';
import CardFolder from '../../../components/Library/FolderCard/FolderCard'; 
import styles from './LibraryPage.module.css'
interface Folder{
    user_id: string
    name: string
    classes_id: string[]
}
interface UserLibrary{
    user_id: string
    folders: Folder[]
}

const LibraryPage = () => {
    const currUser = localStorage.getItem('user') || '{}';
    const currUser_id = JSON.parse(currUser).id;
    const [library, setLibrary] = useState<UserLibrary>({user_id: currUser_id, folders: []})
    const navigate = useNavigate();

    useEffect(() => {
        const getLibrary = async () => {
            try{
                const response = await fetch(`http://localhost:8000/library/get_user_library?user_id=${library.user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            
                if (response.status === 200){
                    const data = await response.json();
                    console.log('data:', data['detail']);
                    setLibrary({user_id: currUser_id, folders: data['detail']});
                }

            }catch(error){
                console.error('Erro ao enviar a solicitação GET:', error);
            }
        }

        getLibrary();

        const timer = setInterval(getLibrary, 30000);
        return () => clearInterval(timer);

    }, []);

    useEffect(() => {
        console.log('user_id:',library.user_id);
        console.log('library.folders:', library.folders);
    },[library]);


    return (
        <div>
        <section className={styles.container}>
        <Navbar />
            {library.user_id.length>0 ? (
                <>
                    <h2 className={styles.heading}>Pastas
                    <button onClick={() => navigate("/library/create-folder")} className={styles.button}>ADICIONAR PASTA</button>
                    </h2>
                    <section className={styles.layers}>
                        {library.folders.length > 0 ? (library.folders.map((folder, index) => (
                        <div key={index}>
                            <CardFolder
                            name={folder.name}
                            added ={folder.classes_id.length > 0}
                            />
                        </div>
                        ))):(
                            <div className={styles.aviso}>Nenhuma pasta adicionada</div>
                        )}
                    </section>
                </>
            ):(
                <>
                    <h2 className={styles.heading}>Usuário não Logado</h2>
                    <button onClick={() => navigate("/login")} className={styles.redirect}>PÁGINA DE LOGIN</button>
                </>
            )}
        </section>
        </div>
      );
    
}

export default LibraryPage;