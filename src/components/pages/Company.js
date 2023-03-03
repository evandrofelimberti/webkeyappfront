import { useState, useEffect} from 'react'
import { numberFormat } from '../form/numberFormat';
import Container from '../layout/Container'
import styles from './Company.module.css'

function Company(){

    const [movimento, setMovimentos] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [colheita, setColheita] = useState([]);

    useEffect(() => {
        setTimeout(
           async () => {           
             await fetch("http://localhost:5028/api/Movimento/LavouraSafra?idSafra=1&idLavoura=1",{
                    method:"GET" ,     
                    mode:"cors",                                  
                    headers:{
                        'Accept': 'application/json;', 
                        'Content-Type': 'application/json; charset=utf-8'                    
                  },                  
                  credentials:'same-origin'
                 })
                 .then((resp) => resp.json())
                 .then((data) => {                    
                    console.log(data)
                    setMovimentos(data)
                    setDespesas(data.Despesas)
                    setColheita(data.Colheita)
                })
                 .catch((err) => console.log(err)) 
            }, 1000)

    }, []) 

    return( 
        <div className={styles.company_details}>
            <h1>Resultado Safra</h1>
            <p><span>Lucro</span>: {numberFormat(movimento.Lucro)} </p>            
            <p><span>Área ha</span>: {new Intl.NumberFormat('pt-BR', { currency: 'BRL' }).format( movimento.AreaHa)} </p>            
            <p><span>Média Sacas/ha</span>: {new Intl.NumberFormat('pt-BR', { currency: 'BRL' }).format( movimento.MediaSacasHa)} </p>            
            
           <h1>Informações da Colheita</h1>
           
            {colheita && colheita.length > 0 && colheita.map((data) =>(
                        <div >                    
                            <p><span>Lavoura:</span> {data.MovimentoLavoura.Lavoura.Descricao} 
                                - Área(ha): {data.MovimentoLavoura.Lavoura.AreaHa}
                            </p>                            
                            <p><span>Descrição: </span>{data.Observacao}</p> 
                            <p><span>Data: </span> 
                             {(new Date(data.MovimentoLavoura.DataRealizado).toLocaleString("pt-BR", {
                                year: "numeric",
                                month: "long",
                                day: "2-digit" }))} </p>
                        </div>                   
                    ))} 
                     
           <h1>Informações de Despesas</h1>
            <div>
                {despesas && despesas.length > 0 && despesas.map((data) =>(
                    <div>
                        <p>{data.Observacao}  | Custo: {new Intl.NumberFormat('pt-BR', { currency: 'BRL' }).format( data.Total)} </p>                            
                            
                            {/*data.Itens && data.Itens.length > 0 && data.Itens.map((itens) =>(
                                <div>                                   
                                    <p>
                                        {itens.Descricao}  | 
                                        {new Intl.NumberFormat('pt-BR', { currency: 'BRL' }).format( itens.Quantidade) }  | 
                                        {new Intl.NumberFormat('pt-BR', { currency: 'BRL' }).format( itens.Valor) }  | 
                                        {new Intl.NumberFormat('pt-BR', { currency: 'BRL' }).format( itens.Total) } 
                                    </p>
                                </div>
                            ))*/}
                            <div className="app-container">
                            <form >
                                <table>
                                <thead>
                                    <tr>
                                    <th>Descrição</th>
                                    <th>Quantidade</th>
                                    <th>Valor</th>
                                    <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.Itens && data.Itens.length > 0 && data.Itens.map((itens) =>(
                                        <tr>
                                            <td>{itens.Descricao}  </td> 
                                            <td>{new Intl.NumberFormat('pt-BR', { currency: 'BRL' }).format( itens.Quantidade) }  </td> 
                                            <td>{new Intl.NumberFormat('pt-BR', { currency: 'BRL' }).format( itens.Valor) }  </td> 
                                            <td>{new Intl.NumberFormat('pt-BR', { currency: 'BRL' }).format( itens.Total) }  </td>                  
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                            </form>
                            </div>
                    </div>      
                ))}
            </div>                
        </div>
    )

}

export default Company