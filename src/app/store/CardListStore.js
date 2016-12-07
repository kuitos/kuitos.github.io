import { observable } from 'mobx';
import { getPosts } from '../apis';

/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-12-06
 */

export default class PostsStore {

	@observable
	posts = [];

	@observable
	hasMore = true;

	loadPagePosts(perPage, page) {

		return getPosts(perPage, page).then(res => {
			this.posts = [...this.posts, ...res.payload];
			this.hasMore = res.hasMore;
		});
	}

}
