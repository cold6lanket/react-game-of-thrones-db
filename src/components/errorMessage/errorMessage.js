import React from 'react';

const ErrorMessage = () => {
    return <span className="select-error">Something went wrong: {this.props.message}</span>
};

export default ErrorMessage;