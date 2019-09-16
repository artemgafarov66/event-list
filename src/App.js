import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './components/Input/Input';
import EventItem from './components/EventItem/EventItem';
import DeleteForm from './components/DeleteForm/DeleteForm';
import AddForm from './components/AddForm/AddForm';
import { filterEvents } from './utils';
import { CITIES } from './consts';

import './App.scss';
class App extends Component {
  render() {
    return (
      <div className='App'>
        <header><h2>Мероприятия</h2></header>
        <div className='event-list'>
          <div className='actions'>
            <div className='buttons'>
              <div
                className='button-plus'
                onClick={() => this.props.onShowAddForm()}>+</div>
              <div
                className={`button-minus ${this.props.events.every(eventItem => !eventItem.isChoose) || this.props.events.length === 1 ? 'disabled' : ''}`}
                onClick={() => this.props.onShowDeleteForm()}>–</div>
            </div>
            <Input
              type='text'
              placeholder='Поиск'
              value={this.props.searchValue}
              onChange={(event) => this.props.onChangeInputSearch(event.target.value)}
            />
          </div>
          {
            filterEvents(this.props.events, this.props.searchValue).map((eventItem, i) => {
              return <EventItem
                key={i}
                index={i}
                eventItem={eventItem}
                onChoose={(event) => this.props.onChoose(event.target.checked, i)}
              />
            })
          }
          {
            this.props.isShowDeleteForm &&
            <DeleteForm
              onCancel={() => this.props.onShowDeleteForm()}
              onDelete={() => this.props.onDelete()} />
          }
          {
            this.props.isShowAddForm &&
            <AddForm
              typeInputName='text'
              typeInputDate='date'
              placeholderName='Название'
              placeholderDate='Дата'
              onChangeInputName={(event) => this.props.onChangeInputName(event.target.value)}
              onChangeInputDate={(event) => this.props.onChangeInputDate(event.target.value)}
              nameValue={this.props.newEventName}
              dateValue={this.props.newEventDate}
              cities={CITIES}
              selectValue={this.props.newEventCity}
              onChangeSelect={(event) => this.props.onChangeCity(event.target.value)}
              onCancel={() => this.props.onShowAddForm()}
              onAdd={() => this.props.onAdd()}
              isActiveButtonAdd={this.props.newEventName && this.props.newEventDate && this.props.newEventCity} />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    searchValue: state.searchValue,
    isShowDeleteForm: state.isShowDeleteForm,
    isShowAddForm: state.isShowAddForm,
    newEventName: state.newEventName,
    newEventDate: state.newEventDate,
    newEventCity: state.newEventCity,
    cities: state.cities,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChoose: (choose, index) => dispatch({ type: 'CHOOSE', choose, index }),
    onChangeInputSearch: (searchValue) => dispatch({ type: 'CHANGE_SEARCH', searchValue }),
    onDelete: () => dispatch({ type: 'DELETE' }),
    onShowDeleteForm: () => dispatch({ type: 'SHOW_DELETE' }),
    onShowAddForm: () => dispatch({ type: 'SHOW_ADD' }),
    onChangeInputName: (newEventName) => dispatch({ type: 'CHANGE_NAME', newEventName }),
    onChangeInputDate: (newEventDate) => dispatch({ type: 'CHANGE_DATE', newEventDate }),
    onChangeCity: (newEventCity) => dispatch({ type: 'CHANGE_CITY', newEventCity }),
    onAdd: () => dispatch({ type: 'ADD' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
