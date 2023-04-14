import http from "../http-common";

const getAll = () => {
  return http.get("/produto");
};

const get = (id) => {
  return http.get(`/produto/${id}`);
};

const create = (data) => {
  return http.post("/produto", data);
};

const update = (id, data) => {
  return http.put(`/produto/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/produto/${id}`);
};

const findByNome = (nome) => {
  return http.get(`/produto/Filtro?nome=${nome}`);   
};

const getAllUnidade = () => {
  return http.get("/unidade");
};

const getAllTipoProduto = () => {
  return http.get("/tipoproduto");
};

const ProductService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByNome,
  getAllUnidade,
  getAllTipoProduto
};

export default ProductService;