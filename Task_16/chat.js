const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const fsSync = require('fs');

const host = 'localhost';
const port = 8000;
const emptyFileData = '[]';
const noRoomUrl = '/';
const savedMsg = JSON.stringify({ message: 'Saved' });

const requestListener = async function (req, res) {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname == noRoomUrl) {
    sendError(res, 'Choose the room!');
  }

  const roomName = parsedUrl.pathname.replace('/', '');
  const requestModel = parsedUrl.query;

  let messages = await loadMessages(roomName);

  if (req.method == 'POST') 
  {
    let body = await readBody(req);

    if (!body.name || !body.message) {
      sendError(res, 'Wrong payload');
    }

    await updateRoom(body, roomName, messages);
    sendResponse(res, savedMsg);
  } 
  else if (req.method == 'GET') 
  {
    responseMessages(res, requestModel, messages);
  } 
  else 
  {
    sendError(res, 'Wrong method');
  }
};

async function updateRoom(body, roomName, messages) {
  messages.push(body);
  await writeData(buildRoomPath(roomName), JSON.stringify(messages));
}

const readBody = async function (req) {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
};

const responseMessages = function (res, requestModel, data) {
  if (!requestModel.offset || !requestModel.limit) {
    sendError(res);
  } else {
    sendResponse(
      res,
      JSON.stringify(data.splice(requestModel.offset, requestModel.limit))
    );
  }
};

async function loadMessages(room) {
  var data = await loadData(buildRoomPath(room));
  return JSON.parse(data);
}

function buildRoomPath(roomName) {
  return `./data/${roomName}.json`;
}

async function loadData(fileName) {
  var isExist = await checkFileExists(fileName);
  if (!isExist) {
    await writeData(fileName, emptyFileData);
  }

  const data = await fs.readFile(fileName);
  return Buffer.from(data);
}

function writeData(fileName, data) {
  return fs.writeFile(fileName, data);
}

function checkFileExists(file) {
  return fs
    .access(file, fsSync.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

const sendResponse = function (res, responseObject) {
  res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(responseObject);
};

const sendError = function (res, msg) {
  res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify({ message: msg ?? 'Wrong query parameters' }));
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
