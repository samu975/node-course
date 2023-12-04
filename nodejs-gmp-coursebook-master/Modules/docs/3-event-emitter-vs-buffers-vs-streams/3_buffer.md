---
sidebar_position: 3
---

# Buffer
If you think back to when you were taught that computers only understand binary language, you may recall that buffer is a space in computer memory, usually RAM, that stores binaries. In previous module, we were walked through the basics of the [Node.js buffer](/docs/standard-library/buffer) module, but now we'll talk something more about buffer methods.

![Buffer](img/buffer.png)

## What is binary code?

To understand what buffers are and the relationship between computers and binaries, let’s review the general concept of binary code.

For computers to understand, process, and store data, data has to be converted to binary code. This is mainly because the computer processor is made of transistors, electronic machines that are activated by on `(1)` and off `(0)` signals.

Every piece of data sent to the computer is first converted to binary by a microprocessor before processing and outputting the result. Therefore, it’s crucial to be able to distinguish between different data types. Through a process called encoding, the computer encodes dissimilar data types differently to tell one type from another.


## Buffer methods

One cool thing about the Node.js buffer module is that you don’t need to import it into your application before using its methods. Let’s review some important Node.js buffer methods that you should know.


### Buffer.byteLength()

You can check the length of a buffer object with the `Buffer.byteLength(`) method. The code below demonstrates how to create a buffer, attach a size to it, and check the size of the buffer you just created:

```js
const buff = Buffer.alloc(6);

//check the length of buffer created
const buffLength = Buffer.byteLength(buff);

//print buffer length
console.log(buffLength);
// This will print <6>
```

### Buffer.compare()

The `Buffer.compare()` method enables you to compare two buffer objects to check whether they are equal. This method returns `-1`, `0`, or `1`, depending on the result of the comparison.

You can compare buffer objects with the `Buffer.compare()` method as seen below:

```js
let buff1 = Buffer.from('x');
let buff2 = Buffer.from('y');
let a = Buffer.compare(buff1, buff2);

//This will return -1
console.log(a);

let buff1 = Buffer.from('y');
let buff2 = Buffer.from('x');
let a = Buffer.compare(buff1, buff2);

//This will return 1
console.log(a);

let buff1 = Buffer.from('x');
let buff2 = Buffer.from('x');
let a = Buffer.compare(buff1, buff2);

//This will return 0
console.log(a);
```

### Buffer.entries()

With `buf.entries()`, you can return a loop of indexes and bytes from the content of a buffer object, which is used to know the position and size of buffer contents:

```js
let buff = Buffer.from('xyz');

for (let a of buff.entries()) {
/*This will print arrays of indexes and byte of buffer content \\[ 0, 120 \][ 1, 121 \][ 2, 122 ]*/
  console.log(a);
} 
```

### Buffer.fill()

The `Buffer.fill()` method enables you to create a buffer, allocate a size, and fill it with a specified value. The expression below shows how to use the `Buffer.fill()` method:

```js
const buff = Buffer.alloc(10).fill('a');

console.log(buff.toString());
// This will print aaaaaaaaaa
```

### Buffer.from()

The `buffer.from()` method enables you to create a new buffer from any object, like strings, buffer, arrays, and `ArrayBuffer()`. All you have to do is specify the object you want to create a buffer from.The syntax for using this method is `Buffer.from(object[, offsetOrEncoding[,length]])`.

The offset or encoding parameter is optional; it’s used for specifying string encoding while converting to buffer. If you don’t specify the encoding parameter when creating buffers from a string, the buffer will be created with a default encoding of `utf8`.

You can also specify the number of bytes to expose with the length parameter, especially when creating buffer from `ArrayBuffer`. While creating a buffer from an array, the array bytes should fall between the range of `0` and `255`. Otherwise, the array entries will be shortened to fit in.

The example below shows how to create a buffer from strings, arrays, and `ArrayBuffer()` using the `buffer.from()` method:

```js
// Create buffer from string
let buffFromString = Buffer.from("Nigeria");
console.log(buffFromString);

// Create buffer from the buffer(which we created from string)
let buffFromBuffer = Buffer.from(buffFromString);
console.log(buffFromBuffer);

// create a buffer from an array
const buffFromArray = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
console.log(buffFromArray);

// Create a buffer from an arraybuffer
const buffFromArrayBuffer = new ArrayBuffer(10);
// Specify offset and length
const buffSpecifyOffsetAndLength = Buffer.from(buffFromArrayBuffer, 0, 2);
console.log(buffSpecifyOffsetAndLength);
```

### Buffer.includes()

If you want to determine whether a buffer object contains any values, you can use the `buff.includes()` method. With this method, you can search buffers to ascertain whether they contain expressions you wish to search for. The method returns a boolean `true` or `false` depending on whether a value is found:

```js
const buff = Buffer.from('this is a buffer');
console.log(buff.includes('this'));
// This will print true

console.log(buff.includes(Buffer.from('a buffer example')));
// This will print false
```

### Buffer.isEncoding()

To tell binaries apart, they must be encoded. You can use the `Buffer.isEncoding()` method to confirm whether a particular character encoding type is supported:

```js
console.log(Buffer.isEncoding('hex'));
// This will print true

console.log(Buffer.isEncoding('utf-8'));
// This will print true

console.log(Buffer.isEncoding('utf/8'));
// This will print false

console.log(Buffer.isEncoding('hey'));
// This will print false
```

### Buffer.swap

Buffer swap is used to swap the byte order of a buffer object. This method can also be used for fast [endianness](https://en.wikipedia.org/wiki/Endianness) conversion.

You can use `buff.swap16()`, `buff.swap32()`, and `buff.swap64()` to swap the byte order of a 16-bit, 32-bit, and 64-bit buffer object, respectively:

```js
const buff = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);
console.log(buff);
// This will print <Buffer 01 02 03 04 05 06 07 08>

//swap byte order to 16 bit
buff.swap16();
console.log(buff);
// This will print <Buffer 02 01 04 03 06 05 08 07>

//swap byte order to 32 bit
buff.swap32();
console.log(buff);
// This will print <Buffer 03 04 01 02 07 08 05 06>

//swap byte order to 64 bit
buff.swap64();
console.log(buff);
```

### Buffer.json()

The buf.json() method returns a JSON version of the buffer object:

```js
const buff = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);

console.log(buff.toJSON());
// This will print {"type":"Buffer", data:[1,2,3,4,5,6,7,8]}
```

### Buffer offset Read

With the Buffer offset Read method, you can determine the number of bytes to skip before starting to read an unassigned integer from a buffer object. The number of bytes to skip is determined by the offset you attach to this method.

For example, you can read 64-bit double, 32-bit float, 16-bit integer, and 32-bit integer. According to the [Node.js method](https://nodejs.org/api/buffer.html#buffer_buf_readbigint64be_offset) you use, the result could be in [little endian or big endian](https://chortle.ccsu.edu/AssemblyTutorial/Chapter-15/ass15_3.html). You can also read 8-bit integer with `buf.readInt8()`.

### Buffer offset write

The Buffer offset write method is used for writing a specified byte to a buffer object according to the offset attached to the method.

This method can write 64-bit double, 32-bit float, 8-bit integer, 16-bit integer, and 32-bit integer in little endian or big endian depending on the method used. The value in each method should correspond to the integer specified by the method. For instance, `buf.writeFloatBE()` should have a value of 32-bit float.

## Conclusion

When you execute a program, it’s essential that you understand what’s going on under the hood. You should now have a solid, foundational understanding of the relationship between binaries, streams, buffer, and how Node.js buffer works. You should also understand why you need to use the Node.js buffer class and the various Node.js buffer methods.

You can also create a buffer object with [allocUnsafe()](https://nodejs.org/api/buffer.html#buffer_static_method_buffer_allocunsafe_size) method, but the buffer created will be nonzero-filled. If you want to compare buffer objects, the `Buffer.compare()` method is a good fit for you, but [buf.equals()](https://nodejs.org/api/buffer.html#buffer_buf_equals_otherbuffer) returns true or false after comparison instead of `1`, `-1`, and `0`. You can read more about the Node.js buffer module in the [Node.js docs](https://nodejs.org/api/buffer.html).

