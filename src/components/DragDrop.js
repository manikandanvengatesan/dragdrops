import React, { useState } from 'react';
import '../styles/dragdrop.css';
import Modal from './Modal';

let initialTasks = [
    { id: 1, taskName: "Read book", type: "todo", backgroundColor: "red", ordering: 1 },
    { id: 2, taskName: "Pay bills", type: "todo", backgroundColor: "green", ordering: 2 },
    { id: 3, taskName: "Pay Credit bill", type: "inProgress", backgroundColor: "red", ordering: 1 },
    { id: 4, taskName: "Do yoga", type: "inProgress", backgroundColor: "green", ordering: 2 },
    { id: 5, taskName: "Go to the gym", type: "Done", backgroundColor: "blue", ordering: 3 },
    { id: 6, taskName: "Play baseball", type: "Done", backgroundColor: "green", ordering: 4 }
];

function DragDrop() {
    const [data, setData] = useState(initialTasks);
    const [showModal, setShowModal] = useState(false)
    const onDragStart = (event, taskName) => {
        console.log('dragstart on div: ', taskName);
        event.dataTransfer.setData("taskName", taskName);
    }
    const toggle = () => {
        setShowModal(!showModal);
    }
    const onDragOver = (event) => {
        event.preventDefault();
    }
    const addTask = (input) => {
        let task = {
            id: data.length + 1,
            taskName: input,
            type: "todo",
            backgroundColor: "red",
            ordering: data.length + 1
        }
        let newData = data;
        newData.push(task)
        setData(newData);
        setShowModal(!showModal)
    }
    const onDrop = (event, cat) => {
        let taskName = event.dataTransfer.getData("taskName");
        let filteredData = data.filter((task) => {
            if (task.taskName === taskName) {
                task.type = cat;
            }
            return task;
        });
        setData(
            filteredData
        );
    }

    let tasks = {
        todo: [],
        inProgress: [],
        Done: []
    }

    data.forEach((task) => {
        tasks[task.type].push(
            <div key={task.id}
                onDragStart={(event) => onDragStart(event, task.taskName)}
                draggable
                className="card draggable"
                style={{ backgroundColor: task.bgcolor }}>
                {task.taskName}
            </div>
        );
    });

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark mb-3">
                <h3><span className="badge badge-secondary">Home</span></h3>
            </nav>
            <div className="row">
                <div className="col-md-4">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(true)}>Add Tasks</button>
                </div>
            </div>
            <div className="container drag-container">
                <div className="row">
                    <div className="card col-md-3 container inProgress"
                        onDragOver={(event) => onDragOver(event)}
                        onDrop={(event) => { onDrop(event, "todo") }}>
                        <span className="group-header badge badge-secondary"><h4>To-DO</h4></span>
                        <div className="col-md-8 offset-md-2">{tasks.todo}</div>
                    </div>
                    <div className="card col-md-3 container inProgress"
                        onDragOver={(event) => onDragOver(event)}
                        onDrop={(event) => { onDrop(event, "inProgress") }}>
                        <span className="group-header badge badge-secondary"><h4>In Progress</h4></span>
                        <div className="col-md-8 offset-md-2">{tasks.inProgress}</div>
                    </div>
                    <div className="card col-md-3 container droppable"
                        onDragOver={(event) => onDragOver(event)}
                        onDrop={(event) => { onDrop(event, "Done") }}>
                        <span className="group-header badge badge-secondary"><h4>Done</h4></span>
                        <div className="col-md-8 offset-md-2">{tasks.Done}</div>
                    </div>
                    <div className="card col-md-3 container inProgress"
                        onDragOver={(event) => onDragOver(event)}
                        onDrop={(event) => { onDrop(event, "todo") }}>
                        <span className="group-header badge badge-secondary"><h4>Tasks</h4></span>
                        <div className="col-md-12">
                            <pre className="preStyle">
                                {JSON.stringify(initialTasks, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isShowing={showModal} hide={toggle} addNewTask={addTask} />
        </div>
    )
}

export default DragDrop;
