import {parse, v4 as uuidv4} from 'uuid'

import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import styles from './Project.module.css'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import Message from '../layout/Message'
import ServiceCad from '../service/ServiceCad'
import { numberFormat } from '../form/numberFormat';


function Project(){
    const {id} = useParams()
    const [Movimento, setMovimento] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [Itens, setItens] = useState([])

    useEffect(() => {
        setTimeout(
            () => {
                fetch(`http://localhost:5028/api/movimento/${id}`,{
                    method:"GET" ,
                    headers:{'Content-Type': 'application/json',
                  },
                 })
                 .then((resp) => resp.json())
                 .then((data) => {
                    console.log('Get project id')
                    console.log(data)
                    setMovimento(data)
                    setItens(data.Itens)
                    console.log('Get project id 2')
                })
                 .catch((err) => console.log(err)) 
            }, 1000)

    }, [id]) 
    

    function createService(movimento){
        // ultimo servico
        setMessage('')
        const lastItem = movimento.Itens[movimento.Itens.length - 1]
       // lastService.id = uuidv4()
        const lastQuantidade = parseFloat(lastItem.Quantidade).toFixed(2)
        const lastValor = parseFloat(lastItem.Valor).toFixed(2)
     
        if(lastQuantidade  === 0){
            setMessage('Quantidade invalida!, verifique !')
            setType('error')
            movimento.Itens.pop()
            return false
        }

        if(lastValor === 0 ){
            setMessage('Valor invalido!, verifique !')
            setType('error')
            movimento.Itens.pop()
            return false
        }        

        const valorTotal = parseFloat(lastQuantidade * lastValor).toFixed(2)
        // maximum value validation 
       /* if(newCost > parseFloat(movimento.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            movimento.services.pop()
            return false
        }*/

        // adicionar o custo no total do projeto         
        lastItem.Quantidade = lastQuantidade
        lastItem.Valor = lastValor
        lastItem.Total = valorTotal

        //update project
        setMessage('')

        fetch(`http://localhost:5028/api/movimento/${movimento.Id}`,{
            method:"PUT" ,
            headers:{'Content-Type': 'application/json',
          },
          body:JSON.stringify(movimento),
         })
         .then((resp) => resp.json())
         .then((data) => {
            console.log(data)
            setMovimento(data)
            setItens(data.Itens)
            
            setShowServiceForm(false)

            setMessage('Movimento atualizado!')
            setType('success')
        }).catch((err) => console.log(err))         

    }

    function removeService(id){

        console.log("Deletando... produto Id: " + id)        

        const itensUpdated = Movimento.Itens.filter((Itens) => Itens.Id !== id)
        const MovimentoUpdated = Movimento
        MovimentoUpdated.Itens = itensUpdated

        fetch(`http://localhost:5028/api/movimentoitem/${id}`,{
            method:'DELETE',
            headers:{'Content-Type': 'application/json',
            },
            body:JSON.stringify(MovimentoUpdated),            
        }).then(resp => resp.json())
        .then((data) => {
            setMovimento(data)
            setItens(data.Itens)
            setMessage('Produto removido com sucesso!')
        }).catch(err => {
            console.log(err)
            setMessage("Erro ao deletar o produto Id " + id)
            setType('error')            
        })
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }    

    function editPost(project){
        setMessage('')
        console.log('edit post')
        console.log(project)
        // budget validation 
       /* if (project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }*/

        fetch(`http://localhost:5028/api/movimento/${project.Id}`,{
            method:"PUT" ,
            headers:{'Content-Type': 'application/json',
          },
          body:JSON.stringify(project),
         })
         .then((resp) => resp.json())
         .then((data) => {
            console.log('PATCH '+ data)
            setMovimento(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('success')
        }).catch((err) => console.log(err))         
    }



    return(        
        <>
        {Movimento.Id ? (
            <div className={styles.project_details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message} /> }
                    <div className={styles.details_container}>
                        <h1> Movimentação: {Movimento.Observacao} </h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar projeto' : 'Fechar'}                            
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p><span>Descricao:</span> {Movimento.Observacao}</p>
                                    <p><span>Tipo Movimento:</span> {Movimento.TipoMovimento.Descricao}</p>
                                    <p><span>Lavoura:</span> {Movimento.MovimentoLavoura.Lavoura.Descricao} 
                                      - Área(ha): {Movimento.MovimentoLavoura.Lavoura.AreaHa}
                                    </p>
                                    <p><span>Numero:</span> {Movimento.Numero}</p>                                    
                                    <p><span>Total: </span> {numberFormat(Movimento.Total)} </p>                                    
                                </div>    
                            ): (
                                <div className={styles.project_info}>
                                    <ProjectForm 
                                      handleSubmit={editPost} 
                                      btnText="Concluir edição"
                                      projectData={Movimento}
                                    />
                                </div>    
                            )}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2 >Adicione um serviço.............</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}                            
                        </button>
                        <div className={styles.project_info}>
                            {showServiceForm && (<ServiceForm 
                                                 handleSubmit={createService}
                                                 btnText="Adicionar Serviço"
                                                 projectData={Movimento}
                                                 />
                            )}
                        </div>
                    </div>
                    <h2>Serviços </h2>
                    <Container customClass="start">
                        {Itens.length > 0 && 
                        Itens.map((Itens) => (
                            <ServiceCad 
                                id={Itens.Id}
                                Descricao={Itens.Descricao}
                                Quantidade={Itens.Quantidade}
                                Valor={Itens.Valor}
                                Total={Itens.Total}
                                Produto={Itens.Descricao}
                                key={Itens.Id}
                                handleRemove={removeService}
                            />
                        ))

                        }
                        {Itens.length === 0 && <p> Não há serviços cadastrados.</p>}

                    </Container>
                </Container>
            </div>
            
            ): 
            (
            <Loading/> 
            
            )}
        </>
    )
}

export default Project