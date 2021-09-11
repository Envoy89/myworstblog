import React from 'react';

const Header = () => {
    return <nav>
        <div className="nav-wrapper teal lighten-2">
            <a href="/" className="brand-logo left">My worst blog</a>
            <ul id="nav-mobile" className="right">
                <li><a href="/topics">Add new post</a></li>
                <li><a href="/auth/logOut">Log out</a></li>
                {/* <!-- <li><a href="/auth/signUp">Registration</a></li> todo fix registration then uncomment --> 
                <li><a href="/auth/signIn">Log in</a></li>
            {% endif %} */}
            </ul>
        </div>
    </nav>
}

export default Header;