import React, { useState } from "react";
import ProductService from "../../services/ProductService";
import styles from './Product.module.css'
import { Route , withRouter} from 'react-router-dom';


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
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newProduto}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="Codigo">Codigo</label>
            <input
              type="text"
              className="form-control"
              id="Codigo"
              required
              value={produto.Codigo}
              onChange={handleInputChange}
              name="Codigo"
              autocomplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Nome">Nome</label>
            <input
              type="text"
              className="form-control"
              id="Nome"
              required
              value={produto.Nome}
              onChange={handleInputChange}
              name="Nome"
              autocomplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Descricao">Descricao</label>
            <input
              type="text"
              className="form-control"
              id="Descricao"
              required
              value={produto.Descricao}
              onChange={handleInputChange}
              name="Descricao"
              autocomplete="off"
            />
          </div>          
          <div className="form-group">
            <label htmlFor="Unidade">Unidade</label>
            <input
              type="text"
              className="form-control"
              id="UnidadeId"
              required
              value={produto.UnidadeId}
              onChange={handleInputChange}
              name="UnidadeId"
              autocomplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="TipoProduto">Tipo Produto</label>
            <input
              type="text"
              className="form-control"
              id="TipoProdutoId"
              required
              value={produto.TipoProdutoId}
              onChange={handleInputChange}
              name="TipoProdutoId"
              autocomplete="off"
            />
          </div>

          <button onClick={saveProduto} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductAdd;