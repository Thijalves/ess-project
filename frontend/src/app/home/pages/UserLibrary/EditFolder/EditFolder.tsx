import { useEffect, ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from "../../../../../shared/components/Button";
import Input from "../../../../../shared/components/Input/input";
import Navbar from '../../../components/Navbar/navbar';
import styles from './EditFolder.module.css'

const EditFolder = () => {
    const navigate = useNavigate();
    const original_name = useParams();

    //folder info
    const [name, setName] = useState("");
    const [user_id, setID] = useState("");
    const [classes_id, setClasses] = useState<number[]>([]);
    //form info
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [switchState, setSwitch] = useState(false);

    const [error_message, setErrorMessage] = useState("");
    const [success_message, setSuccessMessage] = useState("");

    const currUser = localStorage.getItem('user') || '{}';

    class Added{
        state;
        setState;

        constructor() {
          
            this.state = {
                user: [],
                checked: []
            }
          
          
            this.handleOnChange = this.handleOnChange.bind(this);
        }

        const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
            console.log("---", e.target.checked);
            const item = Number(e.target.id);
            const isChecked = e.target.checked;
    
            this.setState(
                ({checked}) => ({
                    checked: {
                        ...checked,
                        [e.target.id]: isChecked,
                    }
                })
            );
    
            if(e.target.checked == true){
                const val = classes_id.findIndex((element) => element == item)
                if(val==-1)
                    setClasses(classes_id.concat(Number(e.target.id)));
            }
            else
                setClasses(classes_id.filter((element) => element != item));
        };
    }
    
    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`http://localhost:8000/discipline/get_disciplines_by_search/${searchQuery}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };
    
        fetchSearchResults();
    },[searchQuery]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const folderData = {
          user_id,
          name,
          classes_id,
        };

        setID(JSON.parse(currUser).user_id);
    
        try {
          const response = await fetch('http://localhost:8000/library//:original_name/update_folder', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(folderData),
          });
    
    
          if (response.status === 200) {
            setSuccessMessage('Pasta editada com sucesso!');
            setErrorMessage('');
            navigate("/library/:name");

          } else {
            const errorData = await response.json();
            setErrorMessage(`Erro ao editar pasta: ${errorData.detail}`);
            setSuccessMessage('');
          }
        } catch (error) {
          console.error('Erro ao enviar a solicitação PUT:', error);
          setErrorMessage('Erro ao editar pasta. Tente novamente mais tarde.');
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
                <input type="text" placeholder="Digite o nome da pasta"  value={name} onChange={(e) => setName(e.target.value)}/>
                <label >Adicionar Cadeiras:</label>
                <input type="text" placeholder="Pesquise por cadeira" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                
                <div>
                {searchResults.length > 0 ? (
                    searchResults.map((disciplina) => (
                    <div key={disciplina.code}>
                    <input
                        id= {disciplina.code} type="checkbox" 
                        onChange={this.handleOnChange} 
                        checked={!!this.state.checked[{disciplina.code}]}/>   
                    <label htmlFor={disciplina.code}>{disciplina.name}</label>
                    </div>
                    ))
                ): (
                    <div> Nenhuma disciplina encontrada.</div>
                )}
                </div>

            {error_message && <p className={styles.errorMessage}>{error_message}</p>}
            {success_message && <p className={styles.successMessage}>{success_message}</p>}
            
            </div>

            <Button data-cy="create" type="submit">
                Concluir
            </Button>
        </form>
        </section>
      );
    
}

export default EditFolder;