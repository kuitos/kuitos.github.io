/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-14
 */
import css from './Index.css';

import React from 'react';
import className from 'classnames';
import IndexServerActionCreators from '../../actions/IndexServerActionCreators.js';
import IndexStore from '../../stores/IndexStore.js';
import CardList from '../../components/CardList/CardList.jsx';
import PostCard from '../../components/PostCard/PostCard.jsx';
import Loader from 'react-loaders';

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);

    this.state = IndexStore.getAll();

  }

  componentDidMount() {
    IndexStore.addChangeListener(this._onChange);
    // 收取blog列表
    IndexServerActionCreators.receivePosts();
  }

  componentWillUnmount() {
    IndexStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(IndexStore.getAll());
  }

  render() {

    let loadingBackground = '#54abee';
    let contentBackground = '#fff';

    return (
      <div className="index-container" style={{backgroundColor:this.state.loading?loadingBackground:contentBackground}}>

        <CardList>

          {
            this.state.posts.map((post, index) => {

              let cardInfo = {
                title     : post.title,
                url       : post.html_url,
                createTime: post.created_at.replace(/T|Z/g, ' '),
                author    : post.user.login
                };

              return <PostCard key={index} {...cardInfo} />;
              })
            }

        </CardList>

        <Loader type="pacman" active={this.state.loading}/>

      </div>
    )
  }

}
