import React, { useState, useEffect, useMemo, useRef} from "react";
import ProductService from "../../services/ProductService";
import { useTable } from "react-table";
import { Link } from 'react-router-dom'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import styles from './ProductsList.module.css'
import Message from '../layout/Message'
import { numberFormat } from '../form/numberFormat';

const ProductsList = (props) => {
    const [produtos, setProdutos] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [message, setMessage] = useState();
    const [type, setType] = useState();
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
     
    const findByName = () => {
      if (searchName !== ''){
        recuperarProdutosFiltro();
      } else {
        recuperarProdutos();
      }
    };    

    function deleteProduto(rowIndex){
      { window.confirm( 'Deseja deletar o produto?', ) && 
  
      ProductService.remove(rowIndex)
      .then((response) => {
        setMessage('Produto Removido!');
        setType('success');                 
        window.location.href = '/products';         
          //<Link to={`/products`}> </Link>            
      })
      .catch((e) => {
        setMessage("Erro ao deletar o produto Id " + rowIndex + "\n" + e.response.data)
        setType('error')                    
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
            Header: "Unidade",
            accessor: "Unidade.Descricao",
            maxWidth: 110,
            minWidth:100,
            width:100,
            
          },            
          {
            Header: "Saldo",
            accessor: "ProdutoSaldo.ValorSaldo",
            maxWidth: 150,
            minWidth:100,
            width:110,
            Cell: props =>{
              return(
              <>
                {new Intl.NumberFormat('pt-BR', { currency: 'BRL', minimumFractionDigits: 2  }).format(props.value)} 
              </>
              )
            }           
          },
          {
            Header: "Preço Venda",
            accessor: "ProdutoSaldo.ValorVenda",
            maxWidth: 150,
            minWidth:100,
            width:110,
            Cell: props =>{
              return(
              <> 
              {numberFormat(props.value)}
              </>
              )
            }           
          },          
          {
            Header: "Custo Compra",
            accessor: "ProdutoSaldo.ValorCompra",
            maxWidth: 150,
            minWidth:100,
            width:110,
            Cell: props =>{
              return(
              <>
                {new Intl.NumberFormat('pt-BR', { currency: 'BRL', minimumFractionDigits: 2  }).format(props.value)} 
              </>
              )
            }           
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
                  deleteProduto(rowIdx)
                    }}> <BsFillTrashFill /> Excluir </button>
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
        <div className={styles.project_details}>
          <div >
            {message && <Message type={type} msg={message} /> }                        
            <div >              
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
          <div >
            <table
             
              {...getTableProps()}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps({style:{
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,                        
                        width:column.width,
                        fontSize:17
                        }})}>
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
                            width:cell.column.width,
                            type: cell.column.type,
                            fontSize: 17,
                          }
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