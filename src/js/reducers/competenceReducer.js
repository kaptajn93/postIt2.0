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
            newList[action.payload.id].text = action.payload.text
            
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
            return {
                ...state, 
                competences: state.competences.slice(0, action.payload.id).concat(state.competences.slice(action.payload.id + 1))
                // competences: state.competences.filter(competences => competence.id !== action.payload)
            }
        }

        case "LOAD_DATA":{
            return {
                ...state, 
                competences: action.payload.competences
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