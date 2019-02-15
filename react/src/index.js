import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Analytics from 'react-router-ga';

import './index.scss';
import App from './App';
import Patterns from './components/Patterns';
import Pattern from './components/Pattern';
import PatternsByUser from './components/PatternsByUser';
import Designer from './components/Designer';

ReactDOM.render(
  <BrowserRouter>
    <Analytics id="UA-89265200-1">
      <App>
        <Switch>
          <Route path='/designer' exact component={Designer} />
          <Route path='/patterns' exact component={Patterns} />
          <Route path='/pattern/:id' exact component={Pattern} />
          <Route path='/patterns/user/:id' exact component={PatternsByUser} />
          <Route path='/' exact component={Patterns} />
        </Switch>
      </App>
    </Analytics>
  </BrowserRouter>,
  document.getElementById('root')
);
