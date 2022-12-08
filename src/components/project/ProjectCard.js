import styles from './ProjectCard.module.css'

import { Link } from 'react-router-dom'

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

import { numberFormat } from '../form/numberFormat';

function ProjectCard({key, id, datainclusao, numero, observacao, itens, handleRemove, total}){
    const formatdate = new Date(datainclusao).toLocaleString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "2-digit"
      });

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={styles.project_card}>
            <h4>{observacao}</h4>
             <p><span>Data: </span>{formatdate}</p>
            <p><span>Número: </span>{numero}</p>       
            <p><span>Total: </span>{numberFormat(total)}</p>  
            <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`}> 
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>

        </div>
    )
}

export default ProjectCard