import React from 'react'

var Competence = React.createClass({

render: function() {
        return (
        //     <div className="competence" id={this.props.id} >
                    <li className="competence" id={this.props.id} key={this.props.id}>
                            <textarea id="competence" type="text"
                                placeholder="Enter competence title"
                                onChange={(event) => this.props.onTextChange("competences", this.props.id, event)} 
                                defaultValue = {this.props.value}
                            />
                            <a className="removeButton" onClick={() => this.props.onRemove("competences",this.props.id)}>x</a>
                    </li>

            /*</div>*/
);
}
});

export default Competence