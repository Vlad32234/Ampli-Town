var messages = document.getElementById('messages');
getMessagesFromServer();

async function getMessagesFromServer() {
  var response = await fetch('https://vlad32234.github.io/Ampli-Town/Task_16/index.html');
  response = await response.json();

  var allMessagesHTML = '';
  for (var i = 0; i <response.length; i++){
    var messageData = response[i];
    var message = `
        <div class="message">
          <div class="message-nickname"> ${messageData.Name} </div>
          <div class="message-text"> ${messageData.Message} </div>
        </div>
        `
        allMessagesHTML = allMessagesHTML + message;
    }


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

    await fetch('https://vlad32234.github.io/Ampli-Town/Task_16/index.html', {
      method: 'POST',
      body: JSON.stringify({
        Name: userNickname,
        Message: userMessage
      })
    });

    getMessagesFromServer();
  }
