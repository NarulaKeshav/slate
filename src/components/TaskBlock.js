import React from 'react';
import TaskItem from './TaskItem';

const TaskBlock = (props) => {
    let tasks = props.tasks;
    const dailyTasks = tasks.items.map(eachTask => {
        return (
            <div className="col-md-10 col-md-offset-1 CardList">
                <div className="col-md-12 CardItem">
                    <p>{eachTask.time}</p>
                    <TaskItem name={eachTask.task} key={eachTask.startTime} />
                    <div className="TaskIcon">
                        <span className={eachTask.taskIcon}></span>
                    </div>
                </div>
            </div>
        )
    });

    var getTodaysDate = () => {
        let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let day = new Date().getDate();
        let month = monthArr[new Date().getMonth()];
        let year = new Date().getFullYear();
        let date = `${month} ${day}, ${year}`;
        return (
            <h4>{date}</h4>
        );
    }

    // If/else
    var currentDisplay = () => {
        let haveTasksToday = Object.keys(dailyTasks).length === 0;
        if (haveTasksToday) {
            return (
                <div className="TaskRange text-center">
                    <h1>🤘</h1>
                    <h2>Stars Can't Shine without Darkness :)</h2>
                </div>
            );
        } else {
            return (
                <div className="TaskRange">
                    {getTodaysDate()}
                    <ul>{dailyTasks}</ul>
                </div>
            );
        }
    }

    // Return Function
    return (
        <div className="col-md-8 col-md-offset-2 TaskList">
            {currentDisplay()}
        </div>
    )
}

export default TaskBlock;
