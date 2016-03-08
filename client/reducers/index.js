import { combineReducers } from 'redux'
import { events, eventsByRepo, selectedRepo } from './events'
import { currentUser } from './user'

const gitRadioApp = combineReducers({
  currentUser,
  events,
  eventsByRepo, 
  selectedRepo
})

export default gitRadioApp
