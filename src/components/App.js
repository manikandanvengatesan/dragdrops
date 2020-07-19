import React, { useEffect } from 'react';
import '../styles/App.css';

function App() {

  useEffect(() => {
    dragElement(document.getElementById("mydiv"));
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row">
            <div id="mydiv" className="col-sm-3 mydiv">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h2>Heading</h2>
                  </div>
                  <div className="card-text">
                    Some text will go here...
                  </div>
                </div>
              </div>
            </div>
            {/* <div class="col-sm">
              One of three columns
            </div>
            <div class="col-sm">
              One of three columns
            </div> */}
          </div>
        </div>
      </header>
    </div>
  );
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export default App;
