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

save(){
  this.savePosition();
  this.props.dispatch(actions.save());
}

savePosition(){
    var priorityComps = [];
    var searchEles = document.getElementsByClassName("olDiv")[0].children;
    for (var i = 0; i < searchEles.length; i++) {
        var element = searchEles[i];
        priorityComps.push({id: element.id, value: element.firstChild.value});
    }
    this.props.dispatch(actions.updatePriotity(priorityComps))
        console.log(priorityComps); //second console output
}

onDragStop (index, event){
    var newPosition = {x: event.x, y: event.y};
    this.props.dispatch(actions.savePosition(index, newPosition));
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
    if (componentBackingInstance) {
      let options = {
        draggable: ".competence",  // Restricts sort start click/touch to the specified element
        group: "shared"
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


  render() {
      console.log("from Board: ")
      console.log(this.props)
       const dragHandlers = { onStart: this.onStart, onStop: this.onStop };

    function getCompetences(whatToReturn, competences){
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
            return priorityComps;
        }
        else{
            return notPrioritizedComps;
        }
    };
      
       


    return (
        <div style={{"width":"94%", "height":"100%", "display":"inline", "float": "left", "overflow": "hidden"}} >
            <div className="board" ref={this.sortableContainersDecorator}>

                 { this.props.notes.map((note, index) =>
                    <Draggable defaultPosition={note.position /*{x : 300 + Math.floor((Math.random() * 100) + 1), y : 190 + Math.floor((Math.random() * 120) + 1)}*/} bounds={"parent"} { ...dragHandlers}  onStop={(event)=> this.onDragStop(index, event)}>
                        <div className="moveableArea" /*style={{ "transform": "translate(" + note.position.x + ","+ note.position.y + ")"}}*/  >
                            <Note
                            key={index}
                            id={index}
                            onRemove={this.removeSomething.bind(this)}
                            onTextChange={this.someTextChanged.bind(this)}
                            value = {note.text}
                            />
                        </div>
                    </Draggable>
                )}

                    <ul className="jobsDiv">
                        {this.props.jobs.map((job, index) =>
                        <Job
                        key={"job " + index}
                        id={index}
                        onRemove={this.removeSomething.bind(this)}
                        onTextChange={this.someTextChanged.bind(this)}
                        value = {job.text}
                        />
                        )}
                    </ul>
                    <ul className="compDiv" ref={this.sortableGroupDecorator}>
                        { getCompetences("notPrioritizedComps", this.props.competences).map((competence) =>
                                    <Competence
                                    key={"competence " + competence.id}
                                    id={ competence.id}
                                    onRemove={this.removeSomething.bind(this)}
                                    onTextChange={this.someTextChanged.bind(this)}
                                    value = {competence.text}
                                    />
                        )}
                    </ul>
                <div className="hiddenDiv">
                    <ol className="olDiv" ref={this.sortableGroupDecorator}>
                        { getCompetences("priorityComps", this.props.competences).map((competence) =>
                                <Competence
                                    key={"competence " + competence.id}
                                    id={competence.id}
                                    onRemove={this.removeSomething.bind(this)}
                                    onTextChange={this.someTextChanged.bind(this)}
                                    value = {competence.text}
                                />
                        )}
                    </ol>
                </div>
            </div>
            <div style={{"position": "relative", "top": "-10%", "right": "0%"}}>
                <Button floating icon='horizontal' icon='save' className='blue' large onClick={this.save.bind(this)} style={{"float": "right", "marginTop": "-2.3%", "marginRight": "2.3%"}}/>
                <Button floating fab='horizontal' icon='add' className='green' large>
                    <Button floating icon="note" className='yellow' tooltip='addnote' onClick={() => this.addSomething("notes")}/>
                    <Button floating icon='business_center' className='orange' tooltip='add job' onClick={() => this.addSomething("jobs")}/>
                    <Button floating icon='equalizer' className='blue'  onClick={() => this.addSomething("competences", this.props.competences[this.props.competences.length -1 ].id + 1)}/>
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
