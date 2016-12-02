/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-12-01
 */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export default reducer => {
	return createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
};
