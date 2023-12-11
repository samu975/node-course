---
title: JavaScript Engine
---

## The V8 JavaScript Engine

V8 is an open-source JavaScript engine developed by Google and written in C++. Originally created in 2008 for Google Chrome and Chromium-based browsers like Brave, it was also used to develop Node.js for server-side coding. V8 is ubiquitous, powering JSON-based NoSQL databases such as Couchbase and the popular MongoDB. Additionally, Electron - a well-known desktop application framework and Deno's latest server-side runtime environment also use the V8 engine. V8 continues to evolve, much like other JavaScript engines. However, implementation details will not be covered in this section, as they tend to change over time. They can be found on websites, such as the [V8 official site](https://v8.dev/).

Though [SpiderMonkey](https://spidermonkey.dev/) is another JavaScript engine used by Firefox, and [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore) is used by Safari, Microsoft Edge was initially based on the [ChakraCore](https://github.com/chakra-core/ChakraCore) JavaScript engine and has recently been rebuilt with the [Chromium](https://www.chromium.org/Home/) and V8 engines.

## Node.js and V8
The V8 engine compiles JavaScript code into machine code, while Node.js takes the V8 codebase and adds specific features like CRUD operations with the local file system that aren't allowed in web browsers due to security reasons. Developers can also expand Node.js's functionality by installing additional npm packages.

It's important to understand that V8 is essentially an independent C++ library that Node.js and Chromium use to run JavaScript code. V8 exposes an API that other code can use. For instance, if you have a C++ program, you can embed V8 in it and run a JavaScript program that way. This is precisely how Node.js and Chrome use V8.

V8 uses just-in-time (JIT) compilation to convert native JavaScript code to machine code. Unlike other engines, V8 doesn't produce any intermediate code.

The current Node.js engine depends on V8 because it wouldn't have a JavaScript engine otherwise, preventing it from running any JavaScript code. The Node.js native code bindings, such as the fs module and the net module, rely on the V8 interface between C++ and JavaScript.

Microsoft tried in 2016 to use the Chakra JavaScript engine (which was used in the Edge browser at that time) in Node.js and replace V8. However, that project never took off, and Microsoft Edge itself recently migrated to Chromium, which uses the V8 JavaScript engine. Another runtime environment, Deno, which some consider a potential replacement for Node.js in the next few years, also uses the V8 engine. However, the new runtime environment Bun uses the JavaScriptCore engine, which tends to start and perform a little faster than more traditional platforms like V8. Bun is written in [Zig](https://ziglang.org/), a low-level programming language with manual memory management.

## The Just-in-Time Paradigm
For any code to execute in a programming language, it must first be converted into machine code to be understood by the computer. There are different paradigms for this transformation.

Most traditional languages created before JavaScript, such as C++ and Java, use something called Ahead-of-Time (AoT) compilation, where the code is transformed into machine code before program execution during the compile time. In contrast, languages like JavaScript and Python run each code line at runtime because it's impossible to predict the entire code beforehand.

However, Just-in-Time (JIT) compilation was created to overcome this challenge with dynamic languages, combining aspects of both interpretation and compilation. With JIT compilation, the V8 engine performs an interpretation step that runs before the compilation step, detects frequently used code and functions, and compiles them using information from prior executions. During compile time, this code is re-compiled for optimal performance.
