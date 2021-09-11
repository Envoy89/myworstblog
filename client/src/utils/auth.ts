import { Endpoints } from "../config";
import req from './request';

interface IUser {
    login: string,
    password: string
}

interface IToken {
    user: {
        _id: string,
        login: string,
        token: string
    }
}

export const logIn = async (login: string, password: string, callback?: () => void) => {
    useLogInOrSignUp(login, password, Endpoints.LOG_IN, callback);
}

export const signUp = async (login: string, password: string, callback?: () => void) => {
    useLogInOrSignUp(login, password, Endpoints.SIGN_UP, callback);
}

const useLogInOrSignUp = async (
    login: string, password: string, endpoint: Endpoints, callback?: () => void
) => {
    if (login === "" || password === "") {
        return;
    } else {
        const query: IUser = {
            login,
            password
        }
        
        try {
            const result = await req<IToken>(endpoint, undefined, query);

            console.log(result);
        } catch (e) {
            //setIsError(true);
            console.log(e);
        }
    }
}

export const isLogin = () => {
    return false;
}