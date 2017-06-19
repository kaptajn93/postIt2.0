import Job from "../components/BoardComponents/Job"
import Competence from "../components/BoardComponents/Competence"
import Note from "../components/BoardComponents/Note"

//Job
export function fetchJobs(){
    return{
        type: "FETCH_JOBS"
    }
}
export function fetchJobsFulfilled(){
    var job1 = new Job();
    job1.text = "hej"
    return{
        type: "FETCH_JOBS_FULFILLED",
        payload:{
            jobs: [job1, new Job()]
        }
    }
}
export function addJob(jobs){
    var newJob = new Job();
    newJob.id = jobs ? jobs : 0;
    return{
        type: "ADD_JOB",
        payload:{
            job: newJob
        }
    }
}
export function updateJob(id, text){
    return{
        type: "UPDATE_JOB",
        payload:{
            id,
            text
        }
    }
}
export function removeJob(id){
    return{
        type: "REMOVE_JOB",
        payload:{
            id,
        }
    }
}
//Competence

export function addCompetence(competences){
    var comp = new Competence();
    comp.id = competences ? competences : 0;
    return{
        type: "ADD_COMPETENCE",
        payload:{
            competence: comp
        }
    }
}
export function updateCompetence(id, text){
    return{
        type: "UPDATE_COMPETENCE",
        payload:{
            id,
            text
        }
    }
}
export function removeCompetence(id){
    return{
        type: "REMOVE_COMPETENCE",
        payload:{
            id,
        }
    }
}
export function updatePriotity(priorityComps){
    return{
        type: "UPDATE_COMPETENCE_PRIORITY",
        payload:{
            priorityComps,
        }
    }
}

//Note

export function fetchNotes(){
    return{
        type: "FETCH_NOTES"
    }
}
export function fetchNotesFulfilled(){
    var defaultPosition = {x : 300 + Math.floor((Math.random() * 100) + 1), y : 190 + Math.floor((Math.random() * 120) + 1)};
    var defaultNote = new Note();
    return{
        type: "FETCH_NOTES_FULFILLED",
        payload:{
            notes: [defaultNote]
        }
    }
}
export function addNote(notes){
    var defaultPosition = {x : 300 + Math.floor((Math.random() * 100) + 1), y : 190 + Math.floor((Math.random() * 120) + 1)};
    var defaultNote = new Note();
    defaultNote.position = defaultPosition;
    defaultNote.id = notes ? notes : 0;
    return{
        type: "ADD_NOTE",
        payload:{
            note: defaultNote
        }
    }
}
export function updateNote(id, text){
    return{
        type: "UPDATE_NOTE",
        payload:{
            id,
            text
        }
    }
}
export function removeNote(id){
    return{
        type: "REMOVE_NOTE",
        payload:{
            id,
        }
    }
}
export function savePosition(id, newPosition){
    return{
        type: "UPDATE_NOTE_POSITION",
        payload:{
            id,
            newPosition,
        }
    }
}


//everything else

export function sortCompetences(notPriorityComps, priorityComps){
    return{
        type: "SORT_COMPETENCES",
        payload:{
            notPriorityComps,
            priorityComps

        }
    }
}

export function save(){
    return{
        type: "SAVE"
    }
}

export function makeSwitch(){
    return{
        type: "SWITCH"
    }
}

export function loadData(){
    var notes = [];
    var note1 = new Note();
    var note2 = new Note();
    var note3 = new Note();
    note1.text = "hej";
    note1.position = {x: 600, y: 100}
    note2.text = "med";
    note2.position = {x: 700, y: 100}
    note3.text = "dig";
    note3.position = {x: 50, y: 270}
    note1.id = 0;
    note2.id = 1;
    note3.id = 2;
    notes.push(note1);
    notes.push(note2);
    notes.push(note3);

    var competences = [];
    var comp1 = new Competence();
    var comp2 = new Competence();
    var comp3 = new Competence();
    comp1.text = "hej";
    comp2.text = "med";
    comp2.priority = "1";
    comp3.text = "dig";
    comp1.id = 0;
    comp2.id = 1;
    comp3.id = 2;
    competences.push(comp1);
    competences.push(comp2);
    competences.push(comp3);

    var jobs = [];
    var job1 = new Job();
    var job2 = new Job();
    var job3 = new Job();
    job1.text = "hej";
    job2.text = "med";
    job3.text = "dig";
    job1.id = 0;
    job2.id = 1;
    job3.id = 2;
    jobs.push(job1);
    jobs.push(job2);
    jobs.push(job3);



    return{
        type: "LOAD_DATA",
        payload:{
            notes: notes,
            competences: competences,
            jobs: jobs,
        }
    }
}