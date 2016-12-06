/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-12-01
 */
import { createAction } from 'redux-actions';
import { getPosts } from '../apis';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const START_LOADING = 'START_LOADING';
export const HAS_MORE = 'HAS_MORE';

const receivePosts = createAction(RECEIVE_POSTS);
const startLoadingStatus = createAction(START_LOADING);
const hasMoreStatus = createAction(HAS_MORE);

export function startLoading(loading = true) {
	return dispatch => dispatch(startLoadingStatus(loading));
}

export function hasMorePosts(hasMore = false) {
	return dispatch => dispatch(hasMoreStatus(hasMore));
}

export function receivePostList({perPage = 5, page = 1}) {
	return dispatch => {

		getPosts({perPage, page})

			.then(response => {
				dispatch(hasMorePosts(response.hasMore));
				dispatch(receivePosts(response.payload));
				dispatch(startLoading(false));
			});
	};
}
