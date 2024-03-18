import { useEffect, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../../../../../shared/components/Button";
import Navbar from '../../../components/Navbar/navbar';
import styles from './AddNewFolder.module.css'

interface Discipline{
    name: string
    code: string
    department: string 
    semester: number
    professor: string
    description: string
}

const AddNewFolder = () => {
    const navigate = useNavigate();
    const currUser = localStorage.getItem('user') || '{}';
    const currUser_id = JSON.parse(currUser).id;

    //folder info
    const [name, setName] = useState("");
    const [user_id, setID] = useState(currUser_id);
    const [classes_id, setClasses] = useState<string[]>([]);
    //form info
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Discipline[]>([]);

    const [error_message, setErrorMessage] = useState("");
    const [success_message, setSuccessMessage] = useState("");

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const is_checked: boolean = e.currentTarget.checked;
        const class_id: string = e.currentTarget.id;
        const class_index: number = classes_id.findIndex(element => element == class_id);
        console.log("---", is_checked);

        if(is_checked == true && class_index == -1){
            setClasses([...classes_id, class_id]);
        }
        else if(is_checked == false && class_index != -1){
            setClasses(classes_id.filter(element => element != class_id));
        }
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

        setID(JSON.parse(currUser).id);
    
        const folderData = {
          user_id,
          name,
          classes_id,
        };
        
        console.log(folderData);
    
        try {
          const response = await fetch('http://localhost:8000/library/create_folder', {
            
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(folderData),
          });
    
    
          if (response.status === 200) {
            setSuccessMessage('Pasta adicionada com sucesso!');
            setErrorMessage('');
            navigate("/library");

          } else {
            const errorData = await response.json();
            setErrorMessage(`Erro ao adicionar pasta: ${errorData.detail}`);
            setSuccessMessage('');
          }
        } catch (error) {
          console.error('Erro ao enviar a solicitação POST:', error);
          setErrorMessage(String(error));
          setSuccessMessage('');
        }
      };

    return (
        <section className={styles.container}>
        <Navbar />

        <h1 className={styles.title}>NOVA PASTA</h1>
        <form className={styles.formContainer} onSubmit={handleSubmit}>

            <div className={styles.formInputContainer}>
                <label >Nome:</label>
                <input id="Nome" type="text" placeholder="Digite o nome da pasta"  value={name} onChange={(e) => setName(e.target.value)}/>
                <label >Adicionar Cadeiras:</label>
                <input type="text" placeholder="Pesquise por cadeira" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <>{searchQuery.length > 0 ?
                    (<div>
                        {searchResults.length > 0 ? (
                            searchResults.map((disciplina, index) => (
                            <div key={index}>
                            <input
                                id= {disciplina.code} type="checkbox" 
                                onChange={e => handleOnChange(e)} 
                                checked={classes_id.findIndex(element => element == disciplina.code) != -1}
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
                Adicionar
            </Button>
        </form>
        </section>
      );
    
}

export default AddNewFolder;