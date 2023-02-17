import { useNavigate } from "react-router-dom";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from './Login.module.css'
import React, { useState } from 'react';


async function loginUser(credentials) {
    return fetch('https://localhost:7028/api/Usuario/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

function Login({ setToken }){
    const [nome, setNome] = useState();
    const [senha, setSenha] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          nome,
          senha
        });
        setToken(token);
      }    

    return(
<div >
<form onSubmit={handleSubmit}>
        <Input 
            type="text" 
            text="Usuario"
            name="nome"
            placeholder="Insira o usuário"
            handleOnChange={e => setNome(e.target.value)}        
        />        
        <Input 
            type="password"
            text="Senha"
            name="Senha"            
            placeholder="Informe uma senha"
            handleOnChange={e => setSenha(e.target.value)}
        
        />                     
    <SubmitButton text={"Login"}/>      
    </form>
    </div> 

  )   
}

export default Login