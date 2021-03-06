export default function reducer(state={
    jobs: [],
    fetching: false,
    fetched: false,
    error: null,

}, action){

    switch(action.type){
        case "FETCH_JOBS":{
        return {...state, fetching: true}
        }
        case "FETCH_JOBS_FULFILLED":{
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                jobs: action.payload.jobs}
        }
        case "ADD_JOB":{
            return {...state,
                    jobs: state.jobs.concat(action.payload.job)}
        }
        case "UPDATE_JOB":{

            var newList = state.jobs;
            var job = newList.find(element => element.id == action.payload.id)
            job.text = action.payload.text

            // var newList = state.jobs;
            // newList[action.payload.id].text = action.payload.text
            // newList.splice(action.payload.id, 1, action.payload.text)

            // const {id, text} = action.payload
            // const newJobs = [...state.jobs]
            // const jobsToUpdate = newJobs.findIndex(jobs => job.id === id)
            // newJobs[jobsToUpdate] = action.payload.job;
            
            return {
                ...state, 
                    jobs: newList
                    // jobs: state.jobs.splice(action.payload.id, 1, action.payload.text)
                }
        }
        case "REMOVE_JOB":{
            var newList = state.jobs;
            var elementIndex = newList.findIndex(element => element.id == action.payload.id);
            return {
                ...state, 
                jobs: state.jobs.slice(0, elementIndex).concat(state.jobs.slice(elementIndex + 1))
            
            }
        }


        case "LOAD_DATA":{
            return {
                ...state, 
                jobs: action.payload.jobs,
            }
        }

         case "SAVE":{
           console.log("fra job reducer");
           console.log(state.jobs);
           
        break;
        }
    }
    return state
}