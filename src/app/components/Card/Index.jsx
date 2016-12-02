/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-02
 */
import React from 'react';
import './index.css';
import classNames from 'classnames';

const Card = ({className, href, children}) => {

	const CardElement = (

		<div className={classNames(className, 'card')}>
			{children}
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

};

Card.propTypes = {
	className: React.PropTypes.string,
	href: React.PropTypes.string
};

export default Card;
