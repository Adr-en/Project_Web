document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('chat_call_button');
    const chatWindow = document.getElementById('chatbot-window');
    const input = document.getElementById('chatbox_input');
    const sendBtn = document.getElementById('send_button'); // Added this
    const messagesContainer = document.getElementById('chat-messages');
    
    let botIntents = [];

    
    fetch('../Json/intents.json') 
        .then(response => response.json())
        .then(data => {
            botIntents = data.intents;
        })
        .catch(err => console.error("Erreur JSON:", err));

    btn.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });

    function addMessage(text, sender) {
        const msg = document.createElement('p');
        msg.textContent = text;
        msg.className = sender === 'user' ? 'user-msg' : 'bot-msg';
        messagesContainer.appendChild(msg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getBotResponse(userText) {
        const message = userText.toLowerCase();
        let finalResponse = "I'm sorry I don't think i can help you about that. Try asking about our courses, our faculty or even about us !";

        for (let intent of botIntents) {
            // Check if ANY pattern word is inside the user's message
            const match = intent.patterns.some(pattern => message.includes(pattern.toLowerCase()));
            if (match) {
                const randomIndex = Math.floor(Math.random() * intent.responses.length);
                finalResponse = intent.responses[randomIndex];
                break;
            }
        }
        setTimeout(() => addMessage(finalResponse, 'bot'), 600);
    }

    function handleUserInput() {
        const userText = input.value.trim();
        if (userText !== "") {
            addMessage(userText, 'user');
            input.value = "";
            getBotResponse(userText);
        }
    }

    
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserInput(); });
    sendBtn.addEventListener('click', handleUserInput);
});