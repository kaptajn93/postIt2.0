export default function reducer(state={
    notes: [],
    fetching: false,
    fetched: false,
    error: null,

}, action){

    switch(action.type){
        case "FETCH_NOTES":{
        return {...state, fetching: true}
        }
        case "FETCH_NOTES_FULFILLED":{
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                notes: action.payload.notes}
        }
        case "ADD_NOTE":{
            return {...state,
                    notes: state.notes.concat(action.payload.note)}
        }
        case "UPDATE_NOTE":{
            
            var newList = state.notes;
            var note = newList.find(element => element.id == action.payload.id)
            note.text = action.payload.text

            return {
                ...state, 
                    notes: newList
                }
        }
        case "UPDATE_NOTE_POSITION":{
            var newList = state.notes;
            var noteIndex = newList.findIndex(element => element.id == action.payload.id)
            newList[noteIndex].position = action.payload.newPosition
            return {
                ...state, 
                    notes: newList
                }
        }
        case "REMOVE_NOTE":{
             var newList = state.notes;
            var elementIndex = newList.findIndex(element => element.id == action.payload.id);
            return {
                ...state, 
                //right way
                notes: state.notes.slice(0, elementIndex).concat(state.notes.slice(elementIndex + 1))
            }
        }

        case "LOAD_DATA":{
            return {
                ...state, 
                notes: action.payload.notes,
            }
        }

         case "SAVE":{
           console.log("fra note");
           console.log(state.notes);
           
        break;
        }
    }
    return state
}