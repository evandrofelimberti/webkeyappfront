import React, { useState } from "react";
import ProductService from "../../services/ProductService";
import styles from './Product.module.css'


const ProductAdd = () => {
  const initialProdutoState = {
    Id: null,
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
      Nome: produto.Nome,
      Descricao: produto.Descricao
    };

    ProductService.create(data)
      .then(response => {
        setProduto({
          Id: response.data.Id,
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
            <label htmlFor="title">Nome</label>
            <input
              type="text"
              className="form-control"
              id="Nome"
              required
              value={produto.Nome}
              onChange={handleInputChange}
              name="Nome"
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