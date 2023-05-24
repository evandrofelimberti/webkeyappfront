import { useNavigate } from "react-router-dom";

import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'
import UseToken from '../layout/UseToken'

function NewProject(){
    const navigate = useNavigate()
    const { token} = UseToken();  

    function createPost(movimento){
        //movimento.cost = 0
        movimento.Itens = []

        fetch(process.env.REACT_APP_URL_API_WEB_APP_KEY +`/movimento`,{
           method: 'POST' ,
           headers:{'Content-Type': 'application/json',
           "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(movimento)
       })
       .then((resp) => resp.json())
       .then((data) => {
        console.log(data)
       // history('/projects',{message:'Projeto criado com sucesso!'}) 
       navigate('/projects', { state: { message: 'Registro criado com sucesso!' } })
        //history('/projects', {state:{message: 'Projeto criado com sucesso!'}})
       })
       .catch((err) => console.log(err))        
  }

    return(
    <div className={styles.newproject_container}>
        <h1 >Lançar movimento</h1>
        <p>Crie a Movimentação para depois adicionar os produtos</p>
        <ProjectForm handleSubmit={createPost} btnText="Salvar"/>
    </div> 
    )
}

export default NewProject