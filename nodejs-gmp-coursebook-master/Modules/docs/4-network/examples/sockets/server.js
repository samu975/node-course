const { createServer } = require('net');
const server = createServer((socket) => {
  console.info('Client connected')
  socket.on('end', () => {
    console.info('client disconnected');
  });

  socket.write('hello world\r\n');
});

server.listen(1234, () => console.log('server started'));
