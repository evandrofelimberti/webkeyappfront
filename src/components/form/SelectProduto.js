import styles from './Select.module.css'

function Select({text, name, options, handleOnChange, value}){
    return(
        <div className={styles.form_control}> 
            <label htmlFor={name}>{text}:</label>
            <select name={name} Id={name} onChange={handleOnChange} value={value || ''} >
                <option>Selecione uma opção</option>  
                {options.map((option) => (
                    <option value={option.Id} key={option.Id}> 
                      {option.Nome} 
                      </option>
                ))}      
            </select>
        </div>
    )
}

export default Select;
