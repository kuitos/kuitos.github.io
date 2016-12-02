import 'normalize.css';
import './app.css';
import 'loaders.css/src/animations/pacman.scss';
import 'loaders.css/src/animations/line-scale-pulse-out.scss';
import React from 'react';
import { Loader } from 'react-loaders';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import CardList from '../../components/CardList';
import { receivePostList, startLoading } from '../../actions';

@connect(state => state)
export default class App extends React.Component {

	constructor(props) {
		super(props);
		const {dispatch} = this.props;
		this.page = 1;
		dispatch(startLoading(true));
		dispatch(receivePostList({perPage: 10, page: this.page}));
	}

	loadNextPage() {
		const {dispatch} = this.props;
		dispatch(receivePostList({perPage: 10, page: ++this.page}));
	}

	render() {

		const loadingBackground = '#54abee';
		const contentBackground = '#fff';

		const {posts, loading, hasMore} = this.props;

		return (

			<div className="container"
			     style={{backgroundColor: loading ? loadingBackground : contentBackground}}>

				{
					posts.length ?

						<div className="card-list">

							<CardList list={posts} loadNextPage={::this.loadNextPage}/>

							<InfiniteScroll
								loadMore={::this.loadNextPage}
								hasMore={hasMore}
								loader={<Loader type="line-scale-pulse-out" size="sm" active={true}/>}
							/>

						</div> : null
				}

				<Loader type="pacman" active={loading}/>

			</div>
		);
	}

}
