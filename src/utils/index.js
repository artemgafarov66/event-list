export const copyEvents = (events) => events.map(eventItem => ({ ...eventItem })),
  filterEvents = (events, searchValue) => events.filter((eventItem, i) => eventItem.name.includes(searchValue) || !i || eventItem.isChoose);
