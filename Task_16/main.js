var messages = document.getElementById('messages');
var sendButton = document.getElementById('send-btn');

sendButton.addEventListener('click', sendUserMessage);

function start() {
  setInterval(getMessagesFromServer, 2000);
}

async function getMessagesFromServer() {
  var response = await fetch('http://localhost:8000/1?offset=0&limit=10');
  response = await response.json();

  var messagesHTML = fromMessagesHTML

    messages.innerHTML = allMessagesHTML;
  }

  async function sendUserMessage() {
    var userNickname = document.getElementById('nickname-input').value;
    var userMessage = document.getElementById('message-input').value;

    if (userNickname.length === 0) {
      alert("You need to enter your Nickname!");
      return;

    if (userMessage.length === 0) {
      alert("You need to enter your Message!");
      return;
    }

    await fetch('http://localhost:8000/1?offset=0&limit=10', {
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
    for (var i = 0; i <messages.length; i++){
      var messageData = response[i];
      var message = `
          <div class="message">
            <div class="message-nickname"> ${messageData.Name} </div>
            <div class="message-text"> ${messageData.Message} </div>
          </div>
          `
          allMessagesHTML = allMessagesHTML + message;
      }
      return allMessagesHTML:
  }

  function.scrollToEnd() {
    messages.scrollTop = messages.scrollHeight;
  }
