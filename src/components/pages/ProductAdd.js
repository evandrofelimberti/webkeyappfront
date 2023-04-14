import styles from './ProductAdd.module.css';
import ProdutoForm from "../form/ProdutoForm";

const ProductAdd = () => {
  return (
  <div className={styles.form}>
        <ProdutoForm novoProduto = {true}>
        </ProdutoForm>  
  </div>
  );
};

export default ProductAdd;