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
    LOG_IN = 'login',
    REGISTER = 'register',
    LOG_OUT = 'logOut',
}

enum Method {
    GET = 'GET',
    POST = 'POST'
}

const config: IConfig = {
    client: {
        server: {
            protocol: 'http',
            host: location.hostname + ':' + location.port
        },
        endpoint: {
            [Endpoints.GET_TOPICS]: {
                method: Method.GET,
                uri: {
                    pathname: '/api/topics'
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
            [Endpoints.GET_TOPIC]: {
                method: Method.GET,
                uri: {
                    pathname: '/api/topics/{id}'
                }
            }
        }
    }
}

export default config;