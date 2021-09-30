import { Endpoints } from '../config';
import config from '../config';


function getFetchData(endpoint: Endpoints, body?: object): RequestInit {
    const data: RequestInit = {
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