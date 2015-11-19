/**
 * @author Kuitos
 * @homepage https://github.com/kuitos
 * @since 2015-08-14. 17:39
 */
import polyfill from 'core-js/es6';

import React from 'react';
import ReactDOM from 'react-dom';
import normalize from 'normalize.css';
import appCss from './app.css';
import loaders from 'loaders.css/src/animations/pacman.scss';

import loadingInterceptor, {eventEmitter} from 'es6-utils/lib/utils/interceptors/loading-interceptor.js';
import {FetchHttp} from 'es6-utils';
import LoadingActionCreators from './actions/LoadingActionCreators.js';
import {Container} from 'flux/utils';

import className from 'classnames';
import Loader from 'react-loaders';
import Index from './containers/Index/Index.jsx';

import AppStore from './stores/AppStore.js';

function emitChangeLoading(loading) {
  LoadingActionCreators.changeLoadingStatus(loading);
}

class App extends React.Component {

  static getStores() {
    return [AppStore];
  }

  static calculateState(prevState) {
    return AppStore.getState().toObject();
  }

  componentWillMount() {
    FetchHttp.defaultConfigs.interceptors.push(loadingInterceptor);
    eventEmitter.addListener('loadingStatusChanged', emitChangeLoading);
  }

  componentWillUnmount() {
    eventEmitter.removeListener('loadingStatusChanged', emitChangeLoading);
  }

  render() {

    let loadingBackground = '#54abee';
    let contentBackground = '#fff';

    return (

      <div className="container" style={{backgroundColor:this.state.loading?loadingBackground:contentBackground}}>

        <Index/>

        <Loader type="pacman" active={this.state.loading}/>

      </div>
    );
  }

}

const AppContainer = Container.create(App, {});

ReactDOM.render(
  <AppContainer/>,
  document.getElementById('container')
);
