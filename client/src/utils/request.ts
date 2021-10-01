import Url from 'url';
import getUrlWithParamsConfig from './getUriWIthParamsConfig';
import { Endpoints } from '../config';
import getFetchData from './getFetchData';
import IQuery from '../interface/IQuery';

async function req<T>(endpoint: Endpoints, query?: IQuery, body?: object): Promise<T> {
  const uri:string = Url.format(getUrlWithParamsConfig(endpoint, query));
  
  const data: RequestInit = getFetchData(endpoint, body);

  return fetch(uri, {
    credentials: 'include',
    ...data
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText)
    }
  });
}

export default req;