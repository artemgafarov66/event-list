import React from 'react';
import './Checkbox.scss';

export default (props) => <input
    className='Checkbox'
    type='checkbox'
    onChange={props.onChange}
    checked={props.isChecked} />;
