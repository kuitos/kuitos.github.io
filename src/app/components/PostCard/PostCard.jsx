/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-01
 */
import React from 'react';
import Card from '../Card/Card.jsx';
import css from './PostCard.css';

export default class PostCard extends React.Component {

  render() {

    let props = this.props;

    return (

      <Card className="post-card" href={props.url}>
        <div className="title">{props.title}</div>
        <div className="info">
          <span>{props.createTime}</span>
          <span className="author">by {props.author}</span>
        </div>
      </Card>

    );

  }

}


