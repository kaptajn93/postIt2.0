import React from "react"
import Board from "./Board.js"

export default class Container extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }

  scrollToPriority(){
    var getDiv = document.getElementsByClassName("board");
    getDiv[0].style.transform = 'translateX(-33.34%)';
}
onPrev(){
var getDiv = document.getElementsByClassName("board");
    getDiv[0].style.transform = 'translateX(0%)';
}

  render() {
    return (
      <div className="container">

            <div style={{"width":"3%", "height":"100%", "display":"inline", "float": "left"}}>
                <button className="moveBack" style= {{"backgroundColor": "white"}} onClick={this.onPrev.bind(this)}><span></span></button> 
            </div>
          
                <Board className="board"/>
          
            <div style={{"width":"3%", "height":"100%", "display":"inline", "float": "left"}}>
                <button className="moveNext" style= {{"backgroundColor": "white"}} onClick={this.scrollToPriority.bind(this)}><span></span></button> 
            </div>

      </div>
    );
  }
}
