import React from 'react';

const Field = ({ character, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{ label }</span>
            <span>{ character[field] }</span>
        </li>
    );
};

export default Field;