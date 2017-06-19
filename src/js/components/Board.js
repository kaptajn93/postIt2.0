import React from "react"
import Job from "./BoardComponents/Job"
import Note from "./BoardComponents/Note"
import Competence from "./BoardComponents/Competence"
import * as actions from "../actions/index"
import { connect } from "react-redux";
import Sortable from 'sortablejs'
import Draggable from 'react-draggable';
import { Button, Row, Col, Icon } from 'react-materialize';


export class Board extends React.Component {
    constructor(props) {
    super(props);
}

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.competences !== nextProps.competences) {
    //         this.setState();
    //     }
    // }

    save(){
        this.savePriority();
        this.props.dispatch(actions.save());
    }

    switch(){
        this.props.dispatch(actions.makeSwitch());
    }

     sortCompetences(){
        var priorityComps = [];
        var notPriorityComps = [];

        var searchNotPri = document.getElementsByClassName("compDiv")[0].children;
        var searchPri = document.getElementsByClassName("olDiv")[0].children;

        for (var i = 0; i < searchNotPri.length; i++) {
            var element = searchNotPri[i];
            notPriorityComps.push({id: element.id, value: element.firstChild.value});
        }
         for (var i = 0; i < searchPri.length; i++) {
            var element = searchPri[i];
            priorityComps.push({id: element.id, value: element.firstChild.value});
        }
        this.props.dispatch(actions.sortCompetences(notPriorityComps, priorityComps));
    }

    savePriority(){
        var priorityComps = [];
        var searchEles = document.getElementsByClassName("olDiv")[0].children;
        for (var i = 0; i < searchEles.length; i++) {
            var element = searchEles[i];
            priorityComps.push({id: element.id, value: element.firstChild.value});
        }
        this.props.dispatch(actions.updatePriotity(priorityComps))
            console.log(priorityComps); //second console output
    }

    onDragStop (id, event){
        var newPosition = {x: event.x, y: event.y};
        if(this.props.notes[id].position !== newPosition){
            this.props.dispatch(actions.savePosition(id, newPosition));
        }
       
    }

    sortableContainersDecorator (componentBackingInstance){
        // check if backing instance not null
        if (componentBackingInstance) {
            let options = {
                handle: ".comp", // Restricts sort start click/touch to the specified element
            };
            Sortable.create(componentBackingInstance, options);
        }
    }
    sortableGroupDecorator (componentBackingInstance){
        // check if backing instance not null
        let that = this;
        let props = window.props;
        if (componentBackingInstance) {
            let options = {
                draggable: ".competence",  // Restricts sort start click/touch to the specified element
                group: "shared",
                onUpdate: function (event) {

                    //call sortCompetences her 
                    var item = Board;
                    var win = window;
                    var props = props;
                 }
            };
            Sortable.create(componentBackingInstance, options);
        }
    }

    removeSomething(listName, index) {
        switch(listName){
            case "notes":
            this.props.dispatch(actions.removeNote(index));

            break;
            case "jobs":
            this.props.dispatch(actions.removeJob(index));
            
            break;
            case "competences":
            this.props.dispatch(actions.removeCompetence(index));

            break;
            default:
            alert("onRemove, list not found");
        }
    }

    handleChange(e) {
        const title = e.target.value;
        this.props.changeTitle(title);
        }
    addSomething(listName, listLength){
        switch(listName){
            case "jobs":
            this.props.dispatch(actions.addJob(listLength))
            break;
            case "competences":
            this.props.dispatch(actions.addCompetence(listLength))
            break;
            case "notes":
            this.props.dispatch(actions.addNote(listLength))
            break;
            default:
            alert("onSomeChange, list not found");
        }
    }
    
    someTextChanged(listName, index, event){
        var newText = event.currentTarget.value;
        switch(listName){
        case "jobs":
        this.props.dispatch(actions.updateJob(index, event.currentTarget.value))
        break;
        case "competences":
        this.props.dispatch(actions.updateCompetence(index, event.currentTarget.value))
        break;
        case "notes":
        this.props.dispatch(actions.updateNote(index, event.currentTarget.value))
        break;
        default:
        alert("onSomeChange, list not found");
        }
    }

    getCompetences(whatToReturn, competences){
        var notPrioritizedComps = [];
        var priorityComps = [];
        if(competences !== 'undefined'){
            for (var i = 0; i < competences.length; i++) {
                var comp = competences[i];
                if(typeof comp.priority == 'undefined'){
                    notPrioritizedComps.push(comp);
                }
                else{
                    priorityComps.push(comp);
                }
            }
        }
        if(whatToReturn == "priorityComps"){
            console.log("getCompetences returning: priority")
            return priorityComps;
        }
        else{
            console.log("getCompetences returning: not priority")
            return notPrioritizedComps;
        }
    };

    render() {
        console.log("from Board: ")
        console.log(this.props)
        console.log(this.state)
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };

    
    const notes = this.props.notes.map((note) =>{
        return     <Draggable defaultPosition={note.position} bounds={"parent"} { ...dragHandlers}  onStop={(event)=> this.onDragStop(note.id, event)} key = {note.id}>
                        <div className="moveableArea" /*style={{ "transform": "translate(" + note.position.x + ","+ note.position.y + ")"}}*/  >
                            <Note
                            key={note.id.toString()}
                            id={note.id}
                            onRemove={this.removeSomething.bind(this)}
                            onTextChange={this.someTextChanged.bind(this)}
                            value = {note.text}
                            />
                        </div>
                    </Draggable>
    })
    // const jobs = this.props.jobs.map((job) => {
    //     return  <Job
    //                     key={job.id.toString()}
    //                     id={job.id}
    //                     onRemove={this.removeSomething.bind(this)}
    //                     onTextChange={this.someTextChanged.bind(this)}
    //                     value = {job.text}
    //                 />
    // })

    const notPrioritizedComps = this.getCompetences("notPrioritizedComps", this.props.competences).map((competence) =>{

        return  <Competence
                    onEnd={() => this.onDragStop.bind(this)}
                    key={competence.id.toString()}
                    id={ competence.id}
                    onRemove={this.removeSomething.bind(this)}
                    onTextChange={this.someTextChanged.bind(this)}
                    value = {competence.text}
                />
                
    })
    // const priorityComps = this.getCompetences("priorityComps", this.props.competences).map((competence) => {
    //     console.log("P comp id: " + competence.text)
    //     return  <Competence
    //                 key={competence.id.toString()}
    //                 id={competence.id}
    //                 onRemove={this.removeSomething.bind(this)}
    //                 onTextChange={this.someTextChanged.bind(this)}
    //                 value = {competence.text}  
    //             />
    // })
       
    return (
        <div style={{"width":"94%", "height":"100%", "display":"inline", "float": "left", "overflow": "hidden"}} >
            <div className="board" ref={this.sortableContainersDecorator}>
                {notes}{/*
                    <ul className="jobsDiv">
                        {jobs}
                    </ul>*/}
                    <ul className="compDiv" ref={this.sortableGroupDecorator}>
                        {notPrioritizedComps}
                    </ul>
                {/*<div className="hiddenDiv">
                    <ol className="olDiv" ref={this.sortableGroupDecorator}>
                        {priorityComps}
                    </ol>
                    {console.log("after")}
                </div>*/}
            </div>
            <div style={{"position": "relative", "top": "-10%", "right": "0%"}}>
                <Button floating icon='horizontal' icon='switch' className='yellow' large onClick={this.switch.bind(this)} style={{"float": "right", "marginTop": "-2.3%", "marginRight": "2.3%"}}/>
                <Button floating icon='horizontal' icon='save' className='blue' large onClick={this.save.bind(this)} style={{"float": "right", "marginTop": "-2.3%", "marginRight": "2.3%"}}/>
                <Button floating fab='horizontal' icon='add' className='green' large>
                    <Button floating icon="note" className='yellow' tooltip='addnote' onClick={() => this.addSomething("notes", this.props.notes.length ? this.props.notes[this.props.notes.length -1 ].id + 1 : 0)}/>
                    <Button floating icon='business_center' className='orange' tooltip='add job' onClick={() => this.addSomething("jobs", this.props.jobs.length ? this.props.jobs[this.props.jobs.length -1 ].id + 1 : 0)}/>
                    <Button floating icon='equalizer' className='blue'  onClick={() => this.addSomething("competences", this.props.competences.length ? this.props.competences[this.props.competences.length -1 ].id + 1 : 0)}/>
                </Button>
            </div>

      </div>
    );
  }
}
Board = connect( (store) => {
  return{
    jobs: store.jobReducer.jobs,
    competences: store.competenceReducer.competences,
    notes: store.noteReducer.notes,
  }
})(Board);
export default Board;
