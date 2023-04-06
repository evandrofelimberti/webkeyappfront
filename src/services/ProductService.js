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

const findByName = (title) => {
  return http.get(`/tutorials?title=${title}`);
};

const ProductService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};

export default ProductService;