/*
 * Event Reducer
 * takes the previous state, the action, and returns the next state
 * Not giving a default state here is on purpose - the default is no event
 */ 
const event = (state, action) => {
  switch(action.type) {
    case 'ADD_EVENT':
      // return an event object with id, user, event_type
      return {
        id: action.id,
        user: action.user,
        event_type: action.event_type
      }
    default:
      return state
  }
}

/*
 * Events Reducer
 */
const events = (state = [], action) => {
  switch(action.type) {
    case 'ADD_EVENT':
      return [
        // destructure state to return current state (array of events)
        ...state,
        // call Event Reducer - which returns an event
        event(undefined, action)
      ] 
    default:
      return state
  }
}

export default events
