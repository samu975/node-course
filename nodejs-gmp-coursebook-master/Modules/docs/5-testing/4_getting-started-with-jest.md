---
sidebar_position: 4
---
# Getting started with Jest

Let’s dive into the amazing world of testing and move from theory to practice. In this section we will install Jest, write our first test, set up Jest config file and learn how to use Jest with Typescript projects. Official Jest documentation can be found [here](https://jestjs.io/docs/getting-started).

### Install Jest and create our first test

#### Step 1

Let's install Jest. Pay attention that it is installed as a dev dependency.

```js
// for npm
npm install --save-dev jest

// for yarn
yarn add --dev jest
```

#### Step 2

Now it's time to create a simple `sum()` function that will calculate the sum of two numbers . We are using Javascript here. Typescript support will be added later in this section.

```js title="sum.js"
const sum = (a, b) => a + b;

module.exports = sum;
```

#### Step 3

Finally we have everything needed to write our first test. First of all, we need to import `sum()` function. Then with the help of `test()` function we define our test suite. It takes 2 params as input arguments: `name` (name of test) and `function` that is an actual test scenario. We simply call our `sum()` function, assign it to variable `result` and then with `expect()` function verify the result.

```js title="sum.test.js"
const sum = require('./sum');

test('adds 5 + 2 to equal 7', () => {
  const result = sum(5, 2);
  expect(result).toBe(7);
});
```

#### Step 4

Last but not least is to add jest command to `scripts` section in `package.json` file. Later on we will simply run `npm test` or `yarn test` command to run our first test.

```js title="package.json"
{
  "scripts": {
    "test": "jest"
  }
}
```

#### Step 5

Let’s run our tests with `npm test` or `yarn test` command and check what’s the output. 

```js
❯ yarn test
yarn run v1.22.10
$ jest
PASS sum.test.js
  ✓ adds 5 + 2 to equal 7 (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.498 s
Ran all test suites.
✨  Done in 2.19s.
```

### Jest configuration

Jest supports a huge list of extra options that can be passed to `jest` command. You can find them [here](https://jestjs.io/docs/configuration#options). But passing a huge list of options is not so good. What’s the solution then?

You can define extra configuration for your Jest tests in `package.json`, `jest.config.js`, `jest.config.js` or through the `--config <path/to/file.js|ts|cjs|mjs|json>` CLI option for `jest` command.

```js title="jest.config.js"
module.exports = {
  testEnvironment: 'node',
  roots: ['./src'],
};
```

The configuration above is a good starting point. Later on you might need some more options based on your needs. We started with some basic ones. Let’s briefly talk about each of them. From the official documentation:
- `testEnvironment` - test environment that will be used for testing. The default environment in Jest is a Node.js environment. If you are building a web app, you can use a browser-like environment through jsdom instead. We will be testing backend applications, so `node` is what we need.
- `roots` - a list of paths to directories that Jest should use to search for files in.

### Typescript support

If you have a project written in Typescript, you will need to do some extra setup for Jest. You will need to install TypeScript preprocessor [ts-jest](https://www.npmjs.com/package/ts-jest) and type definitions for tests [@types/jest](https://www.npmjs.com/package/@types/jest).

```js
// for npm
npm install --save-dev ts-jest @types/jest

// for yarn
yarn add --dev ts-jest @types/jest
```

Once package is installed, add `ts-jest` as `preset` in your Jest config file:
```js title="jest.config.js"
module.exports = {
  preset: 'ts-jest',
};
```

### Where to store tests?

There are at least two ways of test organization in your application.

Some teams prefer to create a separate `/tests` folder, which will contain all test files.

My personal advice is to keep tests closer to the code itself. So e.g you have s3 module which is located under `/s3`  directory. All the code is in `/s3/index.ts` file. Keeping tests closer to code means to create a test file next to `index.ts`. In our case it would be `/s3/index.test.ts`. The resulting module structure would look the following way:

```
/s3
  index.ts
  index.test.ts
```

In any case it's up to you and your team to decide where tests should be stored.