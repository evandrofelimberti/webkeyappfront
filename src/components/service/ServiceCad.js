import styles from './ServiceCard.module.css'
import {BsFillTrashFill} from 'react-icons/bs'
import { numberFormat } from '../form/numberFormat';

function ServiceCad({id, Descricao, Quantidade, Produto, Valor, Total,  handleRemove}){
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={styles.project_card}>
            <h4>{Produto}</h4>
           {/* <p ><span>{Descricao}</span></p>*/}
            <p >Quantidade: {new Intl.NumberFormat('pt-BR', { currency: 'BRL' }).format(Quantidade)} </p>
            <p >Valor: {numberFormat(Valor)} </p>
            <p ><span>Total: {numberFormat(Total)} </span> </p>            
            <div className={styles.project_card_actions}>
                <button onClick={remove} >
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCad