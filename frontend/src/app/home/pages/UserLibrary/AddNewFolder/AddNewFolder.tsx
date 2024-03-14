import { useEffect, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../../../../../shared/components/Button";
import Input from "../../../../../shared/components/Input/input";
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

interface state{
    id: string,
    checked: boolean
}
class Added{
    private estado: state[];
    private addedClasses: string[];

    public constructor() {    
        this.estado = [];
        this.addedClasses = [];
    }

    public setState(): void{

    }

    public checkToggle(name: string){
        for(let i=0; i<this.estado.length; i++){
            if( this.estado[i].id == name)
                return i;
        }
        return -1;
    }

    public addToggle(name: string){
        this.estado.push({id: name, checked:true});
        this.addedClasses.push(name);
        return;
    }

    public checkClass(name: string){
        for(let i=0; i<this.addedClasses.length; i++){
            if( this.addedClasses[i] == name)
                return i;
        }
        return -1;
    }

    public removeClass(name: string){
        this.addedClasses = this.addedClasses.filter(element => element!= name);
    }

    public changeState(name: string){
        const toggleIndex = this.checkToggle(name);
        if(toggleIndex != -1){
            this.estado[toggleIndex].checked = !this.estado[toggleIndex].checked;
            const classIndex = this.checkClass(name);
            if(classIndex != -1)
                this.removeClass(name);
        }
    }

    
}

const AddNewFolder = () => {
    const navigate = useNavigate();

    //folder info
    const [name, setName] = useState("");
    const [user_id, setID] = useState("");
    const [classes_id, setClasses] = useState<number[]>([]);
    //form info
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Discipline[]>([]);

    const [error_message, setErrorMessage] = useState("");
    const [success_message, setSuccessMessage] = useState("");

    const currUser = localStorage.getItem('user') || '{}';

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>, classes: Added) => {
        console.log("---", e.target.checked);
        const item = Number(e.target.id);
        if(classes.checkClass(e.target.id) != -1){

        }
        else{
            classes.addClass(e.target.id);

        }

        if(e.target.checked == true){
            const val = classes_id.findIndex((element) => element == item)
            if(val==-1)
                setClasses(classes_id.concat(Number(e.target.id)));
        }
        else
            setClasses(classes_id.filter((element) => element != item));
    };
    
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
          setErrorMessage('Erro ao adicionar pasta. Tente novamente mais tarde.');
          setSuccessMessage('');
        }
      };

      let CousersToggles = new Added;

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
                    searchResults.map((disciplina, index) => (
                    <div key={index}>
                    <input
                        id= {disciplina.code} type="checkbox" 
                        onChange={handleOnChange()} 
                        checked={!!this.state
                        
                        -.checked[{disciplina.code}]}/>   
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
                Adicionar
            </Button>
        </form>
        </section>
      );
    
}

export default AddNewFolder;