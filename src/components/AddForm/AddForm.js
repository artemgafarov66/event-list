import React from 'react';
import './AddForm.scss';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Button from '../Button/Button';

export default (props) => <div className='AddForm'>
  <form>
    <h3>Добавление мероприятия</h3>
    <div className='options'>
      <Input
        type={props.typeInputName}
        placeholder={props.placeholderName}
        onChange={props.onChangeInputName}
        value={props.nameValue} />
      <Input
        type={props.typeInputDate}
        placeholder={props.placeholderDate}
        onChange={props.onChangeInputDate}
        value={props.dateValue} />
      <Select
        cities={props.cities}
        selectValue={props.selectValue}
        onChange={props.onChangeSelect} />
    </div>
    <div className='buttons'>
      <Button
        text='Отмена'
        onClick={props.onCancel} />
      <Button
        text='Добавить'
        className={props.isActiveButtonAdd ? '' : 'disabled'}
        onClick={props.onAdd} />
    </div>
  </form>
  <div className='overlay' />
</div>;