import React, { useState, useEffect } from "react";
import ProductService from "../../services/ProductService";
import {useParams} from 'react-router-dom'
import Input from "../form/Input";
import styles from './ProductAdd.module.css';
import Select from "../form/Select";


const Product = props => {
  const { id } = useParams();
    
    const initialProdutoState = {
        Id: null,
        Nome: "",
        Descricao: "",
        UnidadeId: null,
        TipoProdutoId: null
      };

    const initialUnidadeState = {
      Id: null,
      Descricao: "",
      Sigla: ""
    }  
  const [recuperarProduto, setRecuperarProduto] = useState(initialProdutoState);
  const [recuperarUnidade, setRecuperarUnidade] = useState(initialUnidadeState);
  const [message, setMessage] = useState("");

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

  const getAllUnidade = () => {
    ProductService.getAllUnidade()
      .then(response => {
        setRecuperarUnidade(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };  

  useEffect(() => {
    getProduto(id);
// getProduto(this.props.match.params.id);    
//}, [this.props.match.params.id]);
  }, [id]);

  useEffect(() => {
    getAllUnidade()
  });  

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRecuperarProduto({ ...recuperarProduto, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      Id: recuperarProduto.Id,
      Codigo: recuperarProduto.Codigo,      
      Nome: recuperarProduto.Nome,
      Descricao: recuperarProduto.Descricao,
      UnidadeId: recuperarProduto.UnidadeId,      
      TipoProdutoId: recuperarProduto.TipoProdutoId
    };

    ProductService.update(recuperarProduto.Id, data)
      .then(response => {
        setRecuperarProduto({ ...recuperarProduto, published: status });
        console.log(response.data);
        setMessage("Produto Atualizado!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateProduto = () => {
    ProductService.update(recuperarProduto.Id, recuperarProduto)
      .then(response => {
        console.log(response.data);
        setMessage("Produto Atualizado!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProduto = () => {
    ProductService.remove(recuperarProduto.Id)
      .then(response => {
        console.log(response.data);
        window.location.href = '/products';  
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className={styles.form}>
      {recuperarProduto ? (
        <div className="edit-form">
          <form>          
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

          <Input 
                type="text" 
                text="Unidade"
                name="UnidadeId"
                placeholder="Digite a Unidade de medida"                
                handleOnChange={handleInputChange}
                value={recuperarProduto.UnidadeId ? recuperarProduto.UnidadeId: ''}
      />   

           {/* <Select 
                name="UnidadeId" 
                text="Unidade" 
                options={recuperarUnidade} 
                handleOnChange={handleInputChange}
                value={recuperarProduto.UnidadeId ? recuperarProduto.Unidade.Id : ''}
      />*/}
          <Input 
                type="text" 
                text="Tipo Produto"
                name="TipoProdutoId"
                placeholder="Digite o Tipo do produto"                
                handleOnChange={handleInputChange}
                value={recuperarProduto.TipoProdutoId ? recuperarProduto.TipoProdutoId: ''}
            />                       
          </form>

          <button onClick={deleteProduto} className={styles.btn}>
            Deletar
          </button>

          <button
            type="submit"
            onClick={updateProduto}
            className={styles.btn}
          >
            Atualizar
          </button>

          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Clique em Produtos</p>
        </div>
      )}
    </div>
  );
};

export default Product;