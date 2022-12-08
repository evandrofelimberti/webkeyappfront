import { useNavigate } from "react-router-dom";

import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

function NewProject(){
    const navigate = useNavigate()

    function createPost(movimento){
        //movimento.cost = 0
        movimento.Itens = []

        fetch('http://localhost:5028/api/movimento',{
           method: 'POST' ,
           headers:{'Content-Type': 'application/json',
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
        <h1 >Criar Projeto</h1>
        <p>Crie seu projeto para depois adicionar os serviços</p>
        <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
    </div> 
    )
}

export default NewProject