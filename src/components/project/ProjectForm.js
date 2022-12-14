import {useEffect, useState} from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit, btnText, projectData}){

    const [TipoMovimento, setTipoMovimento] = useState([])
    const [Lavoura, setLavoura] = useState([])
    const [Safra, setSafra] = useState([])
    const [MovimentoLavoura, setMovimentoLavoura] = useState({})
    const [Movimento, setMovimento] = useState(projectData || {})
     
    useEffect(()=>{
        if(projectData){
        if(projectData.MovimentoLavoura){
        setMovimentoLavoura(projectData.MovimentoLavoura);
    }}},[])

    useEffect(()=>{
        fetch("http://localhost:5028/api/TipoMovimento",{
            method:"GET" ,
            headers:{'Content-Type': 'application/json',
          },
         })
         .then((resp) => resp.json())
         .then((data) => {setTipoMovimento(data); console.log(data); })
         .catch((err) => console.log(err))        
    }, [])

    useEffect(()=>{
        fetch("http://localhost:5028/api/Lavoura",{
            method:"GET" ,
            headers:{'Content-Type': 'application/json',
          },
         })
         .then((resp) => resp.json())
         .then((data) => {setLavoura(data); console.log(data); })
         .catch((err) => console.log(err))        
    }, [])    

    useEffect(()=>{
        fetch("http://localhost:5028/api/Safra",{
            method:"GET" ,
            headers:{'Content-Type': 'application/json',
          },
         })
         .then((resp) => resp.json())
         .then((data) => {setSafra(data); console.log(data); })
         .catch((err) => console.log(err))        
    }, [])      

    const submit = (e) => {
        e.preventDefault()
        console.log('submit projectform')
        console.log(Movimento)   
        Movimento.MovimentoLavoura = MovimentoLavoura
        handleSubmit(Movimento)

    }

    function handleChange(e){
        setMovimento({...Movimento, [e.target.name]: e.target.value})
    }

    function handleCategory(e){
        setMovimento({
            ...Movimento,
            TipoMovimentoId: e.target.value,
            TipoMovimento:{
                Id: e.target.value,
                Descricao: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    function handleMovimentoLavoura(e){
        setMovimentoLavoura({
            ...MovimentoLavoura, 
                LavouraId: e.target.value,
                Lavoura:{
                    Id: e.target.value,
                    Descricao: e.target.options[e.target.selectedIndex].text,                               
            },
        })
    }
    
    function handleMovimentoLavouraSafra(e){
        setMovimentoLavoura({
            ...MovimentoLavoura, 
                SafraId: e.target.value,
                Safra:{
                    Id: e.target.value,
                    Descricao: e.target.options[e.target.selectedIndex].text,                               
            },
        })
    }      

    function handleCamposMovimentoLavoura(e){
        setMovimentoLavoura({
            ... MovimentoLavoura, [e.target.name]: e.target.value
        })
    }    

    return(
    <form onSubmit={submit} className={styles.form}>
        <Input 
            type="text" 
            text="Descri????o"
            name="Observacao"
            placeholder="Insira a descri????o do movimento"
            handleOnChange={handleChange}
            value={Movimento.Observacao ? Movimento.Observacao: ''}
        />
        <Input 
            type="number" 
            text="Numero"
            name="Numero"            
            placeholder="Insira o n??mero identificador"
            handleOnChange={handleChange}
            value={Movimento.Numero ? Movimento.Numero: ''}
        />            
        <Select 
            name="TipoMovimentoId" 
            text="Selecione o Tipo" 
            options={TipoMovimento} 
            handleOnChange={handleCategory}
            value={Movimento.TipoMovimento ? Movimento.TipoMovimento.Id : ''}
        />
        <Select 
            name="LavouraId" 
            text="Selecione a Lavoura" 
            options={Lavoura} 
            handleOnChange={handleMovimentoLavoura}
            value={MovimentoLavoura ? MovimentoLavoura.LavouraId : ''}
        />        
        <Select 
            name="SafraId" 
            text="Selecione a Safra" 
            options={Safra} 
            handleOnChange={handleMovimentoLavouraSafra}
            value={MovimentoLavoura ? MovimentoLavoura.SafraId : ''}
    />        
        <Input 
            type="text" 
            text="Observa????es"
            name="Observacao"
            placeholder="Insira observa????es adicionais da lavoura"
            handleOnChange={handleCamposMovimentoLavoura}
            value={MovimentoLavoura.Observacao ? MovimentoLavoura.Observacao : ''}
        />        
        <Input 
            type="datetime-local" 
            text="Data"
            name="DataRealizado"            
            placeholder="Informe uma Data"
            format="yyyy-mm-dd"
            handleOnChange={handleCamposMovimentoLavoura}
            value={MovimentoLavoura.DataRealizado ? MovimentoLavoura.DataRealizado : ''}
        />          
           
        <SubmitButton text={btnText}/>
         
    </form> 
)}

export default ProjectForm