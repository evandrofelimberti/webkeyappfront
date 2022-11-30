import React from 'react'
import styles from './Input.module.css'
import { useState } from "react";

function InputNumeric({text, name, placeholder, handleOnChange, value}){
      

    const [currentValue, setCurrentValue] = useState(undefined);
  
    function checkValue(event) {
        setCurrentValue(handleDecimalsOnValue(event.target.value))
        handleOnChange(event);
    }
    
    function handleDecimalsOnValue(value) {
        const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;        
        value = value.replace(/[\,]/g, '.');
        return value.match(regex)[0]; 
               
    }    
    
    return(
        <div className={styles.form_control}> 
            <label htmlFor={name}>{text}:</label>         
            <input 
            type={"text"} 
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={(event) => checkValue(event, 'change')}
            value={currentValue}
            />
            
        </div>
    )
}

export default InputNumeric;