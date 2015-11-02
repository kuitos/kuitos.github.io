/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-09-16
 */
import React from 'react';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {ActionTypes} from '../constants/AppConstants.js';
import Resources from '../resources/resources.js';

export default {

  receivePosts(){

    let Posts = Resources.Posts;

    Posts.query().then(posts => {

      AppDispatcher.dispatch({
        type: ActionTypes.RECEIVE_POSTS,
        posts
      });

    });

  }

};
