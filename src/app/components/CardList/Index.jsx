/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-02
 */
import React from 'react';
import PostCard from '../PostCard';

const CardList = ({list}) => (

	<div>
		{
			list.map((post, index) => {

				let cardInfo = {
					title: post.title,
					url: post.html_url,
					createTime: post.created_at.replace(/T|Z/g, ' '),
					author: post.user.login
				};

				return <PostCard key={index} {...cardInfo} />;
			})
		}
	</div>
);

CardList.propTypes = {
	list: React.PropTypes.array.isRequired
};

export default CardList;
