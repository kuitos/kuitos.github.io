import 'normalize.css';
import './app.css';
import 'loaders.css/src/animations/pacman.scss';
import 'loaders.css/src/animations/line-scale-pulse-out.scss';
import React from 'react';
import { Loader } from 'react-loaders';
import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';
import CardList from '../../components/CardList';

@observer
export default class App extends React.Component {

	perPage = 10;
	page = 1;

	constructor(props) {
		super(props);
		const {bsStore, viewStore} = this.props;
		viewStore.changeLoadingStatus(true);
		bsStore.loadPagePosts(this.perPage, this.page).then(() => viewStore.changeLoadingStatus(false));
	}

	loadNextPage() {
		const {bsStore} = this.props;
		bsStore.loadPagePosts(this.perPage, ++this.page);
	}

	render() {

		const loadingBackground = '#54abee';
		const contentBackground = '#fff';

		const {posts, hasMore} = this.props.bsStore;
		const {loading} = this.props.viewStore;

		return (

			<div className="container"
			     style={{backgroundColor: loading ? loadingBackground : contentBackground}}>

				{
					posts.length ?

						<div className="card-list">

							<CardList list={posts}/>

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
