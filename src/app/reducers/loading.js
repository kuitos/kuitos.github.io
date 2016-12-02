/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-12-01
 */
import { START_LOADING } from '../actions';

export default function loading(state = false, action) {

	switch (action.type) {

		case START_LOADING:
			return action.payload;

		default:
			return state;
	}
}