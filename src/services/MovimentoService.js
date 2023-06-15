import http from "../http-common";

const get = (id) => {
  return http.get(`/movimento/${id}`);
};

const create = (data) => {
  return http.post("/movimento", data);
};

const update = (id, data) => {
  return http.put(`/movimento/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/movimento/${id}`);
};

const findByNome = (param) => {
  return http.get("/movimento/Filtro", {params: param});   
};


const MovimentoService = {
  get,
  create,
  update,
  remove,
  findByNome
};

export default MovimentoService;