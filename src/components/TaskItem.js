import React, { Component } from 'react';

class TaskItem extends Component {
    render() {
        return (
            <li>{this.props.name}</li>
        )
    }
} 

export default TaskItem;