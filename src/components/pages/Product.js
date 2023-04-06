import React, { useState, useEffect } from "react";
import ProductService from "../../services/ProductService";


const Product = props => {
    const initialProdutoState = {
        Id: null,
        Nome: "",
        Descricao: "",
        UnidadeId: null,
        TipoProdutoId: null
      };
  const [recuperarProduto, setRecuperarProduto] = useState(initialProdutoState);
  const [message, setMessage] = useState("");

  const getTutorial = id => {
    ProductService.get(id)
      .then(response => {
        setRecuperarProduto(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRecuperarProduto({ ...recuperarProduto, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      Id: recuperarProduto.Id,
      Nome: recuperarProduto.Nome,
      Descricao: recuperarProduto.Descricao,
      UnidadeId: recuperarProduto.UnidadeId,      
      TipoProdutoId: recuperarProduto.TipoProdutoId
    };

    ProductService.update(recuperarProduto.Id, data)
      .then(response => {
        setRecuperarProduto({ ...recuperarProduto, published: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateProduto = () => {
    ProductService.update(recuperarProduto.Id, recuperarProduto)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProduto = () => {
    ProductService.remove(recuperarProduto.Id)
      .then(response => {
        console.log(response.data);
        props.history.push("/products");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {recuperarProduto ? (
        <div className="edit-form">
          <h4>Produto</h4>
          <form>
            <div className="form-group">
              <label htmlFor="Nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="Nome"
                name="Nome"
                value={recuperarProduto.Nome}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Descricao">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="Descricao"
                name="Descricao"
                value={recuperarProduto.Descricao}
                onChange={handleInputChange}
              />
            </div>

           {/* <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {recuperarProduto.published ? "Published" : "Pending"}
      </div>*/}
          </form>

         {/* {recuperarProduto.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}*/}

          <button className="badge badge-danger mr-2" onClick={deleteProduto}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateProduto}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Product;