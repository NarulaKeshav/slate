import React, {Component} from 'react';
import InputItem from './components/InputItem';
import TaskBlock from './components/TaskBlock';

// Import CSS
import '../public/css/design.css';

class App extends Component {

    // Construct with object on tasks/items
    constructor() {
        super();
        this.state = {
            todayTasks: {
                items: []
            }
        };
        this._addTask = this._addTask.bind(this);
    }

    // Render function
    render() {
        return (
            <div className="App">
                <InputItem addTask={this._addTask}/>
                <TaskBlock tasks={this.state.todayTasks}/>
            </div>
        );
    }

    /**
   * Adds task to the todayTasks state
   * @param {object} task
   * [{start: 2, end: 3, do: 'something'}]
   */
    _addTask(task) {
        let tasks = this.state.todayTasks;

        // Pushes and add and array to the end of 'taskArr'
        let taskItems = tasks.items;
        let currentTask = task[0];

        // Add to Array
        taskItems.push({
            time: currentTask.time,
            startTime: currentTask.startTime,
            endTime: currentTask.endTime,
            task: currentTask.task,
            taskIcon: currentTask.taskIcon
        });

        // Sort by startTime
        this.sortTasks(taskItems);

        // Updates the state
        this.setState({todayTasks: tasks});
    }

    sortTasks = (arr) => {
        return arr.sort((a,b) => {
            let x = a['startTime'];
            let y = b['startTime'];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
 }

export default App;
