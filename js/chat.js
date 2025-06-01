// Chat functionality
const myDescription = "A passionate web developer with an eye for clean UI, interaction design, and automation.";

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
      addBotMessage("Hi, I'm John Doe. What do you want to know about me?");
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
function handleSendMessage() {
  const userMessageInput = document.getElementById('user-message');
  const message = userMessageInput.value.trim();
  
  if (message) {
    // Add user message to chat
    addUserMessage(message);
    
    // Clear input
    userMessageInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate bot response after a delay
    setTimeout(() => {
      removeTypingIndicator();
      generateBotResponse(message);
    }, 1500);
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

// Generate a response based on the user's message
function generateBotResponse(userMessage) {
  // This is a dummy implementation that will be replaced with the API call later
  const lowerMessage = userMessage.toLowerCase();
  let response;
  
  // Simple keyword matching for demonstration
  if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
    response = "I have over 5 years of experience in web development, focusing on creating responsive and user-friendly interfaces.";
  } else if (lowerMessage.includes('skills') || lowerMessage.includes('technologies')) {
    response = "My core skills include HTML, CSS, JavaScript, React, Node.js, and UI/UX design. I'm also experienced with responsive design and API integration.";
  } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
    response = "I've worked on various projects including e-commerce platforms, task management apps, and custom web applications. You can see some examples in my portfolio section!";
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('email')) {
    response = "You can contact me at john.doe@example.com or through the contact form on this page. I'm currently available for freelance work and new opportunities.";
  } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    response = "Hello! Nice to meet you. How can I help you today?";
  } else {
    response = "Thanks for your message! I'm a passionate web developer with an eye for clean UI, interaction design, and automation. Is there something specific you'd like to know about my work or experience?";
  }
  
  // Add the response to the chat
  addBotMessage(response);
  
  // In the future, this would be replaced with an API call:
  /*
  const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY";
  
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `User_message: ${userMessage}. Reply naturally to the user message, and if required, answer based on: ${myDescription}, or simply respond in a friendly way as if John Doe is talking. Keep responses short and conversational.`
        }]
      }]
    })
  })
  .then(response => response.json())
  .then(data => {
    const botResponse = data.candidates[0].content.parts[0].text;
    addBotMessage(botResponse);
  })
  .catch(error => {
    console.error('Error:', error);
    addBotMessage("I'm having trouble connecting right now. Please try again later.");
  });
  */
}