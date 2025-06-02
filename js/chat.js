// Chat functionality
import { sendChatMessage } from './api.js';

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
      addBotMessage("Hi, I'm Mausham Prasad. What do you want to know about me?");
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
      // Get response from API
      const response = await sendChatMessage(message);
      
      // Remove typing indicator and add bot response
      removeTypingIndicator();
      addBotMessage(response);
    } catch (error) {
      console.error('Chat Error:', error);
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