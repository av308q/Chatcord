const chatForm = document.getElementById('chat-form')

const socket = io();

socket.on('message', message => {
    console.log(message);
});

// Message submit 
chatForm.addEventListener('submit', e => {
    e.preventDefault();

// Get message text
const msg = e.target.elements.msg.value;

// Emit message to sever
socket.emit('chatMessage',msg);
});