import React, { useState, useEffect, useMemo, useRef} from "react";
import ProductService from "../../services/ProductService";
import { useTable } from "react-table";
import { Link } from 'react-router-dom'
import Product from "./Product";
import { Route , withRouter} from 'react-router-dom';
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import styles from './ProductsList.module.css'

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
      <Link to={`/product/${Id}`}> </Link>
    //  this.props.history.push("/product/" + Id);
    };
  


    function deleteProduto(rowIndex){   
      {
        ProductService.remove(rowIndex)
        .then((response) => {
            window.location.href = '/products';         
        })
        .catch((e) => {
          console.log(e);
        });
         }
    };
    
    const columns = useMemo(
        () => [          
          {
            Header: "Codigo",
            accessor: "Codigo",
            maxWidth: 60,
            minWidth:20,
            width:50,
          
          },           
          {
            Header: "Nome",
            accessor: "Nome",
            maxWidth: 300,
            minWidth:100,
            width:180,
          },
          {
            Header: "Descrição",
            accessor: "Descricao",
            maxWidth: 300,
            minWidth:100,
            width:250,
          },

          {
            Header: "UnidadeId",
            accessor: "UnidadeId",
            maxWidth: 80,
            minWidth:10,
            width:80,
            
          },          
          {
            Header: "TipoProdutoId",
            accessor: "TipoProdutoId",
            maxWidth: 100,
            minWidth:10,
            width:80,
          },
          {
            Header: "Ação",
            accessor: "actions",
            maxWidth: 100,
            minWidth:40,
            width:90,
            Cell: props => {
              const rowIdx = props.cell.row.original['Id'];
              return (

                <div >
                <button>
                <Link to={`/product/${rowIdx}`}> 
                    <BsPencil /> Editar
                </Link>
                </button>  

            <button onClick ={() => {

            ProductService.remove(rowIdx)
            .then((response) => {
                window.location.href = '/products';         
                //<Link to={`/products`}> </Link>            
            })
            .catch((e) => {
              console.log(e);
            });


              }}> <BsFillTrashFill /> Excluir </button>


              {/*  <button onClick={()=>{deleteProduto(rowIdx)}}>
                    <BsFillTrashFill /> Excluir
            </button>*/}
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
        data: produtos
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
                      <th {...column.getHeaderProps({style:{
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        width:column.width}})}>
                       <span>{column.render("Header")}</span> 
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
                          <td {...cell.getCellProps({
                            style:{minWidth: cell.column.minWidth,
                            width:cell.column.width}
                          })}
                          >
                            {cell.render("Cell")}
                          </td>
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