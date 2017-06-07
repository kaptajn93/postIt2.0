import React from "react";
import { connect } from "react-redux";
import Container from "./Container";
import { fetchJobs, fetchJobsFulfilled, fetchNotesFulfilled, loadData } from "../actions/index"

export class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Welcome",
    };
  }
  componentWillMount(){

   this.props.dispatch(loadData()); 
    // this.props.dispatch(fetchJobsFulfilled());
    // this.props.dispatch(fetchNotesFulfilled());
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
    jobReducer: store.jobReducer,
    competenceReducer: store.competenceReducer,
    notes: store.noteReducer.notes,
  }
})(Layout);
export default Layout;
