import React from 'react';

import NavBar from './NavBar';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class Core extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
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
        } else {
            this.setState({
                content: ''
            })
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
                loggedIn: jsonData.user ? true : false,
            });
            this.setState({
                content: this.state.loggedIn ? 'home' : 'login-error-noAccount',
                username: this.state.loggedIn ? jsonData.user.username : ''
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
                loggedIn: jsonData.username[0] === 'A user with that username already exists.' ? false : true
            });
            this.setState({
                content: this.state.loggedIn ? 'home' : 'signup-error-duplicateAccount',
                username: this.state.loggedIn ? jsonData.username : ''
            });
        });
    };

    handleLogout = () => {
        localStorage.removeItem('token');
        this.setState({
            loggedIn: false,
            content: '',
            username: ''
        });
    }

    displayContent = newContent => {
        this.setState({
            content: newContent
        });
    };

    render() {
        let displayedContent;
        switch (this.state.content) {
            case 'login':
                displayedContent = <React.Fragment>
                                    <LoginForm handleLogin={this.handleLogin} />
                                </React.Fragment>;
                break;
            case 'login-error-noAccount':
                displayedContent = <React.Fragment>
                                    <LoginForm message={'This account does not exist!'} handleLogin={this.handleLogin} />
                                </React.Fragment>;
                break;
            case 'signup':
                displayedContent = <React.Fragment>
                                    <SignupForm handleSignup={this.handleSignup} />
                                </React.Fragment>;
                break;
            case 'signup-error-duplicateAccount':
                displayedContent = <React.Fragment>
                                    <SignupForm message={'An account with that username already exists!'} handleSignup={this.handleSignup} />
                                </React.Fragment>;
                break;
            case 'home':
                displayedContent = <React.Fragment>
                                    <h3>Hello {this.state.username}!</h3>
                                </React.Fragment>;
                break;
            default:
                displayedContent = <React.Fragment>
                                    <h3>Welcome!<br></br>
                                    Please log in or sign up.</h3>
                                </React.Fragment>;
        }

        return(
            <div>
                <NavBar
                    loggedIn={this.state.loggedIn}
                    displayContent={this.displayContent}
                    handleLogout={this.handleLogout}
                />
                {displayedContent}
            </div>
        )
    }
}

export default Core;