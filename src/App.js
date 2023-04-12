
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import { Switch, Link } from "react-router-dom";
import Home from './components/pages/Home'
import Projects from './components/pages/Projects'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import Product from './components/pages/Product'
import NewProject from './components/pages/NewProject'
import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Project from './components/pages/Project'
import Login from './components/layout/Login'
import UseToken from './components/layout/UseToken'


import ProductsList from './components/pages/ProductsList'
import ProductAdd from './components/pages/ProductAdd'

function App() {
  const { token, setToken } = UseToken(); 
  
  if(!token) {
    return <Login setToken={setToken} />    
  }  
  
  return (    
<Router className="text-3xl font-bold underline">
  <Navbar/>
  <Container customClass="min-height" >       
  <Routes>
    <Route exact path="/" element={ <Home />}> </Route> {/*--exact somente para barra*/}
    <Route  path="/projects" element={ <Projects />}> </Route>    
    <Route  path="/company" element={ <Company />}> </Route>
    <Route  path="/contact" element={ <Contact />}> </Route>
    <Route  path="/products" element={<ProductsList/>} />    
    <Route  path="/newproject" element={ <NewProject />}> </Route>
    <Route  path="/project/:id" element={ <Project />}> </Route>
    <Route  path="/productAdd" element={ <ProductAdd />}> </Route>    
    <Route  path="/product/:id" element={ <Product />}> </Route>        
    {/*<Route path="/product/:id" element={Product} />    */}
   </Routes>  
   </Container>
    <Footer/> 
</Router>
  );
}

export default App;
