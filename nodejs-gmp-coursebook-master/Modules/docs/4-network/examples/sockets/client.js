const { connect } = require('net')

const socket = connect({ port: 1234 }, () => console.info('connected to server'));

socket.on('data', (buffer) => {
  console.info('New data', buffer.toString())
})