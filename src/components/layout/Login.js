import { useNavigate } from "react-router-dom";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from './Login.module.css'

function Login(){
    return(
    <div >

        <Input 
            type="text" 
            text="Usuario"
            name="Nome"
            placeholder="Insira o usuário"
            //handleOnChange={handleCamposMovimentoLavoura}
            //value=""
        
        />        
        <Input 
            type="password"
            text="Senha"
            name="Senha"            
            placeholder="Informe uma senha"
            //handleOnChange={handleCamposMovimentoLavoura}
            //value=""
        
        />          
           
        <SubmitButton text={"Login"}/>

    </div> 
    )
}

export default Login