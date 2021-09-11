import React from 'react';
import { isAuthenticate, logOut } from '../../utils/auth';

const Header = () => {
    const isAuth = isAuthenticate();

    const topics = isAuth ? <li><a href="/topics">Add new post</a></li> : null;
    const loginOrLogout = isAuth ? <li><a onClick={logOut}>Log out</a></li> : 
        <li><a href="/login">Log In</a></li>

    return <nav>
        <div className="nav-wrapper teal lighten-2">
            <a href="/" className="brand-logo left">My worst blog</a>
            <ul id="nav-mobile" className="right">
                {topics}
                {loginOrLogout}
            </ul>
        </div>
    </nav>
}

export default Header;