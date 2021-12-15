import Url from 'url';
import getUrlWithParamsConfig from './getUriWIthParamsConfig';
import { Endpoints } from '../config';
import getFetchData from './getFetchData';
import IQuery from '../interface/IQuery';
import getServerError, {IErrResponse} from "./getServerErrors";

async function req<T>(endpoint: Endpoints, query?: IQuery, body?: object): Promise<T> {
  const uri:string = Url.format(getUrlWithParamsConfig(endpoint, query));
  
  const data: RequestInit = getFetchData(endpoint, body);

  return fetch(uri, {
    credentials: 'include',
    ...data
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    } else {
      const errResponse: IErrResponse = await res.json();
      const errText: string = getServerError(errResponse);
      throw new Error(errText);
    }
  });
}

export default req;