let currentUser;

// Get the current timestamp
function getCurrentTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

async function connectWallet() {
    try {
        const wallet = await plug.wallet.connect();
        currentUser = wallet.address;

        document.getElementById('signInContainer').style.display = 'none';
        document.getElementById('chatContainer').style.display = 'block';
    } catch (error) {
        console.error("Failed to connect wallet:", error);
    }
}

document.getElementById('connectButton').addEventListener('click', connectWallet);

document.getElementById('sendButton').addEventListener('click', function() {
    const input = document.getElementById('messageInput');
    const messageText = input.value.trim();

    if (messageText && currentUser) {
        const timestamp = getCurrentTimestamp();

        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = `${currentUser} [${timestamp}]: ${messageText}`;

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
