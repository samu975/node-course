---
sidebar_position: 6
---
# Unit tests

In the previous sections we’ve learnt what unit testing is. Let’s now remind core principles of unit tests and check examples of how they can be written using Jest.

**Core things to keep in mind when writing unit tests:**
- You are testing a small piece of code (unit), e.g function, class.
- Testing should be done in isolation from other modules. It means that if your unit relies on any other units, the last ones should be mocked. Any calls to the database or external services should be mocked. That's not a scope of unit testing. 
- Do not forget to test success paths as well as error scenarios, edge cases, large input values, etc.
- Unit tests should not depend on the environment. The output of tests should not change if you run tests against staging or production environments.

Let’s have a look at some examples of unit tests.

## Example 1

Let’s start with a simple example.

### Implementation

Photos are stored in s3 buckets. There is a function `getS3PhotoPath()` that calculates the path to a photo in s3. Path is made up of bucket name, base64 encoded photo id and photo id in the end.

```js title="/src/unit-tests/example-1/get-s3-photo-path.ts"
const getS3PhotoPath = (bucketName: string, photoId: string) => {
  const base64Encoded = Buffer.from(photoId).toString('base64');
  return `${bucketName}/${base64Encoded}/${photoId}`;
};

export default getS3PhotoPath;
```

### Testing

We want to write a simple unit test that will check if the path to a photo in s3 is correct with the bucket name and photo id provided. Here is how the test would look like.

```js title="/src/unit-tests/example-1/get-s3-photo-path.test.ts"
import getS3PhotoPath from './get-s3-photo-path';

const S3_BUCKET_NAME = 'photo-assets';

describe('Get S3 photo path', () => {
  test('should return correct photo path', () => {
    const photoId = '1234567890';
    const path = getS3PhotoPath(S3_BUCKET_NAME, photoId);
    expect(path).toEqual('photo-assets/MTIzNDU2Nzg5MA==/1234567890');
  });
});
```

## Example 2

Looks simple? Let’s move on and have a look at more complex examples.

### Implementation

Suppose we have a function `getGenderByName()` that returns gender and probability by name provided. This function:
- has validation for `name` argument: only English letters are allowed. Otherwise, it throws an error.
- calls external Genderize API and passes name to it. This API returns gender by name and probability
- if probability is less than 90%, the function throws an error. Otherwise returns `gender`, `name`, `probability` and `count`.

```js title="/src/unit-tests/example-2/get-gender-by-name.ts"
import axios from 'axios';

const API_URL = 'https://api.genderize.io';
const NAME_REGEX = /^[A-Za-z]+$/;

type GenderResponse = {
  name: string;
  gender: string;
  probability: number;
  count: number;
};

const getGenderByName = async (name: string): Promise<GenderResponse | Error> => {
  if (!NAME_REGEX.test(name)) {
    throw new Error('Invalid name, only EN letters are allowed');
  }

  const { data: gender } = await axios.get<GenderResponse>(`${API_URL}?name=${name}`);

  if (gender.probability < 0.9) {
    throw new Error(`Probability is less than 90%, value received = ${gender.probability}`);
  }

  return gender;
};

export default getGenderByName;
```

And now let’s think what unit tests can be written for that function. 

### Testing function returned value

First of all we should check that the function returns data that is expected. As it was mentioned above, unit testing is done in isolation from any external dependencies. It means that request to Genderize API should be mocked. Instead of calling a real API, we set up a spy on `axios.get()` and mock the implementation. Axios is promise-based, so we have to return promise. We know which data real API returns, so we will do the same in our spy.

```js title="/src/unit-tests/example-2/get-gender-by-name.test.ts"
import axios from 'axios';
import getGenderByName from './get-gender-by-name';

const GENDER_JOHN = {
  name: 'john',
  gender: 'male',
  probability: 0.999,
  count: 1,
};

describe('Get gender by name', () => {
  test('should return gender', async () => {
    // mock response from API
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: GENDER_JOHN }));

    const genderResponse = await getGenderByName(GENDER_JOHN.name);
    // expect that getGenderByName() func returns what API returns
    expect(genderResponse).toEqual(GENDER_JOHN);
  });
});
```

### Testing arguments passed when calling API

Secondly, we want to make sure that Genderize API is called with proper arguments (in our case `name` is passed as query param). In this case we can use spie on `axios.get()` as well. We can assign spy to a variable and track the arguments it was called with.

```js title="/src/unit-tests/example-2/get-gender-by-name.test.ts"
test('should call API with proper arguments', async () => {
  // setup spy on axios.get() to check what args were passed to it
  const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: GENDER_JOHN }));

  await getGenderByName(GENDER_JOHN.name);
  // expect that axios.get() is called with proper args
  expect(axiosGetSpy).toHaveBeenCalledWith(`https://api.genderize.io?name=${GENDER_JOHN.name}`);
});
```

### Testing error thrown by invalid input

Now let’s think about errors that our function throws. The first error is thrown when there is a validation error for `name`. We allow only English letters. In this case `getGenderByName()` returns Promise rejected and specific error message. 

:::note
Pay attention to how error is expected for async functions.  We have `await` in front of `expect` statement. Then we use `rejects` because the function is promise-based and we expect rejected Promise. The last thing is that we create an Error with a message we expect to get. In our case - `Invalid name, only EN letters are allowed`.
:::

```js title="/src/unit-tests/example-2/get-gender-by-name.test.ts"
test('should throw error if name contains numbers', async () => {
  const name = 'qwerty1234';
  // expect that getGenderByName() returns rejected promise proper error
  await expect(getGenderByName(name)).rejects.toThrow(new Error('Invalid name, only EN letters are allowed'));
});
```

### Testing error thrown by probability check

And the last thing to test is probability check. Again let’s use spy on `axios.get()` and in mocked implementation return an object with probability `0.79`. Our function should return Promise rejected and specific error messages.

```js title="/src/unit-tests/example-2/get-gender-by-name.test.ts"
test('should throw error if probability is less than 90%', async () => {
  // mock response with probability < 90%
  jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: GENDER_ANN }));

  // expect that getGenderByName() returns rejected promise with proper error
  await expect(getGenderByName(GENDER_ANN.name)).rejects.toThrow(
      new Error(`Probability is less than 90%, value received = ${GENDER_ANN.probability}`),
  );
});
```

### Clear spies

Do not forget to clear all spies after all tests in `afterAll()` function. When doing that, we make sure that mocks that we set up for this specific function will not affect other test scenarios. Otherwise, we might see some unpredicted behavior when testing other bits of code.

```js title="/src/unit-tests/example-2/get-gender-by-name.test.ts"
afterEach(() => {
  // clear all mocks to make sure that they won't be passed to any tests out of this file
  jest.clearAllMocks();
});
```
### Final test

That’s how our file with final test scenarios would look like. 

```js title="/src/unit-tests/example-2/get-gender-by-name.test.ts"
import axios from 'axios';
import getGenderByName from './get-gender-by-name';

const GENDER_JOHN = {
  name: 'john',
  gender: 'male',
  probability: 0.999,
  count: 1,
};

const GENDER_ANN = {
  name: 'ann',
  gender: 'female',
  probability: 0.79,
  count: 1,
};

describe('Get gender by name', () => {
  test('should return gender', async () => {
    // mock response from API
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: GENDER_JOHN }));

    const genderResponse = await getGenderByName(GENDER_JOHN.name);
    // expect that getGenderByName() func returns what API returns
    expect(genderResponse).toEqual(GENDER_JOHN);
  });

  test('should call API with proper arguments', async () => {
    // setup spy on axios.get() to check what args were passed to it
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: GENDER_JOHN }));

    await getGenderByName(GENDER_JOHN.name);
    // expect that axios.get() is called with proper args
    expect(axiosGetSpy).toHaveBeenCalledWith(`https://api.genderize.io?name=${GENDER_JOHN.name}`);
  });

  test('should throw error if name contains numbers', async () => {
    const name = 'qwerty1234';
    // expect that getGenderByName() returns rejected promise proper error
    await expect(getGenderByName(name)).rejects.toThrow(new Error('Invalid name, only EN letters are allowed'));
  });

  test('should throw error if probability is less than 90%', async () => {
    // mock response with probability < 90%
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: GENDER_ANN }));

    // expect that getGenderByName() returns rejected promise with proper error
    await expect(getGenderByName(GENDER_ANN.name)).rejects.toThrow(
      new Error(`Probability is less than 90%, value received = ${GENDER_ANN.probability}`),
    );
  });

  afterEach(() => {
    // clear all mocks to make sure that they won't be passed to any tests out of this file
    jest.clearAllMocks();
  });
});
```