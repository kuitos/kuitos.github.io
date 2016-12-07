import 'whatwg-fetch';

const fetch = window.fetch;
const githubIssuesUrl = 'https://api.github.com/repos/kuitos/kuitos.github.io/issues';

export function getPosts(perPage = 5, page = 1) {

	return fetch(`${githubIssuesUrl}?per_page=${perPage}&page=${page}`, {method: 'GET'})
		.then(response => {

			const linkHeader = response.headers.get('Link');
			const hasMore = linkHeader.split(',').some(link => link.indexOf('rel="next"') !== -1);

			return response.json().then(payload => ({hasMore, payload}));
		});

}
