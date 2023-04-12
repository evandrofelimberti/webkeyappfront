import React, { useState, useEffect, useMemo, useRef} from "react";
import ProductService from "../../services/ProductService";
import { useTable } from "react-table";
import { Link } from 'react-router-dom'
import Product from "./Product";
import { Route , withRouter} from 'react-router-dom';
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import styles from './ProductsList.module.css'
import Input from '../form/Input'
import LinkButton from "../layout/LinkButton";

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
  
    const recuperarProdutosFiltro = () => {
      ProductService.findByNome(searchName)
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
   
    {/*const findByName = () => {
      ProductService.findByNome(searchName)
        .then((response) => {
          setProdutos(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };*/}

   
    const findByName = () => {
      if (searchName !== ''){
        recuperarProdutosFiltro();
      } else {
        recuperarProdutos();
      }
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
            Header: "Código",
            accessor: "Codigo",
            maxWidth: 80,
            minWidth:80,
            width: 80,
          
          },           
          {
            Header: "Nome",
            accessor: "Nome",
            maxWidth: 400,
            minWidth:200,
            width:250,
          },         
          {
            Header: "Descrição",
            accessor: "Descricao",
            maxWidth: 400,
            minWidth:300,
            width:350,
          },
          {
            Header: "Saldo",
            accessor: "Saldo",
            maxWidth: 150,
            minWidth:100,
            width:110,
          },
          {
            Header: "Unidade",
            accessor: "Unidade.Descricao",
            maxWidth: 110,
            minWidth:100,
            width:100,
            
          },          
          {
            Header: "Tipo Produto",
            accessor: "TipoProduto.Descricao",
            maxWidth: 150,
            minWidth:150,
            width:150,
          },
          {
            Header: "Ação",
            accessor: "actions",
            maxWidth: 210,
            minWidth:210,
            width:210,
            Cell: props => {
              const rowIdx = props.cell.row.original['Id'];
              return (
                <div >

                <Link className={styles.button} to={`/product/${rowIdx}`}> 
                    <BsPencil /> Editar
                </Link>


                <button className={styles.button}  onClick ={() => {
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
        <div >
          <div >
            <div >
            {/*<Input 
            type="text" 
            placeholder="Pesquisar pelo Nome"
            handleOnChange={onChangeSearchName}
            value={searchName}
            />*/}               
              <input className={styles.input}
                type="text"
                placeholder="Pesquisar pelo Nome"
                value={searchName}
                onChange={onChangeSearchName}
              />
              <div >
                <button className={styles.buttonPesquisa}
                  type="button"
                  onClick={findByName}
                >
                  Pesquisar
                </button>
                
                <Link className={styles.btnLink} to="/productadd"> Cadastrar Produto</Link>                

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