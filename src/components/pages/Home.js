import styles from './Home.module.css'
import LinkButton from '../layout/LinkButton'
import savings from '../../img/savings.svg'
import { useState, useEffect} from 'react'

function Home(){
    const [nomeTitulo, setNomeTitulo] = useState("Costs")    
    const [descricaoTitulo, setDescricaoTitulo] = useState("Comece a gerenciar sua Lavoura agora mesmo!")        
    var tipoFront = "lavoura";
    useEffect(()=>{
        if(tipoFront==="estoque"){
            setNomeTitulo("Costs");
            setDescricaoTitulo("Comece a gerenciar seu estoque agora mesmo! ");
        }
    },[])
 

    return (
            <section className={styles.home_container} media="screen">
                <h1>
                    Bem-vindo ao <span>{nomeTitulo}</span>
                </h1>
                <p>{descricaoTitulo}</p>
                <LinkButton to="/newproject" text="Lançar Movimentação" />
                <img src={savings} alt='Costs' />
            </section>       
    )
}

export default Home