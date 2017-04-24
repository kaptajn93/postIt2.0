import React from 'react'

var Competence = React.createClass({



render: function() {
        return (
                    <li className="competence" id={this.props.id} >
                        <textarea id="competence" type="text"
                            placeholder="Enter competence title"
                            value={this.props.value}
                            onChange={(event) => this.props.onChange("competences" ,this.props.id, event.currentTarget.value)}  
                        />
                    <a className="removeButton" onRemoveComp={() => this.props.onRemoveComp("competences",this.props.id)}>x</a>
                    </li>
);
}
});

export default Competence