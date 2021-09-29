import { Endpoints } from '../config';
import config from '../config';

interface IFetchData {
    method: string,
    body?: string,
    headers?: HeadersInit
  }

function getFetchData(endpoint: Endpoints, body?: object) {
    const data: IFetchData = {
        method: config.client.endpoint[endpoint].method,
    }

    if (body) {
        data.body = JSON.stringify(body)
    }

    const headers = config.client.endpoint[endpoint].headers;
    if (headers) {
        data.headers = headers;
    }

    return data;
}

export default getFetchData;