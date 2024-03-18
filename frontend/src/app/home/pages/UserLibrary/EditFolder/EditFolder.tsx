import { useEffect, ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from "../../../../../shared/components/Button";
import Navbar from '../../../components/Navbar/navbar';
import styles from './EditFolder.module.css'
interface Discipline{
    name: string
    code: string
}

const EditFolder = () => {
    const navigate = useNavigate();
    const currUser = localStorage.getItem('user') || '{}';
    const currUser_id = JSON.parse(currUser).id;

    //folder info
    let {original_name} = useParams();
    console.log(original_name);
    const [name, setName] = useState(original_name || '');
    const [user_id, setID] = useState(currUser_id);
    const [courses, setCourses] = useState<Discipline[]>([]);
    const [classes_id, setClassesID] = useState<string[]>([]);
    //form info
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Discipline[]>([]);

    const [error_message, setErrorMessage] = useState("");
    const [success_message, setSuccessMessage] = useState("");

    useEffect(() => {
        const getUserFolder = async () => {    
            try {
                const response = await fetch(`http://localhost:8000/library/get_folder/${original_name}?user_id=${currUser_id}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('get_folder:',data['detail']);
                    setName(data['detail'].name);
                    setClassesID(data['detail'].classes_id);
                }

                else
                    navigate('/library');

            } catch (error) {
                console.error('Error fetching folder results:', error);
            }
        };

        getUserFolder();

    }, []);

    useEffect(() => {

        const getDisciplines = async () => {
            const new_courses: Discipline[] = [];
            for(let i=0; i<classes_id.length; i++){
                const code = classes_id[i];
                try {
                    const response = await fetch(`http://localhost:8000/discipline/by_code/${code}`,{
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        new_courses.push({name:data['name'], code:data['code']});
                    }
                } catch (error) {
                    console.error('Error fetching class results:', error);
                }
            }
            setCourses(new_courses);
        };
        getDisciplines();
    }, [classes_id]);


    const handleOnChange = (e: ChangeEvent<HTMLInputElement>, course: Discipline) => {
        const is_checked: boolean = e.currentTarget.checked;
        const class_index: number = courses.findIndex(element => element.code == course.code);
        console.log("---", is_checked);

        if(is_checked == true && class_index == -1){
            setCourses([...courses, course]);
            setClassesID([...classes_id, course.code]);
        }
        else if(is_checked == false && class_index != -1){
            setCourses(courses.filter(element => element.code != course.code));
            setClassesID(classes_id.filter(element => element != course.code));
        }

        console.log(courses);
    };
    
    useEffect(() => {
        const fetchSearchResults = async () => {
            if(searchQuery.length > 0){      
                try {
                    const response = await fetch(`http://localhost:8000/discipline/get_disciplines_by_search/${searchQuery}`);
                    if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data);
                    }
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }}
        };
    
        fetchSearchResults();
      }, [searchQuery]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('coursesSubmit:', courses);
    
        const folderData = {
          user_id,
          name,
          classes_id,
        };

        console.log('folderData:',folderData);
    
        try {
          const response = await fetch(`http://localhost:8000/library/${original_name}/update_folder`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(folderData),
          });
    
    
          if (response.status === 200) {
            setSuccessMessage('Pasta editada com sucesso!');
            setErrorMessage('');
            navigate('/library');
          } else {
            const errorData = await response.json();
            setErrorMessage(`Erro ao adicionar pasta: ${errorData.detail}`);
            setSuccessMessage('');
          }
        } catch (error) {
          console.error('Erro ao enviar a solicitação PUT:', error);
          setErrorMessage(String(error));
          setSuccessMessage('');
        }
      };

    return (
        <section className={styles.container}>
        <Navbar />

        <h1 className={styles.title}>EDITAR PASTA</h1>
        <form className={styles.formContainer} onSubmit={handleSubmit}>

            <div className={styles.formInputContainer}>
                <label >Nome:</label>
                <input type="text" placeholder="Digite o nome da pasta"  value={name} onChange={(e) => setName(e.target.value)}/>
                <label >Cadeiras na Pasta:</label>
                <div>
                    {courses.length > 0 ? (
                        courses.map((disciplina, index) => (
                        <div key={index}>
                        <input
                            id= {disciplina.code} type="checkbox" 
                            onChange={e => handleOnChange(e, disciplina)} 
                            checked={true}
                        />   
                        <label htmlFor={disciplina.code}>{disciplina.name}</label>
                        </div>
                        ))
                    ): (
                        <div> Pasta Vazia.</div>
                    )}
                </div>
                
                <label >Adicionar Cadeiras:</label>
                <input type="text" placeholder="Pesquise por cadeira" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <>{searchQuery.length > 0 ?
                    (<div>
                        {searchResults.length > 0 ? (
                            searchResults.map((disciplina, index) => (
                            <div key={index}>
                            <input
                                id= {disciplina.code} type="checkbox" 
                                onChange={e => handleOnChange(e, disciplina)} 
                                checked={courses.findIndex(element => element.code == disciplina.code) != -1}
                            />   
                            <label htmlFor={disciplina.code}>{disciplina.name}</label>
                            </div>
                            ))
                        ): (
                            <div> Nenhuma disciplina encontrada.</div>
                        )}
                    </div>):(
                        <div> Adicione uma disciplina.</div>
                    )}
                </>

            {error_message && <p className={styles.errorMessage}>{error_message}</p>}
            {success_message && <p className={styles.successMessage}>{success_message}</p>}
            
            </div>

            <Button data-cy="create" type="submit">
                Confirmar
            </Button>
        </form>
        </section>
      );
    
}

export default EditFolder;