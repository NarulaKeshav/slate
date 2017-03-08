import React, { Component } from 'react';

class InputItem extends Component {
    render() {
        return (
            <div className="col-md-12 header-input">
                <div className="col-md-10 col-md-offset-1">
                    <input 
                        className="form-control" 
                        placeholder="from 12-4 today, do eat food and party hard" 
                        onKeyPress={this._onInputEnter.bind(this)}/>
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
            e.target.value = '';
            let enteredTask = this._parseInput(inputValue.toLowerCase());
            this.props.addTask(enteredTask);
        }
    }

    _parseInput(value) {
        console.log(value);
        // need to grab "FROM" and then the time
        let taskArr = value.split(': ');
        let taskList = taskArr[1].split(', ');

        // Get Tasks
        let taskTime = taskArr[0].substring(taskArr[0].indexOf('from') + 4);

        // Get the Time Range
        let timeRange = this._findRange(taskTime.trim());

        // Get Start and End Time
        let startTime = this._startTime(taskTime.trim());
        let endTime = this._endTime(taskTime.trim());
        return { timeRange, startTime, endTime, do: taskList };
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
        let startTimeVal = parseInt(timePeriod.substring(0, 1), 10);
        return this._numToStr(startTimeVal);
    }

    _endTime(timePeriod) {
        let endTimeVal = parseInt(timePeriod.substring(timePeriod.length -1), 10);
        return this._numToStr(endTimeVal);
    }

    _numToStr(val) {
        let numToStr = [];
        numToStr[1] = 'one';
        numToStr[2] = 'two';
        numToStr[3] = 'three';
        numToStr[4] = 'four';
        numToStr[5] = 'five';
        numToStr[6] = 'six';
        numToStr[7] = 'seven';
        numToStr[8] = 'eight';
        numToStr[9] = 'nine';
        numToStr[10] = 'ten';
        numToStr[11] = 'eleven';
        numToStr[12] = 'twelve';
        return numToStr[val];
    }
}

export default InputItem;