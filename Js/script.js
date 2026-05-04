const btn = document.getElementById('chat_call_button');
const chatWindow = document.getElementById('chatbot-window');

btn.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
});