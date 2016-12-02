import { RECEIVE_POSTS, HAS_MORE } from '../actions';
/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-12-01
 */

export default function posts(state = [], action) {

	switch (action.type) {

		case RECEIVE_POSTS:
			return [...state, ...action.payload];

		default:
			return state;
	}
}

export function hasMore(state = true, action) {

	switch (action.type) {

		case HAS_MORE:
			return action.payload;

		default:
			return state;
	}

}
