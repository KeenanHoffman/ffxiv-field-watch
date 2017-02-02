import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';

ReactDOM.render(
  <App datastore={localStorage} class="container" />,
  document.getElementById('root')
);
