import { Endpoints } from "../config";
import { navigate } from 'hookrouter';
import { MyLinkEnum } from '../routes';
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

export const logIn = async (
    login: string, 
    password: string, 
    successCallback?: () => void,
    errorCallback?: () => void
) => {
    await useLogInOrSignUp(
        login, password, Endpoints.LOG_IN, successCallback, errorCallback
    );
}

export const register = async (
    login: string, 
    password: string,
    successCallback?: () => void,
    errorCallback?: () => void
) => {
    await useLogInOrSignUp(
        login, password, Endpoints.REGISTER, successCallback, errorCallback
    );
}

const useLogInOrSignUp = async (
    login: string, 
    password: string, 
    endpoint: Endpoints, 
    successCallback?: () => void,
    errorCallback?: () => void
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

            if (result.user) {
                setToken(result.user.token);
                if (successCallback) {
                    successCallback();
                }
            } else {
                if (errorCallback) {
                    errorCallback();
                }
            }
        } catch (e) {
            if (errorCallback) {
                errorCallback();
            }
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

export const logOut = async () => {
    await req(Endpoints.LOG_OUT, undefined, undefined);
    localStorage.removeItem(lockalStorageItemName);
    navigate(MyLinkEnum.HOME);
    document.location.reload();
}