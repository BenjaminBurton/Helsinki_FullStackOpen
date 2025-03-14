// Array to store notes locally
// Initialized notes with some sample data since we can’t fetch from /data.json with Live Server.
let notes = [
    { content: "San Francisco", date: new Date() },
    { content: "New York", date: new Date() }
];

// Function to redraw notes in the DOM
const redrawNotes = function () {
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'notes');

    notes.forEach(function (note) {
        const li = document.createElement('li');
        li.textContent = note.content; // Simpler than appendChild with text node
        ul.appendChild(li);
    });

    const notesElement = document.getElementById("notes");
    while (notesElement.firstChild) {
        notesElement.removeChild(notesElement.firstChild); // Clear existing content
    }
    notesElement.appendChild(ul);
};

// Simulate initial data fetch (since no real server with Live Server)
// Replaced the initial GET request with simulateFetchNotes() to render the local notes array.
// Remove the simulateFetchNotes function and restore the original GET request logic If you later deploying to a server
// Ensure the server supports CORS if running locally against a remote backend.
const simulateFetchNotes = function () {
    redrawNotes(); // Render initial notes
};

// Simulate sending note to server (for demo purposes)
// Kept sendToServer but it won’t succeed with Live Server (it logs a simulation instead). The UI updates locally regardless.
const sendToServer = function (note) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status === 0) {
                console.log("Simulated POST: Network error or no server response (Live Server limitation)");
            } else {
                console.log("Response:", this.responseText);
            }
        }
    };
    // If you later deploying to a server like https://studies.cs.helsinki.fi/exampleapp/
    // Update to use absolute URLs:
    // xhttp.open("GET", "https://studies.cs.helsinki.fi/exampleapp/data.json", true);
    // xhttp.open("POST", "https://studies.cs.helsinki.fi/exampleapp/new_note_spa", true);
    xhttp.open("POST", "/exampleapp/new_note_spa", true); // Will fail with Live Server
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(note));
    console.log("Simulated sending to server:", note); // Log for demo
};

// Handle form submission
window.onload = function () {
    simulateFetchNotes(); // Load initial notes on page load

    const form = document.getElementById("notes_form");
    form.onsubmit = function (e) {
        e.preventDefault();

        const note = {
            content: e.target.elements[0].value,
            date: new Date()
        };

        notes.push(note); // Add to local array
        e.target.elements[0].value = ""; // Clear input
        redrawNotes(); // Update UI
        sendToServer(note); // Simulate POST (will fail with Live Server but won't break app)
    };
};