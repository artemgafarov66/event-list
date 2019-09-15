import React, { Component } from 'react';
import './App.scss';
import Input from './components/Input/Input';
import EventItem from './components/EventItem/EventItem';
import DeleteForm from './components/DeleteForm/DeleteForm';
import AddForm from './components/AddForm/AddForm';

class App extends Component {
  state = {
    events: [
      {
        name: 'Название',
        date: 'Дата',
        city: 'Место проведения',
        isChoose: false,
      },
      {
        name: 'мероприятие 1',
        date: '11.11.11',
        city: 'НН',
        isChoose: false,
      },
      {
        name: 'мероприятие 2',
        date: '22.222.22',
        city: 'НН',
        isChoose: false,
      },
      {
        name: 'мероприятие 11',
        date: '11.11.11',
        city: 'НН',
        isChoose: false,
      },
      {
        name: 'мероприятие 22',
        date: '22.222.22',
        city: 'НН',
        isChoose: false,
      }
    ],
    searchValue: '',
    isShowDeleteForm: false,
    isShowAddForm: false,
    newEventName: '',
    newEventDate: '',
    newEventCity: '',
    cities: ['Арзамас', 'Бор', 'Дзержинск', 'Нижний Новгород', 'Саров'],
  }

  copyEvent = () => [...this.state.events].map(eventItem => ({ ...eventItem }));
  filterEvents = (events) => events.filter((eventItem, i) => eventItem.name.includes(this.state.searchValue) || !i)

  onChoose(choose, index) {
    const events = this.copyEvent();

    if (!index) this.filterEvents(events).forEach(eventItem => eventItem.isChoose = choose);
    else {
      this.filterEvents(events)[0].isChoose = false;
      this.filterEvents(events)[index].isChoose = choose;
    }

    this.setState({ events });
  }

  onChangeInputSearch(searchValue) {
    this.setState({ searchValue });
  }

  onDelete() {
    const events = this.copyEvent().filter((eventItem, i) => !eventItem.isChoose || !i);
    events[0].isChoose = false;
    this.setState({ events, isShowDeleteForm: false });
  }

  onShowDeleteForm() {
    this.setState({ isShowDeleteForm: !this.state.isShowDeleteForm });
  }

  onShowAddForm() {
    this.setState({ isShowAddForm: !this.state.isShowAddForm });
  }

  onChangeInputName(newEventName) {
    this.setState({ newEventName });
  }

  onChangeInputDate(newEventDate) {
    this.setState({ newEventDate });
  }

  onChangeCity(newEventCity) {
    this.setState({ newEventCity });
  }

  onAdd() {
    const events = this.copyEvent();
    events.push({
      name: this.state.newEventName,
      date: this.state.newEventDate.split('-').reverse().join('.'),
      city: this.state.newEventCity,
      isChoose: false,
    });

    this.setState({
      events,
      newEventName: '',
      newEventDate: '',
      newEventCity: '',
      isShowAddForm: false,
    })
  }


  render() {
    return (
      <div className='App'>
        <header><h2>Мероприятия</h2></header>
        <div className='event-list'>
          <div className='actions'>
            <div className='buttons'>
              <div
                className='button-plus'
                onClick={() => this.onShowAddForm()}>+</div>
              <div
                className={`button-minus ${this.state.events.every(eventItem => !eventItem.isChoose) || this.state.events.length === 1 ? 'disabled' : ''}`}
                onClick={() => this.onShowDeleteForm()}>–</div>
            </div>
            <Input
              type='text'
              placeholder='Поиск'
              value={this.state.searchValue}
              onChange={(event) => this.onChangeInputSearch(event.target.value)}
            />
          </div>
          {
            this.filterEvents(this.state.events).map((eventItem, i) => {
              return <EventItem
                key={i}
                index={i}
                eventItem={eventItem}
                onChoose={(event) => this.onChoose(event.target.checked, i)}
              />
            })
          }
          {
            this.state.isShowDeleteForm &&
            <DeleteForm
              onCancel={() => this.onShowDeleteForm()}
              onDelete={() => this.onDelete()} />
          }
          {
            this.state.isShowAddForm &&
            <AddForm
              typeInputName='text'
              typeInputDate='date'
              placeholderName='Название'
              placeholderDate='Дата'
              onChangeInputName={(event) => this.onChangeInputName(event.target.value)}
              onChangeInputDate={(event) => this.onChangeInputDate(event.target.value)}
              nameValue={this.state.newEventName}
              dateValue={this.state.newEventDate}
              cities={this.state.cities}
              selectValue={this.state.newEventCity}
              onChangeSelect={(event) => this.onChangeCity(event.target.value)}
              onCancel={() => this.onShowAddForm()}
              onAdd={() => this.onAdd()}
              isActiveButtonAdd={this.state.newEventName && this.state.newEventDate && this.state.newEventCity} />
          }
        </div>
      </div>
    )
  }
}

export default App;
