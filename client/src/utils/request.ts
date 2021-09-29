import Url from 'url';
import getUrlWithParamsConfig from './getUriWIthParamsConfig';
import { Endpoints } from '../config';
import getFetchData from './getFetchData';

// todo fix object type
async function req<T>(endpoint: Endpoints, query?: object, body?: object): Promise<T> {
  const uri = Url.format(getUrlWithParamsConfig(endpoint, query));
  
  const data = getFetchData(endpoint, body);

  return fetch(uri, {
    credentials: 'include',
    ...data
  }).then((res) => res.json());
}

export default req;