// Gemini API integration
export async function sendChatMessage(message) {
  const myDescription = "A passionate web developer with an eye for clean UI, interaction design, and automation.";
  const API_KEY = "AIzaSyBZTpM7kNdMaOK9_Z468BcQQ7yvc3rhPjQ";
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
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
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('API Error:', error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
}