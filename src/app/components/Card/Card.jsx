/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-02
 */
import React from 'react';
import css from './Card.css';
import classNames from 'classnames';

export default class Card extends React.Component {

  render() {

    let href = this.props.href;

    const CardElement = (

      <div className={classNames(this.props.className, 'card')}>
        {this.props.children}
      </div>

    );

    if (href && href.trim()) {

      return (
        <a href={href} target="_blank" className="fake-link">
          {CardElement}
        </a>
      );

    } else {
      return CardElement;
    }
  }

}

Card.propTypes = {
  className: React.PropTypes.string,
  href     : React.PropTypes.string
};
