/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-01
 */
import './index.css';
import React from 'react';
import Card from '../Card/Index.jsx';

const PostCard = ({url, title, createTime, author}) => (

	<Card className="post-card" href={url}>
		<div className="title">{title}</div>
		<div className="info">
			<span>{createTime}</span>
			<span className="author">by {author}</span>
		</div>
	</Card>

);

export default PostCard;
