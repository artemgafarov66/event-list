import React from 'react';
import './EventItem.scss';
import Checkbox from '../Checkbox/Checkbox';

export default (props) => <div
  className={`EventItem ${props.index ? '' : 'first'}`}>
  <Checkbox
    onChange={props.onChoose}
    isChecked={props.eventItem.isChoose} />
  <div className='event-name event-td'>{props.eventItem.name}</div>
  <div className='event-date event-td'>{props.eventItem.date}</div>
  <div className='event-city event-td'>{props.eventItem.city}</div>
</div>;