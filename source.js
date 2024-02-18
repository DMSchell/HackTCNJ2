
/*import { GoogleGenerativeAI } from "@google/generative-ai";
 
const Your_API_Key = "AIzaSyDCKm38Gqmwu1YywB6paoSkVXlJ-qLHKUk"
const genAI = new GoogleGenerativeAI(Your_API_Key);

*/
var NoteContainer = document.getElementById('container');
var DragTarget = null;


NoteContainer.addEventListener('mousedown', function(event) {


    if (event.target.classList.contains('note-dragger')) {
        DragTarget = event.target;
        var startMousePos = { x: event.clientX, y: event.clientY };
        var startDivPos = { x: DragTarget.offsetLeft, y: DragTarget.offsetTop };


        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);


        function onMouseMove(event) {
            var newPosition = {
                x: startDivPos.x + (event.clientX - startMousePos.x),
                y: startDivPos.y + (event.clientY - startMousePos.y)
            };
       
            //make sure the note stays within the container
            var containerRect = container.getBoundingClientRect();
            if (newPosition.x <  0) {
                newPosition.x =  0;
            } else if (newPosition.x + DragTarget.offsetWidth > containerRect.width) {
                newPosition.x = containerRect.width - DragTarget.offsetWidth;
            }
       
            if (newPosition.y <  0) {
                newPosition.y =  0;
            } else if (newPosition.y + DragTarget.offsetHeight > containerRect.height) {
                newPosition.y = containerRect.height - DragTarget.offsetHeight;
            }
       
            //change the position of the note
            //sometimes the whole container moves so that's not good
            DragTarget.style.left = newPosition.x + 'px';
            DragTarget.style.top = newPosition.y + 'px';
           
        }


        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }
    if (event.target.classList.contains('note-sizer')) {
        DragTarget = event.target;
        event.preventDefault();
        var startMousePos = { x: event.clientX, y: event.clientY };
        var startSize = { width: DragTarget.parentElement.offsetWidth, height: DragTarget.parentElement.offsetHeight };


        function onMouseMove(event) {
            var newSize = {
                width: startSize.width + (event.clientX - startMousePos.x),
                height: startSize.height + (event.clientY - startMousePos.y)
            };


            // Update the new-note size
            DragTarget.parentElement.style.width = newSize.width + 'px';
            DragTarget.parentElement.style.height = newSize.height + 'px';
            DragTarget.parentElement.parentElement.style.width = newSize.width + 2 + 'px';
            DragTarget.parentElement.parentElement.style.height = newSize.height + 'px';
        }


        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);


        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }
});


// Create a custom context menu
var contextMenu = document.createElement('div');
contextMenu.id = 'custom-context-menu';
contextMenu.style.display = 'none';
contextMenu.style.position = 'absolute';
contextMenu.style.zIndex = '1000';
contextMenu.style.backgroundColor = '#343a40';
contextMenu.style.color = '#ccc';
contextMenu.style.border = '1px solid #ccc';
contextMenu.style.paddingRight = '25px';
contextMenu.style.fontSize = '12';
contextMenu.innerHTML = '<ul><li id="option1">Create a new note</li></ul>';
document.body.appendChild(contextMenu);


// Add event listeners to the document
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    MakeNewNote();
});

function createArrow(startX, startY, endX, endY) {
    // Create an SVG element
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    // Create a line element for the arrow
    var line = document.createElementNS(svgNS, "line");
    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', endX);
    line.setAttribute('y2', endY);
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('marker-end', 'url(#arrowhead)');

    // Create a marker for the arrowhead
    var marker = document.createElementNS(svgNS, "marker");
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('viewBox', '0  0  10  10');
    marker.setAttribute('refX', '10');
    marker.setAttribute('refY', '5');
    marker.setAttribute('markerWidth', '6');
    marker.setAttribute('markerHeight', '6');
    marker.setAttribute('orient', 'auto');

    var path = document.createElementNS(svgNS, "path");
    path.setAttribute('d', 'M  0  0 L  10  5 L  0  10 z');
    path.setAttribute('fill', 'black');

    marker.appendChild(path);
    svg.appendChild(marker);
    svg.appendChild(line);

    // Append the SVG to the body or a container element
    document.body.appendChild(svg);
}

// Function to handle dragging of an arrow
function handleArrowDrag(event) {
    var arrow = event.target;
    var startMousePos = { x: event.clientX, y: event.clientY };
    var startArrowPos = { x: arrow.getAttribute('x1'), y: arrow.getAttribute('y1') };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        var newPosition = {
            x: startArrowPos.x + (event.clientX - startMousePos.x),
            y: startArrowPos.y + (event.clientY - startMousePos.y)
        };

        // Update the arrow's position
        arrow.setAttribute('x1', newPosition.x);
        arrow.setAttribute('y1', newPosition.y);
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

// Function to handle resizing of an arrow
function handleArrowResize(event) {
    var arrow = event.target;
    var startMousePos = { x: event.clientX, y: event.clientY };
    var startArrowSize = { width: arrow.getAttribute('stroke-width'), height: arrow.getAttribute('stroke-width') };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        var newSize = {
            width: startArrowSize.width + (event.clientX - startMousePos.x),
            height: startArrowSize.height + (event.clientY - startMousePos.y)
        };

        // Update the arrow's size
        arrow.setAttribute('stroke-width', newSize.width);
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

// Add event listeners to the arrow elements
var arrows = document.querySelectorAll('.arrow'); // Assuming you have a class 'arrow' for your arrows
arrows.forEach(function(arrow) {
    arrow.addEventListener('mousedown', handleArrowDrag);
    arrow.addEventListener('mousedown', handleArrowResize);
});

// DELETE THIS IF THERE"S A RANDOM ARROW FLOATING ON THE SCREEN
createArrow(50,  50,  200,  200);

function MakeNewNote() {
    var newNoteDragger = document.createElement('div');
    newNoteDragger.className = 'note-dragger'
    newNoteDragger.textContent = ' ';
    document.getElementById('container').appendChild(newNoteDragger);
    var newNote = document.createElement('div');
    newNote.className = 'new-note';
    newNote.textContent = 'edit me!';
    newNote.setAttribute('contenteditable', 'true');
    newNoteDragger.appendChild(newNote)
    var noteSizer = document.createElement('div');
    noteSizer.className = 'note-sizer';
    noteSizer.textContent = ' ';
    newNote.appendChild(noteSizer);

    
    var button = document.createElement('button');
    button.textContent = 'AI Expand'; // Set the button text
    button.className = 'note-button'; // Add a class for styling
    newNote.appendChild(button); // Append the button to the note
    

    // Set the contenteditable attribute of the parent element to false
    // newNote.setAttribute('contenteditable', 'false');

    
    // Attach the event listener to the button
    // LOOK AT POSSIBLE ERRORS YOU FOOL
    /*
    button.addEventListener("click", send_text_to_ai);
    function send_text_to_ai() {
        // THIS COULD BE AN ERROR THAT NEW NOW IS IN QUOTES
        var note_text = document.getElementById("new-note").innerText;
        note_text = note_text.replace('AI Expand', '');
        document.getElementById("new-note").innerText = run(note_text);
    }
    */
    
}
/*
async function run(input) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});


  const prompt = input;


  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
*/
var UserName = null;
function Save() {
    if (UserName){
        alert("saved!");
    } else {
        alert("you need to sign in");
    }
}
//logging in
function MakeLoginButton() {
    var modal = document.getElementById('login-modal');
    var span = document.getElementsByClassName('login-close-button')[0];


    modal.style.display = 'block';


    span.onclick = function() {
        modal.style.display = 'none';
    }


    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally


    // Retrieve the username and password from the form
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;


    // You can now use the username and password for authentication
    console.log('Username:', username);
    console.log('Password:', password);


    // Close the modal after successful login (or handle authentication failure)
    var modal = document.getElementById('login-modal');
    modal.style.display = 'none';
});


//signing up
function MakeSignupButton() {
    var modal = document.getElementById('signup-modal');
    var span = document.getElementsByClassName('signup-close-button')[0];


    modal.style.display = 'block';


    span.onclick = function() {
        modal.style.display = 'none';
    }


    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}


document.getElementById('create-note-button').addEventListener('click', MakeNewNote);
document.getElementById('create-notebook-button').addEventListener('click', MakeNewNote); //TODO
document.getElementById('notebooks').addEventListener('click', MakeNewNote); //TODO


document.getElementById('save').addEventListener('click', Save); //Incomplete
document.getElementById('login-button').addEventListener('click', MakeLoginButton); //Incomplete
document.getElementById('signup-button').addEventListener('click', MakeSignupButton); //Incomplete
