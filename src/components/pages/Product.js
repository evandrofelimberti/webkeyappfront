import {useParams} from 'react-router-dom'
import styles from './ProductAdd.module.css';
import ProdutoForm from "../form/ProdutoForm";

const Product = props => {
  const { id } = useParams();    
  return (
    <div className={styles.form}>
      <ProdutoForm novoProduto = {false}>        
      </ProdutoForm>
    </div>
  );
};

export default Product;