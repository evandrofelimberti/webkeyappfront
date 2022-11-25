import styles from '../project/ProjectCard.module.css'

import { Link } from 'react-router-dom'

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function ServiceCad({id, Descricao, Quantidade, Produto, Valor, Total,  handleRemove}){
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={styles.project_card}>
            <h4>{Produto}</h4>
            <p ><span>{Descricao}</span></p>
            <p >Quantidade: {Quantidade}</p>
            <p >Valor: R$ {Valor}</p>
            <p ><span>Total: R$ {Total}</span> </p>            
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCad