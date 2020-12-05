import React from 'react';
import logo from './logo.svg';
import Button from '@material-ui/core/Button';
import Blog from './Blog'
import Sort from './Sort'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Route path='/'component={Blog} exact/>
          <Route path='/Sort'component={Sort} exact/>
      </div>
    </BrowserRouter>
  );
}
export default App;
