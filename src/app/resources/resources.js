/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-01
 */

import {FetchHttp, FetchHttpResource} from 'es6-utils';

export default {
  Posts: new FetchHttpResource('https://api.github.com/repos/kuitos/kuitos.github.io/issues/:issueId')
}

