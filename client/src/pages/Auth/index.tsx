import React from 'react';
import { MyLinkEnum } from '../../routes';
import { navigate } from 'hookrouter';
import { useState } from 'react';
import { logIn, register } from '../../utils/auth';

interface AuthProps {
    isRegister ?: boolean
}

const Auth: React.FC<AuthProps> = ({ isRegister }) => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const inputLogin = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLogin(e.target.value);
    }

    const inputPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    }

    const handleButton = async () => {
        if (isRegister) {
            await register(login, password);
        } else {
            await logIn(login, password);
        }
        navigate(MyLinkEnum.HOME);
    }

    return <div>
        <input 
            type="text" 
            placeholder="login" 
            name="login" 
            onChange={inputLogin} 
        />
        <input 
            type="text" 
            placeholder="password" 
            name="password"
            onChange={inputPassword}
        />
        <button 
            className="btn waves-effect waves-light" 
            type="submit" 
            name="action"
            onClick={handleButton}
        >
                {isRegister ? "Зарегистрироваться" : "Войти"}
        </button>
    </div>
}

export default Auth;