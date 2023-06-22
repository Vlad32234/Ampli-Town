var messages = document.getElementById('messages');
var sendButton = document.getElementById('send-btn');

sendButton.addEventListener('click', sendUserMessage);
start();

function start() {
  setInterval(getMessagesFromServer, 10000);
}

var lastMessages = [];

async function getMessagesFromServer() {
  let roomName = getRoomName(); // Я ДОДАВ ОТРИМАННЯ КІМНАТИ
  var response = await fetch(`http://localhost:8000/${1}?offset=0&limit=10`); // ТУТ ПОМИЛКА БУЛА У ПЕРЕДАЧІ ПАРАМЕТРІВ У ФУНКЦІЮ FETCH
  response = await response.json();

  var messagesHTML = fromMessagesHTML(response);

    messages.innerHTML = allMessagesHTML;
  }

  async function sendUserMessage() {
	let roomName = getRoomName(); // Я ДОДАВ ОТРИМАННЯ КІМНАТИ
    var userNickname = document.getElementById('nickname-input').value;
    var userMessage = document.getElementById('message-input').value;

    if (userNickname.length === 0) {
      alert("You need to enter your Nickname!");
      return;
    }
    if (userMessage.length === 0) {
      alert("You need to enter your Message!");
      return;
    }

    await fetch(`http://localhost:8000/${1}`, { // Я ПІДСТАВИВ КІМНАТУ
      method: 'POST',
      body: JSON.stringify({
        Name: userNickname,
        Message: userMessage
      })
    });

    getMessagesFromServer();
    scrollToEnd();
  }

  function fromMessagesHTML(messages) {
    var allMessagesHTML = '';
    for (var i = 0; i < messages.length; i++){
      var messageData = response[i];
      var message = `
          <div class="message">
            <div class="message-nickname"> ${messageData.Name} </div>
            <div class="message-text"> ${messageData.Message} </div>
          </div>
          `
          allMessagesHTML = allMessagesHTML + message;
      }
  return allMessagesHTML;
  }

  function scrollToEnd() {
    messages.scrollTop = messages.scrollHeight;
  }

// Я ДОДАВ ОТРИМАННЯ КІМНАТИ
function getRoomName() {
	return document.getElementById('room-input').value;
}
