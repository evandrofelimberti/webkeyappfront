import { useLocation } from 'react-router-dom'
import Message from '../layout/Message'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import Loading from '../layout/Loading'

import styles from './Projects.module.css'
import ProjectCard from '../project/ProjectCard'
import { useState, useEffect} from 'react'

function Projects(){
    const [movimento, setMovimentos] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }



    useEffect(() => {
        setTimeout(
           async () => {
             await fetch("http://localhost:5028/api/movimento",{
                    method:"GET" ,     
                    mode:"cors",                                  
                    headers:{
                        'Accept': 'application/json;', 
                        'Content-Type': 'application/json; charset=utf-8'                    
                  },                  
                  credentials:'same-origin'
                 })
                 .then((resp) => resp.json())
                 .then((data) => {                    
                    console.log(data)
                    setMovimentos(data)
                    setRemoveLoading(true)
                })
                 .catch((err) => console.log(err)) 
            }, 1000)

    }, []) 
   
   

    function removeProject(id){
        fetch(`http://localhost:5028/api/movimento/${id}`,{
            method:'DELETE',
            headers:{'Content-Type': 'application/json',
            },            
        }).then(resp => resp.json())
        .then((data) => {
            if (data = 'Movimento deletado!'){
            setMovimentos(movimento.filter((Movimento) => Movimento.Id !== id))
            setProjectMessage('Projeto removido com sucesso!')}
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div> 
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                
                {movimento.length > 0 && 
                    movimento.map((project) => (
                        <ProjectCard 
                           /* name={project.name}
                            id={project.id}  
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}*/
                            key={project.Id}
                            id={project.Id}
                            datainclusao={project.DataInclusao}
                            numero={project.Numero}
                            observacao={project.Observacao}
                            itens={project.Itens}
                            total={project.Total}
                            handleRemove={removeProject}
                            />
                    ))

                }
                {!removeLoading && <Loading />}
                {removeLoading && movimento.length === 0 &&(
                    <p>Não há projetos cadastrados!</p>
                )}

            </Container>    
        </div>
    )
}

export default Projects 
