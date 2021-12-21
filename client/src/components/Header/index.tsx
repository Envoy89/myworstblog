import React from 'react';
import { MyLinkEnum } from '../../routes';
import { isAuthenticate, logOut } from '../../utils/auth';
import { A } from 'hookrouter';

const Header = () => {
    const isAuth = isAuthenticate();

    const topics = isAuth ? <li><A href={MyLinkEnum.TOPIC_CREATE}>Add new post</A></li> : null;
    const loginOrLogout = isAuth ? <li><a onClick={logOut}>Log out</a></li> : 
        <li><A href="/login">Log In</A></li>

    return <header className="header">
        <A href="/" className="logo">My worst blog</A>
        <ul className="menu">
            {topics}
            {loginOrLogout}
        </ul>
    </header>
}

export default Header;