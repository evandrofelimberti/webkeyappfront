import { useLocation } from 'react-router-dom'
import Message from '../layout/Message'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import Loading from '../layout/Loading'

import styles from './Projects.module.css'
import ProjectCard from '../project/ProjectCard'
import { useState, useEffect} from 'react'

function Projects(){
    const [projects, setProjects] = useState([]);
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
                    setProjects(data)
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
        .then(() => {
            setProjects(projects.filter((Movimento) => Movimento.Id !== id))
            setProjectMessage('Projeto removido com sucesso!')
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
                
                {projects.length > 0 && 
                    projects.map((project) => (
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
                            handleRemove={removeProject}
                            />
                    ))

                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 &&(
                    <p>Não há projetos cadastrados!</p>
                )}

            </Container>    
        </div>
    )
}

export default Projects 
