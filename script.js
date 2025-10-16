const form = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const input = document.getElementById('user-input');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, 'user');
  input.value = '';

  addMessage('Жауап күтілуде...', 'bot');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText }),
    });

    const data = await response.json();
    // заменяем последний бот-сообщение (status) на реальный ответ
    const botMsgs = document.querySelectorAll('.message.bot');
    botMsgs[botMsgs.length - 1].textContent = data.reply || 'Жауап жоқ.';
  } catch (error) {
    const botMsgs = document.querySelectorAll('.message.bot');
    botMsgs[botMsgs.length - 1].textContent = 'Қате орын алды. Кейінірек көріңіз.';
    console.error(error);
  }
});

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
