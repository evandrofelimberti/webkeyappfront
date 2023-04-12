import React, { useState } from "react";
import ProductService from "../../services/ProductService";
import { Route , withRouter} from 'react-router-dom';
import Input from "../form/Input";
import styles from './ProductAdd.module.css';
import SubmitButton from "../form/SubmitButton";



const ProductAdd = () => {
  const initialProdutoState = {
    Id: null,
    Codigo: null,
    Nome: "",
    Descricao: "",
    UnidadeId: null,
    TipoProdutoId: null
  };
  const [produto, setProduto] = useState(initialProdutoState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduto({ ...produto, [name]: value });
  };

  const saveProduto = () => {
    var data = {
      Id: produto.Id,
      Codigo: produto.Codigo,
      Nome: produto.Nome,
      Descricao: produto.Descricao,
      UnidadeId: produto.UnidadeId,
      TipoProdutoId: produto.TipoProdutoId      
    };

    ProductService.create(data)
      .then(response => {
        setProduto({
          Id: response.data.Id,
          Codigo: response.data.Codigo,
          Nome: response.data.Nome,
          Descricao: response.data.Descricao,
          UnidadeId: response.data.UnidadeId,
          TipoProdutoId: response.data.TipoProdutoId
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProduto = () => {
    setProduto(initialProdutoState);
    setSubmitted(false);
  };

  return (
   // <form onSubmit={saveProduto} className={styles.form}>
  <div className={styles.form}>
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
                value={produto.Codigo ? produto.Codigo: ''}
            />
            <Input 
                type="text" 
                text="Nome"
                name="Nome"
                placeholder="Digite o Nome do produto "
                handleOnChange={handleInputChange}
                value={produto.Nome ? produto.Nome: ''}
            />
            <Input 
                type="text" 
                text="Descrição"
                name="Descricao"
                placeholder="Digite a Descrição do produto "
                handleOnChange={handleInputChange}
                value={produto.Descricao ? produto.Descricao: ''}
            />            
            <Input 
                  type="text" 
                  text="Unidade"
                  name="UnidadeId"
                  placeholder="Digite a Unidade de medida"                
                  handleOnChange={handleInputChange}
                  value={produto.UnidadeId ? produto.UnidadeId: ''}
              />   
            <Input 
                  type="text" 
                  text="Tipo Produto"
                  name="TipoProdutoId"
                  placeholder="Digite o Tipo do produto"                
                  handleOnChange={handleInputChange}
                  value={produto.TipoProdutoId ? produto.TipoProdutoId: ''}
              />              

          </div>      

        {/*  <SubmitButton text="Salvar"/>*/}

          <button onClick={saveProduto} className={styles.btn}>
            Salvar
          </button>
        </div>
      )}
    </div>

   // </form> 



  );
};

export default ProductAdd;