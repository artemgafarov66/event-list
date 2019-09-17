import React from 'react';
import './Select.scss';

export default (props) => <div
  className='Select'>
  <select
    style={{ color: props.selectValue ? '#000' : '#8a7f7f' }}
    defaultValue='Город'
    onChange={props.onChange}>
    <option disabled>Город</option>
    {props.cities.map((city, i) => <option key={i} value={city}>{city}</option>)}
  </select>
</div>;
