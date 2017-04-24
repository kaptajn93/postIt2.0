import React from "react"
import Job from "./Board/Job"
import Competence from "./Board/Competence"


export default class Board extends React.Component {
    constructor() {
    super();
    this.state = {
      jobs: [new Job(), new Job(), new Job()],
      competences: [new Competence(), new Competence(), new Competence()]
    };
  }
  removeSomething(listName, index) {
        switch(listName){
        case "notes":
        var newList = this.state.notes;
        newList.splice(this.state.notes[index], 1);
        this.setState({ notes: newList });
        // var noteList = this.state.notes;
        // delete noteList[index];
        // this.setState({ notes: noteList });
        break;
        case "jobs":
        var newList = this.state.jobs;
        newList.splice(this.state.jobs.length - 1, 1);
        this.setState({ jobs: newList });
        // var newList = this.state.jobs;
        // delete newList[index];
        // this.setState({ jobs: newList });
        break;
        case "competences":
        newList = this.state.competences;
        newList.splice(this.state.competences.length - 1, 1);
        this.setState({ competences: newList });
        // var newList = this.state.competences;
        // delete newList[index];
        // this.setState({ competences: newList });
        break;
        default:
        alert("onSomeChange, list not found");
    }
    }

  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }


  render() {
    return (
        <div style={{"width":"94%", "height":"100%", "display":"inline", "float": "left", "overflow": "hidden", "overflowY": "scroll"}} >
            <div className="board">
                    <ul className="jobsDiv">
                        {this.state.jobs.map((job, index) =>
                        <Job 
                        key={index}
                        value={this.state.noteText}
                        id={index}
                        onRemoveJob={this.onRemoveSomething}
                        onChange={this.onSomeTextChange}
                        />
                        )}
                    </ul>
                    <ul className="compDiv">
                        {this.state.competences.map((competence, index) =>
                        <Competence
                        key={index}
                        value={this.state.noteText}
                        id={index}
                        onRemoveComp={this.removeSomething.bind(this)}
                        onChange={this.onSomeTextChange}
                        />
                        )}
                    </ul>
                <div className="hiddenDiv">
                    <ol className="olDiv">
                        <Competence/>
                         <Competence/>
                    </ol>
                </div>
            </div>
      </div>
    );
  }
}
