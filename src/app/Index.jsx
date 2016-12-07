/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-12-01
 */
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/App';
import CardListStore from './store/CardListStore';
import ViewStore from './store/ViewStore';

const cardListStore = new CardListStore();
const viewStore = new ViewStore();

ReactDOM.render(
	<AppContainer bsStore={cardListStore} viewStore={viewStore}/>,
	document.getElementById('container')
);
