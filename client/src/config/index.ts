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
    LOG_IN = 'login',
    REGISTER = 'register'
}

enum Method {
    GET = 'GET',
    POST = 'POST'
}

const config: IConfig = {
    client: {
        server: {
            protocol: 'http',
            host: 'localhost:3000'
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
                    "Accept": 'application/json, text/plain, */*',
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
            }
        }
    }
}

export default config;