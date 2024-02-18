import { write } from './lib/index.js';

document.getElementById('signup-submit').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting
    var username = document.getElementById('signup-username').value;
    var password = document.getElementById('signup-password').value;
    write(username, password)
    console.log("holy shit you did it");
});