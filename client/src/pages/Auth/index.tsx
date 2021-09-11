import React from 'react';
import { useState } from 'react';
import { logIn, register } from '../../utils/auth';

const Auth = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const inputLogin = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLogin(e.target.value);
    }

    const inputPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    }

    const internalLogIn = async () => {
        await logIn(login, password);
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
            onClick={internalLogIn}
        >
                Submit
        </button>
    </div>
}

export default Auth;