import { newUser } from 'translator.js';

document.getElementById('signup-submit').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting
    newUser();
    console.log("yeehaw");
});