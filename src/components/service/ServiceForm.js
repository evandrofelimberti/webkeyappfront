import styles from '../project/ProjectForm.module.css'
import {useEffect, useState} from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import Select from '../form/Select'
import InputNumeric from '../form/InputNumeric'

function ServiceForm({handleSubmit, btnText, projectData}){
    const [Itens, SetItens] = useState([])
    const [Produto, setProduto]= useState([])
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZXZhbmRybyIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTY3NTYyMjAxOSwiZXhwIjoxNjc1NzA4NDE5LCJpYXQiOjE2NzU2MjIwMTl9.9iw2ZchGAUSBGnNkdEYcm6mvP_kL45FRgSET8CbUKDY";  
      useEffect(()=>{
      fetch("http://localhost:5028/api/Produto",{
          method:"GET" ,
          headers:{'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
       })
       .then((resp) => resp.json())
       .then((data) => {setProduto(data); console.log(data); })
       .catch((err) => console.log(err))        
  }, [])


    function submit(e){
      e.preventDefault()
      projectData.Itens.push(Itens)
      handleSubmit(projectData)
    }

    function handleChange(e){
      SetItens({...Itens, [e.target.name]: e.target.value})
    }
  
  function handleProduto(e){
    SetItens({...Itens,
            Descricao: e.target.options[e.target.selectedIndex].text,
            ProdutoId: e.target.value,
            Produto:{
              Id: e.target.value,
              Descricao: e.target.options[e.target.selectedIndex].text,
            }
          })
  }

    return(
        <form onSubmit={submit} className={styles.form}>
          <Select 
              name="ProdutoId" 
              text="Selecione o Produto" 
              options={Produto} 
              handleOnChange={handleProduto}
              value={Itens.Produto ? Itens.Produto.Id : ''}
            />             
            <Input
              type={"text"}
              text="Descrição"
              name="Descricao"
              placeholder={"Insira a Descrição do Item"}
              handleOnChange={handleChange}
              value={Itens.Descricao ? Itens.Descricao : ''}
            />
            <InputNumeric
              text="Quantidade"
              name="Quantidade"
              placeholder={"Insira a Quantidade"}
              handleOnChange={handleChange}
            />              
            <InputNumeric
              text="Valor"
              name="Valor"
              placeholder={"Insira o Valor"}
              handleOnChange={handleChange}
            />              
            <SubmitButton text={btnText}/>      

        </form>
    )
}

export default ServiceForm