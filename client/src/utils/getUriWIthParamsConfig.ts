import { UrlObject } from 'url';
import config from '../config';
import {Endpoints} from '../config';
import IQuery from '../interface/IQuery';

function getUrlWithParamsConfig(endpoint: Endpoints, query?: IQuery):UrlObject {
  const url: UrlObject = {
    ...config.client.server,
    ...config.client.endpoint[endpoint].uri,
    query: {},
  };

  if (query) {
    const newQuery:IQuery = {
      ...query,
    };

    const pathname = Object.keys(newQuery).reduce((acc, val) => {
      const elemString = `{${val}}`;
      if (acc.indexOf(elemString) !== -1) {
        const result = acc.replace(elemString, `${query[val]}`);
        delete newQuery[val];
        return result;
      }
      return acc;
    }, url.pathname || '');

    url.pathname = pathname;
    url.query = newQuery;
  }

  return url;
}

export default getUrlWithParamsConfig;