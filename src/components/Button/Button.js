import React from 'react';
import './Button.scss';

export default (props) => <div
    className={`Button ${props.className}`}
    onClick={props.onClick}>{props.text}</div>;