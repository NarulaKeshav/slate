import React from 'react';
import TaskItem from './TaskItem';
import Logo from '../../public/img/logo.svg'

const TaskBlock = (props) => {
    let tasks = props.tasks;
    let keyCounter = -1;
    let randomKey = () => {
        return++ keyCounter;
    }
    const earlyTasks = tasks.twelveToThree.items.map(task => {
        const taskItems = task['do'].map(eachTask => {
            return (<TaskItem name={eachTask} key={randomKey()}/>)
        });
        return (
            <div className="col-md-10 col-md-offset-1 CardList">
                <div className="col-md-12 CardItem">
                    <p>{task.time}</p>
                    {taskItems}
                </div>
            </div>
        )
    });
    // Mid
    const midTasks = tasks.fourToSeven.items.map(task => {
        const taskItems = task['do'].map(eachTask => {
            return (<TaskItem name={eachTask} key={randomKey()}/>)
        });
        return (
            <div className="col-md-10 col-md-offset-1 CardList">
                <div className="col-md-12 CardItem">
                    <p>{task.time}</p>
                    {taskItems}
                </div>
            </div>
        )
    });
    // Late
    const lateTasks = tasks.eightToEleven.items.map(task => {
        const taskItems = task['do'].map(eachTask => {
            return (<TaskItem name={eachTask} key={randomKey()}/>)
        });
        return (
            <div className="col-md-10 col-md-offset-1 CardList">
                <div className="col-md-12 CardItem">
                    <p>{task.time}</p>
                    {taskItems}
                </div>
            </div>
        )
    });

    // If/else
    var currentDisplay = () => {
        let morningTasks = Object.keys(earlyTasks).length === 0;
        let eveningTasks = Object.keys(midTasks).length === 0;
        let laterTasks = Object.keys(lateTasks).length === 0;
        console.log('1:', morningTasks);
        console.log('2:', eveningTasks);
        console.log('3:', laterTasks);
        if (morningTasks && eveningTasks && laterTasks) {
            console.log('show default');
            return (
                <div className="TaskRange text-center">
                    <h1>🤘</h1>
                    <h2>Stars Can't Shine without Darkness :)</h2>
                </div>
            );
        } else {
            console.log('show tasks');
            return (
                <div className="TaskRange">
                    <p>Today&apos;s Schedule</p>
                    <ul>{earlyTasks}</ul>
                    <ul>{midTasks}</ul>
                    <ul>{lateTasks}</ul>
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
