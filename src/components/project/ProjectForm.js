import {useEffect, useState} from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit, btnText, projectData}){

    const [TipoMovimento, setTipoMovimento] = useState([])
    const [Movimento, setMovimento] = useState(projectData || {})

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

    const submit = (e) => {
        e.preventDefault()
        console.log('submit projectform')
        console.log(Movimento)
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

    return(
    <form onSubmit={submit} className={styles.form}>
        <Input 
            type="text" 
            text="Descrição"
            name="Observacao"
            placeholder="Insira o nome do projeto"
            handleOnChange={handleChange}
            value={Movimento.Observacao ? Movimento.Observacao: ''}
        />
        <Input 
            type="number" 
            text="Numero"
            name="Numero"            
            placeholder="Insira o orçamento total"
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
        <SubmitButton text={btnText}/>
         
    </form> 
)}

export default ProjectForm