import React, {Component} from 'react';
import InputItem from './components/InputItem';
import TaskBlock from './components/TaskBlock';

// Import CSS
import '../public/css/design.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            todayTasks: {
                // From 12-3
                twelveToThree: {
                    range: '12–3 PM',
                    items: []
                },
                // From 4-7
                fourToSeven: {
                    range: '4–7 PM',
                    items: []
                },
                // From 8-11
                eightToEleven: {
                    range: '8–11 PM',
                    items: []
                }
            }
        };
        this._addTask = this._addTask.bind(this);
    }
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
   * [ { time: '3-4', items: [] } ]
   */
    _addTask(task) {
        let tasks = this.state.todayTasks;

        // Pushes and add and array to the end of 'taskArr'
        let taskArr = tasks[task[0].timeRange].items;

        // Push items to the array
        for (let item of task) {
            taskArr.push({
                time: item.time,
                do : item.do
                    }
                );
        }

        // Updates the state
        this.setState({todayTasks: tasks});
    }
}

export default App;

/*
let todayTasks: {
  twelveToThree: {
    twelve: {
      items: ['Read book', 'Do homework']
    },
    one: {
      items: ['Read book', 'Do homework']
    },
    two: {
      items: ['Read book', 'Do homework']
    },
    three: {
      items: ['Read book', 'Do homework']
    }
  }
}
 */
