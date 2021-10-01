import { Endpoints } from "../config";
import { navigate } from 'hookrouter';
import { MyLinkEnum } from '../routes';
import req from './request';
import showAlert from "./alert";

const lockalStorageItemName = 'myWorstblogIsAuth';

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
    errorCallback?: (e: any) => void
) => {
    await useLogInOrSignUp(
        login, password, Endpoints.LOG_IN, successCallback, errorCallback
    );
}

export const register = async (
    login: string, 
    password: string,
    successCallback?: () => void,
    errorCallback?: (e: any) => void
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
    errorCallback?: (e: any) => void
) => {
    if (login === "" || password === "") {
        return;
    } else {
        const body: IUser = {
            login,
            password
        }
        
        try {
            const result: IToken = await req<IToken>(endpoint, undefined, body);

            setAuth();

            if (successCallback) {
                successCallback();
            }
            
        } catch (e) {
            if (errorCallback) {
                errorCallback(e);
            }
        }
    }
}

const setAuth = () => {
    localStorage.setItem(lockalStorageItemName, "true");
}

export const isAuthenticate = (): boolean => {
    const isAuth = localStorage.getItem(lockalStorageItemName);
    if (isAuth) {
        return true;
    }
    return false;
}

export const logOut = async () => {
    try {
        await req(Endpoints.LOG_OUT, undefined, undefined);
        localStorage.removeItem(lockalStorageItemName);
        navigate(MyLinkEnum.HOME);
        document.location.reload();
    } catch(e) {
        showAlert("Error", `${e}`);
    }
}