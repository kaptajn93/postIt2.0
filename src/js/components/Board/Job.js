import React from 'react'

var Job = React.createClass({

render: function() {
        return (
                    <li className="job" >
                        <textarea id="job" type="text"
                            placeholder="Enter job title"
                            onChange={(event) => this.textChange(this.props.id, event)}
                        />
                         <a className="removeButton" onClick={() => this.props.removeSomething("jobs", this.props.id)}>x</a>
                    </li>
);
}
});

export default Job