import React, { useState, useEffect} from "react";
import ProductService from "../../services/ProductService";
import {useParams} from 'react-router-dom'
import Input from "./Input";
import styles from './ProdutoForm.module.css';
import Select from "./Select";
import Message from "../layout/Message";
import InputNumeric from "./InputNumeric";



const ProdutoForm = ({novoProduto}) => {  
  const { id } = useParams();

  const initialProdutoState = {
    Id: null,
    Nome: "",
    Descricao: "",
    UnidadeId: null,
    Unidade: null,
    TipoProdutoId: null,
    TipoProduto: null,
  };

  const [recuperarProduto, setRecuperarProduto] = useState(initialProdutoState);
  const [recuperarUnidade, setRecuperarUnidade] = useState([]);
  const [recuperarTipoProduto, setRecuperarTipoProduto] = useState([]);    
  const [submitted, setSubmitted] = useState(false);  
  const [message, setMessage] = useState("");  
  const [pendenciaProduto, setPendenciaProduto] = useState(false);
  const [type, setType] = useState()  
  

  const getProduto = Id => {
    ProductService.get(Id)
      .then(response => {
        setRecuperarProduto(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };  

  const getUnidades = () => {
    ProductService.getAllUnidade()
      .then(response => {
        setRecuperarUnidade(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getTipoProdutos = () => {
    ProductService.getAllTipoProduto()
      .then(response => {
        setRecuperarTipoProduto(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };  

  useEffect(() => {
    getProduto(id);
  }, [id]);

  useEffect(() => {
    getUnidades();
  }, []);

  useEffect(() => {
    getTipoProdutos();
  }, []);  

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRecuperarProduto({ ...recuperarProduto, [name]: value });
    setMessage(""); 
    setPendenciaProduto(false);   
  };

  const handleInputChangeSelectUnidade = (event) => {
    const { name, value } = event.target;
    setRecuperarProduto({ ...recuperarProduto, [name]: value,
                                Unidade: {
                                Id: event.target.value,
                                Descricao: event.target.options[event.target.selectedIndex].text}, 
                         });
    setMessage("");                             
    setPendenciaProduto(false);
  };

  const handleInputChangeSelectTipoProduto = (event) => {
    const { name, value } = event.target;
    setRecuperarProduto({ ...recuperarProduto, [name]: value,
                                TipoProduto: {
                                Id: event.target.value,
                                Descricao: event.target.options[event.target.selectedIndex].text}, 
                         });
    setMessage("");  
    setPendenciaProduto(false);                       
  };  

  const saveProduto = () => {

  validarProduto();
   if (pendenciaProduto){

    return;
   }

    var data = {
      Id: recuperarProduto.Id,
      Codigo: recuperarProduto.Codigo,
      Nome: recuperarProduto.Nome,
      Descricao: recuperarProduto.Descricao,
      UnidadeId: recuperarProduto.UnidadeId,
      Unidade: recuperarProduto.Unidade,
      TipoProdutoId: recuperarProduto.TipoProdutoId,
      TipoProduto:recuperarProduto.TipoProduto,     
    };

    ProductService.create(data)
      .then(response => {
        setRecuperarProduto({
          Id: response.data.Id,
          Codigo: response.data.Codigo,
          Nome: response.data.Nome,
          Descricao: response.data.Descricao,
          UnidadeId: response.data.UnidadeId,
          Unidade: response.data.Unidade,
          TipoProdutoId: response.data.TipoProdutoId,
          TipoProduto: response.data.TipoProduto,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProduto = () => {
    setRecuperarProduto(initialProdutoState);
    setSubmitted(false);
  };  

const validarProduto = () =>{
  if(recuperarProduto.TipoProdutoId === "Selecione uma opção"){
    setMessage("Tipo produto não informado!");
    setType("error");
    setPendenciaProduto(true);
  }
  if(recuperarProduto.UnidadeId === "Selecione uma opção"){
    setMessage("Unidade não informada!");
    setType("error");
    setPendenciaProduto(true);
  }  
}

  const updateProduto = () => {
    validarProduto();
    if (!pendenciaProduto){
    ProductService.update(recuperarProduto.Id, recuperarProduto)
      .then(response => {
        console.log(response.data);
        setMessage("Produto Atualizado!");
      })
      .catch(e => {
        console.log(e);
        //setMessage(e.response.data);
      });
    }
  };

  const deleteProduto = () => {

    { window.confirm( 'Deseja deletar o produto?', ) &&
    ProductService.remove(recuperarProduto.Id)
      .then(response => {
        console.log(response.data);
        setMessage("Produto deletado!");
        window.location.href = '/products';  
      })
      .catch(e => {
        setMessage(e.response.data);
        console.log(e);
      });     
    }
  };  

  return (
   <div className={styles.form}>
      {message && <Message type={type} msg={message} /> }      

       {submitted ? (
         <div>
           <h4>Produto Cadastrado com sucesso!</h4>
           
           <button onClick={newProduto} className={styles.btn}>
             Adicionar Novo Produto
           </button>          
         </div>
       ) : (
         <div>                      
           <div >
             <Input 
                 type="text" 
                 text="Código"
                 name="Codigo"
                 placeholder="Código do produto "
                 handleOnChange={handleInputChange}
                 value={recuperarProduto.Codigo ? recuperarProduto.Codigo: ''}
             />
             <Input 
                 type="text" 
                 text="Nome"
                 name="Nome"
                 placeholder="Digite o Nome do produto "
                 handleOnChange={handleInputChange}
                 value={recuperarProduto.Nome ? recuperarProduto.Nome: ''}
             />
             <Input 
                 type="text" 
                 text="Descrição"
                 name="Descricao"
                 placeholder="Digite a Descrição do produto "
                 handleOnChange={handleInputChange}
                 value={recuperarProduto.Descricao ? recuperarProduto.Descricao: ''}
             />                           
            <Select 
                name="UnidadeId" 
                text="Unidade" 
                options={recuperarUnidade} 
                handleOnChange={handleInputChangeSelectUnidade}
                value={recuperarProduto.Unidade ? recuperarProduto.UnidadeId : ''}
            />
            <Select 
                name="TipoProdutoId" 
                text="Tipo Produto" 
                options={recuperarTipoProduto} 
                handleOnChange={handleInputChangeSelectTipoProduto}
                value={recuperarProduto.TipoProduto ? recuperarProduto.TipoProdutoId : ''}
            />             
       </div>      
          {novoProduto ? (
            <button onClick={saveProduto} className={styles.btn}>
            Salvar
            </button>
          ) :(
              <div>
                <button onClick={deleteProduto} className={styles.btn}>
                            Deletar
                </button>
                <button type="submit"
                        onClick={updateProduto}
                        className={styles.btn}>
                            Atualizar
                </button>
                <p>{message}</p>
              </div>
          )}
         </div>
       )}
     </div>
   );
 };
export default ProdutoForm;