import './App.css';
import Home from './Home';
import Footer  from './Footer';
import CheckoutCart from './CheckoutCart';
import Header from './Header';
import { UserContext } from './userContext'
import {BrowserRouter as Router, Switch, Route,  Link} from "react-router-dom";
import Menu from './Menu';
import Productfinder from './productfinder'
import Productlist from './productlist';
import Inventry from './inventry';
import Userlist from './userlist';
import Settings from './Settings';
import React, { useState } from 'react';


function App() { 
  const[contectvalue,setContectvalue]=useState([]);
  return (
 
    <div>  
      <Router>  
       <UserContext.Provider value={{contectvalue,setContectvalue}}>
      <Header/><Menu/> 
      <Route path="/productfinder"><Productfinder/></Route>
      <Route path="/productlist"><Productlist/></Route>          
      </UserContext.Provider>     
      <Route path="/CheckoutCart"><CheckoutCart/></Route>   
      <Route path="/inventry"><Inventry/></Route>
      <Route path="/userlist"><Userlist/></Route>
      <Route path="/settings"><Settings/></Route>
      <Route exact path="/"><Home/></Route>   
      </Router>
      <Footer></Footer>
    </div>

  );
}

export default App;
