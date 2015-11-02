/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-02
 */
import React from 'react';
import css from './CardList.css';

export default class CardList extends React.Component {

  render() {

    return (
      <div>{this.props.children}</div>
    );
  }

}
