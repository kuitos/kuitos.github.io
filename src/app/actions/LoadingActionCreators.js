/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-04
 */

import AppDispatcher  from '../dispatcher/AppDispatcher.js';
import {ActionTypes} from '../constants/AppConstants.js';

export default {

  changeLoadingStatus(loading){

    AppDispatcher.dispatch({
      type: ActionTypes.CHANGE_LOADING_STATUS,
      loading
    });

  }

}
