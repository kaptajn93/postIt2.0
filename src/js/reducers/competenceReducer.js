export default function reducer(state={
    competences: [],
    fetching: false,
    fetched: false,
    error: null,

}, action){

    switch(action.type){
        
        case "ADD_COMPETENCE":{
            return {...state,
            competences: state.competences.concat(action.payload.competence)}
        }
        case "UPDATE_COMPETENCE":{
           var newList = state.competences;
            var comp = newList.find(element => element.id == action.payload.id)
            comp.text = action.payload.text
            
            return {
                 ...state, 
                    competences: newList
                }
        }
        case "UPDATE_COMPETENCE_PRIORITY":{
           var newList = state.competences;
           var priorityComps = action.payload.priorityComps;

           for (var i = 0; i < priorityComps.length; i++) {
               var element = priorityComps[i];
               newList[element.id].priority = i   
           }
            return {
                 ...state, 
                    competences: newList
                }
        }
        case "REMOVE_COMPETENCE":{
            var newList = state.competences;
            console.log("start removing: " + newList.findIndex(element => element.id == action.payload.id))
            var elementIndex = newList.findIndex(element => element.id == action.payload.id);
            console.log(newList[0].text)
            // newList.splice(elementIndex, 1);
            return {
                ...state, 
                // competences: newList
                competences: state.competences.slice(0, elementIndex).concat(state.competences.slice(elementIndex + 1))
                // competences: state.competences.filter(competences => competence.id !== action.payload)
            }
        }

        case "LOAD_DATA":{
            return {
                ...state, 
                competences: action.payload.competences
            }
        }
        case "SWITCH":{
            var newList = state.competences;
            var lastElm = newList.reverse();

            return{
                ...state,
                competences: state.competences.slice(0, 0).concat(newList)
            }
        }

        case "SORT_COMPETENCES":{
            return{
                ...state,
                competences: state.competences.splice(0, 0).concat(action.payload.notPriorityComps)
            }
        }
        case "SAVE":{
           console.log("fra comp reducer");
           console.log(state.competences);
           
        break;
        }
    }
    return state
}