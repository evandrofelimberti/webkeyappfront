import { useState } from 'react';

function UseToken(){
    const getToken = () => {   
        const tokenString = localStorage.getItem('token');
        var userToken = '';
        if (tokenString != ''){
          userToken = JSON.parse(tokenString);
          return userToken?.token          
        } else {
          return '';
        }

      };
    
      const [token, setToken] = useState(getToken());
    
      const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
      };
    
      return {
        setToken: saveToken,
        token
      }
}

export default UseToken;