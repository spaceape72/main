let currentUser;
let currentUserId;

// Generate a random user number
function generateRandomUserId() {
    return Math.floor(Math.random() * 1000);
}

// Get the current timestamp
function getCurrentTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Join the chat
document.getElementById('joinButton').addEventListener('click', function() {
    const usernameInput = document.getElementById('usernameInput').value.trim();
    if (usernameInput) {
        currentUser = usernameInput;
        currentUserId = generateRandomUserId();
        
        document.getElementById('signInContainer').style.display = 'none';
        document.getElementById('chatContainer').style.display = 'block';
    } else {
        alert('Please enter a valid username.');
    }
});

// Send message
document.getElementById('sendButton').addEventListener('click', function() {
    const input = document.getElementById('messageInput');
    const messageText = input.value.trim();

    if (messageText && currentUser) {
        const timestamp = getCurrentTimestamp();

        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = `${currentUser} (User ${currentUserId}) [${timestamp}]: ${messageText}`;

        const messagesContainer = document.getElementById('messages');
        messagesContainer.appendChild(messageElement);

        input.value = '';
        const chatWindow = document.getElementById('chatWindow');
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});

// Optional: Send message on Enter key press
document.getElementById('messageInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('sendButton').click();
    }
});
