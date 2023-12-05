const EventEmitter = require('./task1')

class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    this.emit('start');
    const startTime = Date.now();

    try {
      const data = await asyncFunc(...args);
      this.emit('data', data, Date.now() - startTime);
      console.log('data', data);
    } catch (err) {
      this.emit('error', err);
      console.log('error', err);
    }

    const endTime = Date.now();
    this.emit('end', endTime - startTime);
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}


// Purebas: 
const withTime = new WithTime();

withTime.on('begin', () => console.log('Event: begin'));
withTime.on('data', data => console.log('Event: data', data));
withTime.on('end', () => console.log('Event: end'));
withTime.on('error', error => console.error('Event: error', error));

withTime.execute(fetchData, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));