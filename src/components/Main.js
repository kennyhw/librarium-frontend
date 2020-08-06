import React from 'react';
import PropTypes from 'prop-types';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return(
            <div>
                <span>Hello {this.props.username}!</span>
            </div>
        )
    }
}

export default Main;

Main.propTypes = {
    username: PropTypes.string.isRequired
}