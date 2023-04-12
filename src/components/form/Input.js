import styles from './Input.module.css'

function Input({type, text, name, placeholder, handleOnChange, value, format}){
    return(
        <div className={styles.form_control} > 
            {name ? ( <label htmlFor={name}>{text}:</label> ) : (<></>)}        
            <input  
            type={type} 
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={handleOnChange}
            value={value}
            format={format}
            autocomplete="off"
            />
            
        </div>
    )
}

export default Input;
