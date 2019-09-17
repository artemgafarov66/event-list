import { copyEvents, filterEvents } from '../utils';

const initialState = {
  events: [
    {
      name: 'Название',
      date: 'Дата',
      city: 'Место проведения',
      isChoose: false,
    },
    {
      name: 'Мероприятие 1',
      date: '20.08.2017',
      city: 'Нижний Новгород',
      isChoose: false,
    },
    {
      name: 'Мероприятие 2',
      date: '13.09.2017',
      city: 'Саров',
      isChoose: false,
    },
    {
      name: 'Мероприятие 3',
      date: '03.10.2017',
      city: 'Арзамас',
      isChoose: false,
    },
  ],
  searchValue: '',
  isShowDeleteForm: false,
  isShowAddForm: false,
  newEventName: '',
  newEventDate: '',
  newEventCity: '',
};

export default function rootReducer(state = initialState, action) {
  let events;

  switch (action.type) {
    case 'CHOOSE':
      events = copyEvents([...state.events]);

      if (!action.index) filterEvents(events, state.searchValue).forEach(eventItem => eventItem.isChoose = action.choose);
      else {
        filterEvents(events, state.searchValue)[0].isChoose = false;
        filterEvents(events, state.searchValue)[action.index].isChoose = action.choose;
      }

      return { ...state, events };

    case 'CHANGE_SEARCH':
      return { ...state, searchValue: action.searchValue };

    case 'DELETE':
      events = copyEvents([...state.events]).filter((eventItem, i) => !eventItem.isChoose || !i);
      events[0].isChoose = false;
      return { ...state, events, isShowDeleteForm: false };

    case 'SHOW_DELETE':
      return { ...state, isShowDeleteForm: !state.isShowDeleteForm };

    case 'SHOW_ADD':
      return { ...state, isShowAddForm: !state.isShowAddForm };

    case 'CHANGE_NAME':
      return { ...state, newEventName: action.newEventName };

    case 'CHANGE_DATE':
      return { ...state, newEventDate: action.newEventDate };

    case 'CHANGE_CITY':
      return { ...state, newEventCity: action.newEventCity };

    case 'ADD':
      events = copyEvents([...state.events]);

      events.push({
        name: state.newEventName,
        date: state.newEventDate.split('-').reverse().join('.'),
        city: state.newEventCity,
        isChoose: false,
      });

      return {
        ...state,
        events,
        newEventName: '',
        newEventDate: '',
        newEventCity: '',
        isShowAddForm: false,
      };

    default:
      return state;
  }
}
