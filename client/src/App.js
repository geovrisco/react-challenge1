import React from 'react';
import './styles/cardHolder.css'
import {client } from './services/graphql'
import {ApolloProvider} from '@apollo/react-hooks'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './pages/home'
import Favorite from './pages/favorite'
import Detail from './pages/detail'


function App() {


  return (
    <ApolloProvider client={client}>
      <Router>
        <nav className="body-cointainer">
          <div className="navbar">
          
              <Link className="komponen" to ='/'> Home </Link>
            
           
            <Link className="komponen" to='/favorite'> Favourite </Link>
           
          </div>
        </nav>
        <Switch>
          <Route exact path='/'> <Home></Home> </Route>
          <Route exact path='/favorite'> <Favorite></Favorite> </Route>
          <Route path='/detail/:movieId'> <Detail></Detail></Route>
        </Switch>
      </Router>
      {/* <Home></Home> */}
      <nav className="body-cointainer">
          <div className="footer">
          
              <span className="footer2"> 
              Gabriel Geovrisco 
              
              </span>
           
          </div>
        </nav>
    </ApolloProvider>
  );
}

export default App;
