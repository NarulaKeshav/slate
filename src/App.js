import React, { Component } from 'react';
import InputItem from './components/InputItem';

// Import CSS
import '../public/css/design.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todayTasks: {
        // From 12-3
        twelveToThree: {
          twelve: { items: [] },
          one: { items: [] },
          two: { items: [] },
          three: { items: [] }
        },
        // From 4-7
        fourToSeven: {
          four: { items: [] },
          five: { items: [] },
          six: { items: [] },
          seven: { items: [] }
        },
        // From 8-11
        eightToEleven: {
          eight: { items: [] },
          nine: { items: [] },
          ten: { items: [] },
          eleven: { items: [] }
        }
      }
    };
    this._addTask = this._addTask.bind(this);
  }
  render() {
    return (
      <div className="App">
        <InputItem addTask={this._addTask}/>
      </div>
    );
  }

  /**
   * Adds task to the todayTasks state
   * @param {object} task
   * task: { 
   *    timeRange: 'twelveToThree' 
   *    startTime: 'three',
   *    endTime: 'four',
   *    do: ['Sleep', 'Eat']
   * }
   */
  _addTask(task) {
    let tasks = this.state.todayTasks;
    
    // Pushes and add and array to the end of 'taskArr'
    let taskArr = tasks[task.timeRange][task.startTime].items;

    // Push items to the array
    for (let item of task.do) {
      taskArr.push(item);
    }

    // Updates the state
    this.setState({ todayTasks: tasks });
    console.log(this.state.todayTasks);
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
