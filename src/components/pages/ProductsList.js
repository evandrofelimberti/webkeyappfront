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
            width: 250,
          
          },           
          {
            Header: "Nome",
            accessor: "Nome",
            maxWidth: 450,
            minWidth:200,
            width:250,
          },         
          {
            Header: "Descrição",
            accessor: "Descricao",
            maxWidth: 450,
            minWidth:200,
            width:250,
          },
          {
            Header: "Unidade",
            accessor: "Unidade.Descricao",
            maxWidth: 110,
            minWidth:100,
            width:250,
            
          },            
          {
            Header: "Saldo",
            accessor: "ProdutoSaldo.ValorSaldo",
            maxWidth: 150,
            minWidth:100,
            width:250,
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
            width:250,
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
            width:250,
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
          <div className={styles.details_container}>
            {message && <Message type={type} msg={message} /> }                        
            <div class="flex"> 
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
            <table class="table-auto min-w-full border-collapse block md:table  "
             
              {...getTableProps()}
            >
              <thead class="block md:table-header-group">
                {headerGroups.map((headerGroup) => (
                  <tr class="border border-grey-500 md:border-solid block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative border-0"
                  {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th  class="bg-black-600 p-2 text-#ffbb33 font-bold md:border-solid md:border-grey-500 text-left block md:table-cell"
                      {...column.getHeaderProps({
                        style:{
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        width:column.width,
                        fontSize:16
                        }
                        })}>
                       <span>{column.render("Header")}</span> 
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody class="block md:table-row-group "
              {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr class="bg-#efefef block md:table-row border border-black"
                    {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td class="p-2 text-left block md:table-cell m-0.5"
                          {...cell.getCellProps({
                            style:{
                            minWidth: cell.column.minWidth,
                            width:cell.column.width,
                            type: cell.column.type,
                            fontSize: 16
                          }
                          })}
                          >
                             <span class="text-base text-left inline-block w-1/3 md:hidden font-bold ">{cell.render("Header")}</span> 
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