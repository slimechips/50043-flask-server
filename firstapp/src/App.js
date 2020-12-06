import React from 'react';
import Blog from './Blog'
import Sort from './Sort'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Redirect exact from ='/' to='/Home'/>
          <Route path='/Home'component={Blog} exact/>
          <Route path='/Sort'component={Sort} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
