import getBaseUrl from "../utils/getBaseUrl";

interface IConfig {
    client: {
        server: {
            protocol: string,
            host: string
        },
        endpoint: {
            [key: string]: {
                method: string,
                headers?: {
                    "Accept": string,
                    "Content-Type": string
                },
                uri: {
                    pathname: string
                }
            }
        }
    }
}

export enum Endpoints {
    GET_TOPICS = 'getTopics',
    GET_TOPIC = 'getTopic',
    CREATE_TOPIC = 'createTopic',
    EDIT_TOPIC = 'editTopic',
    DELETE_TOPIC = 'deleteTopic',
    LOG_IN = 'login',
    REGISTER = 'register',
    LOG_OUT = 'logOut',
    GET_TAGS = 'getTags'
}

enum Method {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
}

let host = location.hostname + ':' + location.port;

const base = getBaseUrl();

if (base) {
    host += base;
}

const config: IConfig = {
    client: {
        server: {
            protocol: location.protocol.substring(0, location.protocol.length - 1),
            host: host
        },
        endpoint: {
            [Endpoints.GET_TOPICS]: {
                method: Method.GET,
                uri: {
                    pathname: '/api/topics'
                }
            },
            [Endpoints.GET_TOPIC]: {
                method: Method.GET,
                uri: {
                    pathname: '/api/topics/{id}'
                }
            },
            [Endpoints.CREATE_TOPIC]: {
                method: Method.POST,
                headers: {
                    "Accept": 'application/json, text/plain, */*',
                    "Content-Type": 'application/json'
                },
                uri: {
                    pathname: '/api/topics'
                }
            },
            [Endpoints.EDIT_TOPIC]: {
                method: Method.POST,
                headers: {
                    "Accept": 'application/json, text/plain, */*',
                    "Content-Type": 'application/json'
                },
                uri: {
                    pathname: '/api/topics/{id}'
                }
            },
            [Endpoints.DELETE_TOPIC]: {
                method: Method.DELETE,
                uri: {
                    pathname: '/api/topics/{id}'
                }
            },
            [Endpoints.LOG_IN]: {
                method: Method.POST,
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                },
                uri: {
                    pathname: '/api/auth/login'
                }
            },
            [Endpoints.REGISTER]: {
                method: Method.POST,
                headers: {
                    "Accept": 'application/json, text/plain, */*',
                    "Content-Type": 'application/json'
                },
                uri: {
                    pathname: '/api/auth/register'
                }
            },
            [Endpoints.LOG_OUT]: {
                method: Method.GET,
                uri: {
                    pathname: '/api/auth/logOut'
                }
            },
            [Endpoints.GET_TAGS]: {
                method: Method.GET,
                uri: {
                    pathname: '/api/tags'
                }
            },
        }
    }
}

export default config;