/**
 * @author Kuitos
 * @homepage https://github.com/kuitos
 * @since 2015-08-14. 17:39
 */
import polyfill from 'core-js/es6';

import React from 'react';
import ReactDOM from 'react-dom';
import Index from './containers/Index/Index.jsx';
import normalize from 'normalize.css';
import appCss from './app.css';
import loaders from 'loaders.css/src/animations/pacman.scss';

import loadingInterceptor, {eventEmitter} from 'es6-utils/lib/utils/interceptors/loading-interceptor.js';
import {FetchHttp} from 'es6-utils';
import LoadingActionCreators from './actions/LoadingActionCreators.js';

FetchHttp.defaultConfigs.interceptors.push(loadingInterceptor);

eventEmitter.addListener('loadingStatusChanged', loading => {
  LoadingActionCreators.changeLoadingStatus(loading);
});

ReactDOM.render(
  <Index/>,
  document.getElementById('container')
);
