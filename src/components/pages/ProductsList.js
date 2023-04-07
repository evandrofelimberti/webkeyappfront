import React, { useState, useEffect, useMemo, useRef} from "react";
import ProductService from "../../services/ProductService";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import Product from "./Product";

const ProductsList = (props) => {
    const [produtos, setProdutos] = useState([]);
    const [searchName, setSearchName] = useState("");
    const produtosRef = useRef();
  
    produtosRef.current = produtos;
  
    useEffect(() => {
      recuperarProdutos();
    }, []);
  
    const onChangeSearchName = (e) => {
      const searchName = e.target.value;
      setSearchName(searchName);
    };
  
    const recuperarProdutos = () => {
      ProductService.getAll()
        .then((response) => {
          setProdutos(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const refreshList = () => {
      recuperarProdutos();
    };
   
    const findByName = () => {
      ProductService.findByTitle(searchName)
        .then((response) => {
          setProdutos(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const openProduto = (rowIndex) => {
      const Id = produtosRef.current[rowIndex].Id;       
      props.history.push("/product/" + Id);
    };
  
    const deleteProduto = (rowIndex) => {
      const Id = produtosRef.current[rowIndex].Id;
  
      ProductService.remove(Id)
        .then((response) => {
          props.history.push("/products");
  
          let newProdutos = [...produtosRef.current];
          newProdutos.splice(rowIndex, 1);
  
          setProdutos(newProdutos);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    
    const columns = useMemo(
        () => [
          {
            Header: "Id",
            accessor: "Id",
          },           
          {
            Header: "Codigo",
            accessor: "Codigo",
          },           
          {
            Header: "Nome",
            accessor: "Nome",
          },
          {
            Header: "Descrição",
            accessor: "Descricao",
          },

          {
            Header: "UnidadeId",
            accessor: "UnidadeId",
          },          
          {
            Header: "TipoProdutoId",
            accessor: "TipoProdutoId",
          },
          {
            Header: "Ação",
            accessor: "actions",
            Cell: props => {
              const rowIdx = props.cell.row.id;
              return (
                <div>
                  <span onClick={() => openProduto(rowIdx)}>
                    <i className="far fa-edit action mr-2"></i>
                  </span>
    
                  <span onClick={() => deleteProduto(rowIdx)}>
                    <i className="fas fa-trash action"></i>
                  </span>
                </div>
              );
            },
          },
        ],
        []
      );
    
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data: produtos,
      });
    
      return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchName}
                onChange={onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByName}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-12 list">
            <table
              className="table table-striped table-bordered"
              {...getTableProps()}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
    
        </div>
      );
    };
    
    export default ProductsList;