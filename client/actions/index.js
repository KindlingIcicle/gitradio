let nextEventId = 0
export const addEvent = (event_type, user) => {
  return {
    type: 'ADD_EVENT',
    id: nextEventId++,
    event_type,
    user
  }
}
