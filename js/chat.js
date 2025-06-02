// Chat functionality
const myDescription = `Hi, I'm Mausham Prasad — an engineering student deeply immersed in the worlds of IoT, cybersecurity, blockchain, and everything CSE. I thrive at the intersection of code and creativity, building things that are not just functional but meaningful.

Currently exploring full-stack development, I love crafting responsive UIs, connecting smart devices, and experimenting with AI integrations. Whether it's tinkering with sensors, automating workflows, or diving into open-source, I'm always learning, building, and iterating.

In short: I code. I break stuff. I fix it better.`;

export function initChat() {
  const chatBubble = document.getElementById('chat-bubble');
  const chatOverlay = document.getElementById('chat-overlay');
  const closeChat = document.getElementById('close-chat');
  const sendMessage = document.getElementById('send-message');
  const userMessageInput = document.getElementById('user-message');
  const chatMessages = document.querySelector('.chat-messages');
  
  // Toggle chat visibility
  chatBubble.addEventListener('click', () => {
    chatOverlay.classList.add('active');
    chatBubble.style.display = 'none';
    
    // Add initial message if chat is empty
    if (chatMessages.children.length === 0) {
      addBotMessage("Hi, I'm Mausham Prasad. What would you like to know about me?");
    }
  });
  
  // Close chat
  closeChat.addEventListener('click', () => {
    chatOverlay.classList.remove('active');
    chatBubble.style.display = 'flex';
  });
  
  // Send message on button click
  sendMessage.addEventListener('click', handleSendMessage);
  
  // Send message on Enter key
  userMessageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  });
  
  // Focus input when chat opens
  chatOverlay.addEventListener('transitionend', () => {
    if (chatOverlay.classList.contains('active')) {
      userMessageInput.focus();
    }
  });
}

// Handle sending messages
async function handleSendMessage() {
  const userMessageInput = document.getElementById('user-message');
  const message = userMessageInput.value.trim();
  
  if (message) {
    // Add user message to chat
    addUserMessage(message);
    
    // Clear input
    userMessageInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
      // Call Gemini API
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAoKVPZpU7GLIJQKg1mE22f2r9ju6eqYsA", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `User_message: ${message}. Reply naturally to the user message, and if required, answer based on: ${myDescription}, or simply respond in a friendly way as if Mausham Prasad is talking. Keep responses short and conversational.`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const botResponse = data.candidates[0].content.parts[0].text;

      // Remove typing indicator and add bot response
      removeTypingIndicator();
      addBotMessage(botResponse);
    } catch (error) {
      console.error('Error:', error);
      removeTypingIndicator();
      addBotMessage("I'm having trouble connecting right now. Please try again later.");
    }
  }
}

// Add a user message to the chat
function addUserMessage(message) {
  const chatMessages = document.querySelector('.chat-messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'user-message');
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  
  // Scroll to bottom
  scrollToBottom();
}

// Add a bot message to the chat
function addBotMessage(message) {
  const chatMessages = document.querySelector('.chat-messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'bot-message');
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  
  // Scroll to bottom
  scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
  const chatMessages = document.querySelector('.chat-messages');
  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('typing-indicator');
  typingIndicator.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;
  typingIndicator.id = 'typing-indicator';
  chatMessages.appendChild(typingIndicator);
  
  // Scroll to bottom
  scrollToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Scroll chat to bottom
function scrollToBottom() {
  const chatMessages = document.querySelector('.chat-messages');
  chatMessages.scrollTop = chatMessages.scrollHeight;
}