import React from 'react';
import './DeleteForm.scss';
import Button from '../Button/Button';

export default (props) => <div
  className='DeleteForm'>
  <form>
    <h3>Удалить мероприятия?</h3>
    <div className='buttons'>
      <Button
        text='Нет'
        onClick={props.onCancel} />
      <Button
        text='Да'
        onClick={props.onDelete} />
    </div>
  </form>
  <div className='overlay' />
</div>;
