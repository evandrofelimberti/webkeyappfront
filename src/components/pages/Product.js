import React, { useState, useEffect } from "react";
import ProductService from "../../services/ProductService";
import { useParams } from "react-router-dom";

const Product = props => {
  const { id } = useParams();
    
    const initialProdutoState = {
        Id: null,
        Nome: "",
        Descricao: "",
        UnidadeId: null,
        TipoProdutoId: null
      };
  const [recuperarProduto, setRecuperarProduto] = useState(initialProdutoState);
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

  useEffect(() => {
    getProduto(id);
// getProduto(this.props.match.params.id);    
//}, [this.props.match.params.id]);
  }, [id]);

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
              <label htmlFor="Codigo">Codigo</label>
              <input
                type="text"
                className="form-control"
                id="Codigo"
                name="Codigo"
                value={recuperarProduto.Codigo}
                onChange={handleInputChange}
              />
            </div>            
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
            <div className="form-group">
              <label htmlFor="Unidade">Unidade</label>
              <input
                type="text"
                className="form-control"
                id="UnidadeId"
                name="UnidadeId"
                value={recuperarProduto.UnidadeId}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="TipoProduto">Tipo Produto</label>
              <input
                type="text"
                className="form-control"
                id="TipoProdutoId"
                name="TipoProdutoId"
                value={recuperarProduto.TipoProdutoId}
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

          <button onClick={deleteProduto}>
            Delete
          </button>

          <button
            type="submit"
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