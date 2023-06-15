import { useLocation } from 'react-router-dom'
import Message from '../layout/Message'
import Container from '../layout/Container'
import Loading from '../layout/Loading'

import styles from './Projects.module.css'
import ProjectCard from '../project/ProjectCard'
import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import UseToken from '../layout/UseToken'
import MovimentoService from '../../services/MovimentoService'
import Pagination from "@material-ui/lab/Pagination";

function Projects(){
    const [movimento, setMovimentos] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('')
    const { token} = UseToken();

    const [numeroPagina, setnumeroPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [tamanhoPagina, settamanhoPagina] = useState(8);
  
    const tamannhosPagina = [4, 8, 12];

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    const getRequestParams = (filtroNome, numeroPagina, tamanhoPagina) => {
        let params = {};
    
        if (filtroNome) {
          params["Nome"] = filtroNome;
        }
    
        if (numeroPagina) {
          params["NumeroPagina"] = numeroPagina - 1;
        }
    
        if (tamanhoPagina) {
          params["TamanhoPagina"] = tamanhoPagina;
        }
    
        return params;
      };
  
      const recuperarMovimentosFiltro = () => {
        const params = getRequestParams(searchName, numeroPagina, tamanhoPagina);
  
        MovimentoService.findByNome(params)
          .then((response) => {
            const { movimento, totalPaginas } = response.data;
            setMovimentos(movimento);
            setRemoveLoading(true)
            setTotalPaginas(totalPaginas);
          })
          .catch((e) => {
            console.log(e);
          });
      };
       
      const findByName = () => {
        setnumeroPagina(1);
        recuperarMovimentosFiltro();
      }; 
      
      useEffect(() => {
        recuperarMovimentosFiltro();
      }, [numeroPagina, tamanhoPagina]); 

      const handleNumeroPaginaChange = (event, value) => {
        setnumeroPagina(value);
      };
    
      const handleTamanhoPaginaChange = (event) => {
        settamanhoPagina(event.target.value);
        setnumeroPagina(1);
      };

       function removeProject(id){
        { window.confirm( 'Deseja deletar o Movimento?', ) &&         
        fetch(process.env.REACT_APP_URL_API_WEB_APP_KEY +`/movimento/${id}`,{
            method:'DELETE',
            headers:{'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
            },            
        }).then(resp => {
            resp.json(); 
            if(resp.ok){
                setMovimentos(movimento.filter((Movimento) => Movimento.Id !== id))
                setProjectMessage('Movimento removido com sucesso!')                                
            }else{
                setProjectMessage('Ocorreu erro ao deletar o movimento!') 
            }        
        })
        .catch(err => console.log(err))    
    }
    }

    const [searchName, setSearchName] = useState("");    

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName);
      };   

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
      
                <input className={styles.input}
                    type="text"
                    placeholder="Pesquisar pelo Descrição"
                    value={searchName}
                    onChange={onChangeSearchName}
                />
                <div >
                    <button className={styles.buttonPesquisa}
                        type="button"
                        onClick={findByName}
                    > Pesquisar
                    </button>
                </div>
               {/* <LinkButton className={styles.btnlink} to="/newproject" text="Criar movimento"/>*/}
                <Link className={styles.btnLink} to="/newproject"> Criar movimento</Link>  
            </div> 

            <div classname="mt-0">
                {"Itens por página: "}
                <select onChange={handleTamanhoPaginaChange} value={tamanhoPagina}>
                {tamannhosPagina.map((size) => (
                    <option key={size} value={size}>
                    {size}
                    </option>
                ))}
                </select>

                <Pagination
                className="my-2"
                count={totalPaginas}
                page={numeroPagina}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                onChange={handleNumeroPaginaChange}
                />
            </div>


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
