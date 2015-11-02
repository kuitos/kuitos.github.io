/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-14
 */
import React from 'react';
import IndexStore from '../../stores/IndexStore.js';
import IndexServerActionCreators from '../../actions/IndexServerActionCreators.js';
import CardList from '../../components/CardList/CardList.jsx';
import PostCard from '../../components/PostCard/PostCard.jsx';

export default class Index extends React.Component {

  constructor(props) {
    super(props);

    IndexServerActionCreators.receivePosts();

    this.state = IndexStore.getAll();
  }

  componentDidMount() {
    IndexStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    IndexStore.removeChangeListener(this._onChange.bind(this))
  }

  _onChange() {
    this.setState(IndexStore.getAll());
  }

  render() {

    return (
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
    )

  }

}
