import React from 'react';
import PropTypes from 'prop-types';

function NavBar(props) {
    const loggedOutNavBar = (
        <ul>
            <li onClick={() => props.displayForm('login')}>Login</li>
            <li onClick={() => props.displayForm('signup')}>Sign Up</li>
        </ul>
    );

    const loggedInNavBar = (
        <ul>
            <li onClick={props.handleLogout}>Log Out</li>
        </ul>
    );

    return <div>{props.loggedIn ? loggedInNavBar : loggedOutNavBar}</div>;
}

export default NavBar;

NavBar.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    displayForm: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired
};