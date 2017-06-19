import React from "react";
import { connect } from "react-redux";
import Container from "./Container";
import { fetchJobs, fetchJobsFulfilled, fetchNotesFulfilled, loadData, addNote } from "../actions/index"

export class Layout extends React.Component {
  constructor(props) {
    super(props);
  
  }
  componentWillMount(){

   this.props.dispatch(loadData()); 
    // this.props.dispatch(fetchJobsFulfilled());
    // this.props.dispatch(addNote());
  }

  render() {
    console.log("from postIt")
    console.log(this.props)
    // const {someJobs, someCompetences} = this.props;
    return (
      <div>
        <br/>
        <Container />
      </div>
    );
  }
}
Layout = connect( (store) => {
  return{
    jobs: store.jobReducer.jobs,
    competences: store.competenceReducer.competences,
    notes: store.noteReducer.notes,
  }
})(Layout);
export default Layout;
