class EventEmitter {
  constructor(){
    this.events = {};
  }

  // Según lo que entendi el metodo addEventListener y el metodo on hacen lo mismo, por eso solo decidi hacer el on
  on(eventName, callback){
    if(!this.events[eventName]){
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  // off y removeEventListener hacen lo mismo.
  off(eventName, callback){
    if(this.events[eventName]){
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
        listener(...args);
        this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
}

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }

  rawListeners(eventName){
    return this.events[eventName];
  }

  listenerCount(eventName){
    return this.events[eventName].length;
  }

  
}

// Pruebas: 

const myEmitter = new EventEmitter();

function c1() {
    console.log('an event occurred!');
}

function c2() {
    console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');


myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));

module.exports = EventEmitter;