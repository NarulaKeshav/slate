import React, {Component} from 'react';
import Logo from '../../public/img/logo.svg'

class InputItem extends Component {
    constructor() {
        super();
        this.state = {
            taskIcon: 'fa fa-question',
            taskTypes: ['coffee', 'meeting', 'lunch', 'drinks', 'interview', 'study', 'hangout', 'party', 'hike', 'hiking', 'bike', 'biking']
        };
    }
    render() {
        return (
            <div className="col-md-12 header-input">
                <div className="text-center">
                    <img className="AppLogo" src={Logo} alt="Slate logo"/>
                </div>
                <div className="col-md-8 col-md-offset-2">
                    <div className="TaskType">
                        <span className={this.state.taskIcon}></span>
                    </div>
                    <input className="form-control" placeholder="From 12 to 1: Lunch with the Team" onKeyPress={this._onInputEnter.bind(this)} onKeyUp={e => {this._changeTaskIconOnKeyup(e)}}/>
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
            this.setState({taskIcon: 'fa fa-question'})
            let enteredTask = this._parseInput(inputValue);
            this.props.addTask(enteredTask);
        }
    }

    _parseInput(value) {
        // need to grab "FROM" and then the time
        // let taskArr = value.split(':');
        // let inputTime = taskArr[0].trim().toLowerCase();
        // let task = taskArr[1].trim();
        let colon = this._lastColon(value);
        let inputTime = this._trim(value.slice(0, colon).toLowerCase());
        let task = this._trim(value.slice(colon + 1));
        let taskIcon = this.state.taskIcon;

        // Extracting time
        let taskTime = inputTime.substring(inputTime.indexOf('from') + 4);

        // Get Start and End Time
        let startTime = this._startTime(taskTime.trim());
        let endTime = this._endTime(taskTime.trim());
        let time = `${startTime}–${endTime} PM`;

        // Return array of object with time, startTime, endTime, task
        let taskObj = {
            time,
            startTime,
            endTime,
            task,
            taskIcon
        };
        return [taskObj];
    }

    _startTime(timePeriod) {
        return timePeriod.substring(0, timePeriod.indexOf('-'));
    }

    _endTime(timePeriod) {
        return timePeriod.substring(timePeriod.indexOf('-') + 1, timePeriod.length);
    }

    _lastColon(inputValue) {
        let i = inputValue.length - 1;
        let semiFound = false;
        while (i > 0 || !semiFound) {
            if (inputValue.substring(i, i-1) === ':') {
                return i-1;
            } else i--;
        }
    }

    _trim(str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    _changeTaskIconOnKeyup(e) {
        let input = e.target.value;
        let tasks = this.state.taskTypes;
        let index;
        if (tasks.some(function(v) {
            if (input.indexOf(v) > -1) {
                // There's at least one
                index = v;
            }
            return input.indexOf(v) >= 0;
        })) {
            let action = input.slice(input.indexOf(index));
            let actionTerm = action.split(' ')[0];
            this._findIcon(actionTerm.toLowerCase());
        }
    }

    // 'coffee', 'meeting', 'lunch', 'drinks', 'interview', 'study', 'hangout', 'party', 'hike', 'hiking', 'bike', 'biking']
    _findIcon(action) {
        switch (action) {
            case 'coffee':
                this.setState({taskIcon: 'fa fa-coffee'});
                break;
            case 'meeting' || 'meet':
                this.setState({taskIcon: 'fa fa-briefcase'});
                break;
            case 'lunch':
                this.setState({taskIcon: 'fa fa-cutlery'});
                break;
            case 'drinks' || 'drink' || 'party':
                this.setState({taskIcon: 'fa fa-beer'});
                break;
            case 'interview':
                this.setState({taskIcon: 'fa fa-black-tie'});
                break;
            case 'study' || 'studying':
                this.setState({taskIcon: 'fa fa-book'});
                break;
            case 'hangout':
                this.setState({taskIcon: 'fa fa-paw'});
                break;
            case 'hike' || 'hiking':
                this.setState({taskIcon: 'fa fa-globe'});
                break;
            case 'bike' || 'biking':
                this.setState({taskIcon: 'fa fa-bicycle'});
                break;
            default:
                this.setState({taskIcon: 'fa fa-question'});
                break;
        }
    }
}

export default InputItem;
