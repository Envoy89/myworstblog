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
    LOG_IN = 'logIn',
    SIGN_UP = 'signUp'
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
                    pathname: '/api/auth/logIn'
                }
            },
            [Endpoints.SIGN_UP]: {
                method: Method.POST,
                headers: {
                    "Accept": 'application/json, text/plain, */*',
                    "Content-Type": 'application/json'
                },
                uri: {
                    pathname: '/api/auth/signUp'
                }
            }
        }
    }
}

export default config;