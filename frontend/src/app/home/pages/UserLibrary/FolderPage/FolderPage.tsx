import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/navbar';
import CardCourse from '../../../components/Library/DisciplineCard/Discipline_in_Folder_Card'; 
import styles from './FolderPage.module.css'

interface Folder{
    name: string
    classes_id: string[]
}

interface Discipline{
    rate:number
    name: string
    code: string
    professor: string
}

const FolderPage = () => {
    let {folder_name} = useParams();
    const [folder, setFolder] = useState<Folder>({name: '', classes_id: []});
    const [classes, setClasses] = useState<Discipline[]>([]);
    const navigate = useNavigate();
    const currUser = localStorage.getItem('user') || '{}';
    const currUser_id = JSON.parse(currUser).id;
    const currUser_username = JSON.parse(currUser).username;

    const getUserFolder = async () => {    
        try {
            const response = await fetch(`http://localhost:8000/library/get_folder/${folder_name}?user_id=${currUser_id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('data:',data['detail']);
                delete data['detail']['user_id'];
                setFolder(data['detail']);
            }

        } catch (error) {
            console.error('Error fetching class results:', error);
        }
    };

    useEffect(() => {
        const getDisciplines = async () => {
            console.log("codigos",folder.classes_id);

            const new_classes: Discipline[] = []; 
            for(let i=0; i<folder.classes_id.length; i++){
                const code = folder.classes_id[i];
                try {
                    const response = await fetch(`http://localhost:8000/discipline/by_code/${code}`,{
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log('data:', data);
                        const rating =  await fetchReview(code);
                        new_classes.push({name:data['name'], code:data['name'], professor:data['professor'], rate: rating});
                    }
                } catch (error) {
                    console.error('Error fetching class results:', error);
                }
            }
            setClasses(new_classes);
        }
        getDisciplines();
        console.log('folder:',folder);
        console.log('classes:',classes);
    },[folder]);

    useEffect(() => {
        
        getUserFolder();
        const timer = setInterval(getUserFolder, 5000);
        
        return () => {
            clearInterval(timer);
        };

    }, []);

    const fetchReview = async (course_code: string) => {
        try {
            const response = await fetch(`http://localhost:8000/review/get_by_user_discipline?username=${currUser_username}&discipline=${course_code}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                if (data.length == 0){
                    return -1;
                }
                else
                    return data[0].rating;
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    return (
        <div>
        <section className={styles.container}>
        <Navbar />
            <h2 className={styles.heading}>{folder.name}
            <button onClick={() => navigate(`/library/${folder_name}/edit`)} className={styles.button}>EDITAR PASTA</button>
            </h2>
            <section className={styles.layers}>{
            classes.length > 0 ?
                (classes.map((discipline, index) => (
                    <div key={index}>
                        <CardCourse
                            name={discipline.name}
                            professor={discipline.professor}
                            rating={discipline.rate}
                            code={discipline.code}
                        />
                    </div>
                ))):(
                    <div className={styles.aviso}>Nenhuma cadeira adicionada</div>
                )
            }
            </section>
            
        </section>
        </div>
      );
    
}

export default FolderPage;