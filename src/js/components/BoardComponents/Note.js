import React from 'react'
// import style from "../../public/style.css"
import Draggable from 'react-draggable';

var Note = React.createClass({

    render: function() {

        return (
                    <div className="note" >
                        <a className="removeNote" onClick={() => this.props.onRemove("notes", this.props.id)}>x</a>
                        <textarea type="text"
                            placeholder="Enter note title"
                            onChange={(event) => this.props.onTextChange("notes", this.props.id, event)}
                            value = {this.props.value}
                            />
                            </div>
);
}
});

export default Note
