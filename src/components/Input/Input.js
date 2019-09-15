import React from 'react';
import './Input.scss';

export default (props) => <input
  className='Input'
  type={props.type}
  placeholder={props.placeholder}
  onChange={props.onChange}
  value={props.value} />;
