import {combineReducers} from "redux"

import jobReducer from "./jobReducer"
import competenceReducer from "./competenceReducer"
import noteReducer from "./noteReducer"

const reducer = combineReducers({
jobReducer,
competenceReducer,
noteReducer
})
export default reducer
