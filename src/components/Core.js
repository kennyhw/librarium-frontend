import React from 'react';

import NavBar from './NavBar';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class Core extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedForm: '',
            loggedIn: localStorage.getItem('token') ? true : false,
            username: ''
        };
    }

    componentDidMount() {
        if (this.state.loggedIn) {
            fetch('http://localhost:8000/app01/current_user', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(response => response.json())
            .then(jsonData => {
                this.setState({ username: jsonData.username });
            });
        }
    }

    handleLogin = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(jsonData => {
            localStorage.setItem('token', jsonData.token);
            this.setState({
                loggedIn: true,
                displayedForm: '',
                username: jsonData.user.username
            });
        });
    };

    handleSignup = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/app01/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(jsonData => {
            localStorage.setItem('token', jsonData.token);
            this.setState({
                loggedIn: true,
                displayedForm: '',
                username: jsonData.username
            });
        });
    };

    handleLogout = () => {
        localStorage.removeItem('token');
        this.setState({
            loggedIn: false,
            username: ''
        });
    }

    displayForm = form => {
        this.setState({
            displayedForm: form
        });
    };

    render() {
        let form;
        switch (this.state.displayedForm) {
            case 'login':
                form = <LoginForm handleLogin={this.handleLogin} />;
                break;
            case 'signup':
                form = <SignupForm handleSignup={this.handleSignup} />;
                break;
            default:
                form = null;
        }

        return(
            <div>
                <NavBar
                    loggedIn={this.state.loggedIn}
                    displayForm={this.displayForm}
                    handleLogout={this.handleLogout}
                />
                {form}
                {this.state.loggedIn ? `Hello, ${this.state.username}` : 'Please log in'}
            </div>
        )
    }
}

export default Core;