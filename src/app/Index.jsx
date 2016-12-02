/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-12-01
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './containers/App';
import rootReducer from './reducers';
import createStore from './store';

const store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,

	document.getElementById('container')
);
