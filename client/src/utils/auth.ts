import { Endpoints } from "../config";
import req from './request';

const lockalStorageItemName = 'myworstblogtoken';

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

export const register = async (login: string, password: string, callback?: () => void) => {
    useLogInOrSignUp(login, password, Endpoints.REGISTER, callback);
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
            const result: IToken = await req<IToken>(endpoint, undefined, query);

            setToken(result.user.token);
            if (callback) {
                callback();
            }
        } catch (e) {
            //setIsError(true);
            console.log(e);
        }
    }
}

const setToken = (token: string) => {
    localStorage.setItem(lockalStorageItemName, token);
}

export const isAuthenticate = (): boolean => {
    const token = localStorage.getItem(lockalStorageItemName);
    if (token) {
        return true;
    }
    return false;
}

export const getToken = (): string => {
    const token = localStorage.getItem(lockalStorageItemName);
    if (token) {
        return token;
    }
    return "";
}

export const logOut = () => {
    localStorage.removeItem(lockalStorageItemName);
}