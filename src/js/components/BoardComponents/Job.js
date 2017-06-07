import React from 'react'

var Job = React.createClass({

render: function() {
        return (
                    <li className="job" >
                        <textarea
                            id="job"
                            type="text"
                            placeholder="Enter job title"
                            onChange={(event) => this.props.onTextChange("jobs", this.props.id, event)}
                            value = {this.props.value}
                        />
                         <a className="removeButton" onClick={() => this.props.onRemove("jobs", this.props.id)}>x</a>
                    </li>
);
}
});

export default Job