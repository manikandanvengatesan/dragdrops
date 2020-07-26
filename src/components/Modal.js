import React, { useState } from 'react';
import '../styles/Modal.css'
const Modal = ({ isShowing, hide, addNewTask }) => {
    const [name, setName] = useState("");
    return (
        isShowing ? <div className="modal show">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Add Task</h5>
                        <button type="button" className="close" data-dismiss="modal"
                            aria-label="Close" onClick={hide}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-12">
                                <label for="taskName">Task Name</label>
                                <input type="email" value={name} onChange={e => setName(e.target.value)} className="form-control" placeholder="Todo task name" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-
                            dismiss="modal" onClick={hide}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => addNewTask(name)}>Save changes</button>
                    </div>
                </div>
            </div>
        </div> : null
    );
}
export default Modal;