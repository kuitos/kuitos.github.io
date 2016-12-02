/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-12-01
 */
import { combineReducers } from 'redux';
import posts, { hasMore } from './posts';
import loading from './loading';

export default combineReducers({
	posts,
	hasMore,
	loading
});
