import React, {Component} from 'react';
import Logo from '../../public/img/logo.svg'

class InputItem extends Component {
    render() {
        return (
            <div className="col-md-12 header-input">
                <div className="text-center">
                    <img className="AppLogo" src={Logo} alt="Slate logo"/>
                </div>
                <div className="col-md-8 col-md-offset-2">
                    <input className="form-control" placeholder="12-1: Meeting with team, Party " onKeyPress={this._onInputEnter.bind(this)}/>
                </div>
            </div>
        )
    }

    /**
     * On input enter, parse string and return object
     * @param { event } e
     */
    _onInputEnter(e) {
        if (e.key === 'Enter') {
            let inputValue = e.target.value;
            // If starts from: from
            // - Task
            // If starts from: at
            // - Reminder
            e.target.value = '';
            let enteredTask = this._parseInput(inputValue.toLowerCase());
            this.props.addTask(enteredTask);
        }
    }

    _parseInput(value) {
        // need to grab "FROM" and then the time
        let taskArr = value.split(': ');
        let taskList = taskArr[1].split(', ');

        // Get Tasks
        let taskTime = '';
        if (taskArr[0].startsWith('from')) {
            taskTime = taskArr[0].substring(taskArr[0].indexOf('from') + 4);
        } else if (taskArr[0].startsWith('at')) {
            taskTime = taskArr[0].substring(taskArr[0].indexOf('at') + 4);
        }

        // Get the Time Range
        let timeRange = this._findRange(taskTime.trim());

        // Get Start and End Time
        let startTime = this._startTime(taskTime.trim());
        let endTime = this._endTime(taskTime.trim());
        let time = startTime + endTime;
        return [
            {
                timeRange,
                time,
                do : taskList
        }
        ];
    }

    _findRange(timePeriod) {
        // timePeriod: 3-6 or 3 to 6
        // Returns 'twelveToThree', 'fourToSeven', or 'eightToEleven'
        let startTime = parseInt(timePeriod.substring(0, 1), 10); // 3 or 4
        return (startTime === 12 || startTime === 1 || startTime === 2 || startTime === 3)
            ? 'twelveToThree'
            : (startTime === 4 || startTime === 5 || startTime === 6 || startTime === 7)
                ? 'fourToSeven'
                : 'eightToEleven';
    }

    _startTime(timePeriod) {
        console.log('timePeriod:', timePeriod);
        let startTimeVal = timePeriod.substring(0, timePeriod.indexOf('-')); // 10:30–
        // return startTimeVal + '–';
        return `${startTimeVal}–`
    }

    _endTime(timePeriod) {
        let endTimeVal = timePeriod.substring(timePeriod.indexOf('-') + 1, timePeriod.length); // 11:30
        // return endTimeVal + ' PM';
        return `${endTimeVal} PM`;
    }
}

export default InputItem;
