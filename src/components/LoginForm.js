import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    };

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => {
            const newState = { ...prevState };
            newState[name] = value;
            return newState;
        });
    };

    render() {
        return (
            <form onSubmit={e => this.props.handleLogin(e, this.state)}>
                <h3>Log In</h3>
                <h6>{this.props.message}</h6>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <input type="submit" />
            </form>
        );
    }
}

export default LoginForm;

LoginForm.propTypes = {
    message: PropTypes.string,
    handleLogin: PropTypes.func.isRequired
}