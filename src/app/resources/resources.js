/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-01
 */

import {FetchHttp, FetchHttpResource} from 'es6-utils';

FetchHttp.defaultConfigs.headers.Authorization = 'token 0fa7ea0a5ad0c1e23f8a10a789a3de39fcf06afa';

export default {

  Posts: new FetchHttpResource('https://api.github.com/repos/kuitos/kuitos.github.io/issues/:issueId')

}

