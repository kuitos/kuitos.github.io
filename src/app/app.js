/**
 * @author Kuitos
 * @homepage https://github.com/kuitos
 * @since 2015-08-14. 17:39
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Index from './containers/Index/Index.jsx';
import normalize from 'normalize.css';
import appCss from './app.css';

ReactDOM.render(
  <Index/>,
  document.getElementById('container')
);
