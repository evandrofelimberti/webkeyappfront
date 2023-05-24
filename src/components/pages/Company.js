import { useState, useEffect} from 'react'
import { numberFormat } from '../form/numberFormat';
import styles from './Company.module.css'
import Select from '../form/Select'


function Company(){

    const [movimento, setMovimentos] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [colheita, setColheita] = useState([]);
    const [Lavoura, setLavoura] = useState([])
    const [Safra, setSafra] = useState([])    
    const [MovimentoLavoura, setMovimentoLavoura] = useState({})    

    function pesquisarMovimento(){
              fetch(process.env.REACT_APP_URL_API_WEB_APP_KEY +`/Movimento/LavouraSafra?idSafra=${MovimentoLavoura.SafraId}&idLavoura=${MovimentoLavoura.LavouraId}`,{
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
        }

    useEffect(()=>{
        fetch(process.env.REACT_APP_URL_API_WEB_APP_KEY +`/Lavoura`,{
            method:"GET" ,
            headers:{'Content-Type': 'application/json',
          },
         })
         .then((resp) => resp.json())
         .then((data) => {setLavoura(data); console.log(data); })
         .catch((err) => console.log(err))        
    }, [])    

    useEffect(()=>{
        fetch(process.env.REACT_APP_URL_API_WEB_APP_KEY +`/Safra`,{
            method:"GET" ,
            headers:{'Content-Type': 'application/json',
          },
         })
         .then((resp) => resp.json())
         .then((data) => {setSafra(data); console.log(data); })
         .catch((err) => console.log(err))        
    }, [])     

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

    return( 
        <div className={styles.company_details}>
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

        <button className={styles.btn} onClick={pesquisarMovimento}> {"Pesquisar"} </button>        

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