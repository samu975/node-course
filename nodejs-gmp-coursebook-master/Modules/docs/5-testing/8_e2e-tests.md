---
sidebar_position: 8
---
# E2E tests

In previous sections we’ve learnt how to do unit and integration testing that focus on testing particular bits of your backend application. On the other side, there are End-to-End tests that aim to test the whole flow from start to the end.

If there is a frontend part for your backend application, E2E tests will likely be done together with UI. But there are some backend applications that are not meant to have UI at all. In this case E2E tests are more like API tests. You have API exposed and you do testing against your endpoints.

**Core things to keep in mind when writing E2E tests:**
- You are testing the whole application flow that will touch all application layers.
- E2E testing is the most expensive in terms of resources. Do E2E testing for those endpoints that are critical for your application, not for all.
- Think of cover testing different status codes, not only 200.
- Make sure that the structure of response returned is the one that you expect.

## Libraries for E2E testing

For doing E2E testing focused on API, we will be using [npm package](https://www.npmjs.com/package/supertest) `supertest`. This package allows you to listen to any connections on particular url, call API endpoints and validate the response in combination with Jest.

:::note
`supertest` is just an example. You can simply use `fetch` or `axios` to make API calls and then validate output with Jest.
:::

## API overview

We will do E2E testing against public Cat facts API ([Swagger](https://catfact.ninja/)) not to spend much time on implementing our own API. If you check Swagger, Cat facts API has 3 endpoints:
- `/fact` - to get single fact
- `/facts` - to get several facts paginated (`limit` prop)
- `/breeds` - to get several breeds paginated (`limit` prop)

Facts endpoints allow you to specify `max_length` query param. By Swagger docs, if this attribute is specified, you will be returned a fact or facts that are no longer than `max_length`.

## Testing

What is important to check in E2E tests? Status codes and response body structure.

### /fact endpoint

Let’s have a look at how E2E tests for `/fact` endpoint would look like. We have 3 test scenarios:
1. check if get random cat fact returns status code 200 and body that contains `fact` and `length` props. 
2. check if get random cat fact with `max_length` specified returns status code 200 and fact length is less or equal to `max_length`
3. check if get random cat fact with `max_length=0` returns status code 200 and empty response body

```js title="src/e2e/example-1/cats-api.test.ts"
import request from 'supertest';

const CATS_API = 'https://catfact.ninja'; // swagger https://catfact.ninja/

describe('Cats API', () => {
  describe('/fact', () => {
    test('should return 200 and random cat fact', async () => {
      const { status, body } = await request(CATS_API).get('/fact');

      expect(status).toEqual(200);
      expect(body).toEqual({
        fact: expect.any(String),
        length: expect.any(Number),
      });
    });

    test('should return 200 and random cat fact with max length specified', async () => {
      const maxFactLength = 22;
      const { status, body } = await request(CATS_API).get(`/fact?max_length=${maxFactLength}`);

      expect(status).toEqual(200);
      expect(body).toEqual({
        fact: expect.any(String),
        length: expect.any(Number),
      });

      expect(body.length).toBeLessThanOrEqual(maxFactLength);
    });

    test('should return 200 and empty object if length of fact is 0', async () => {
      const maxFactLength = 0;
      const { status, body } = await request(CATS_API).get(`/fact?max_length=${maxFactLength}`);

      expect(status).toEqual(200);
      expect(body).toEqual({});
    });
  });
});
```
### /breeds endpoint

For `/breeds` endpoint, we have 2 things to check:
1. check if breeds with `limit = 2` specified returns status code 200 and two objects containing `breed`, `country`, `origin`, `coat` and `pattern` props.
2. check if breeds with no limit specified returns status code 200, pagination data and breeds.

```js title="src/e2e/example-1/cats-api.test.ts"
describe('/breeds', () => {
  test('should return 200 and list of breeds if limit is 2', async () => {
    const limit = 2;
    const { status, body } = await request(CATS_API).get(`/breeds?limit=${limit}`);

    expect(status).toEqual(200);

    // verify body structure
    body.data.forEach((breed: any) => {
      expect(breed).toEqual({
        breed: expect.any(String),
        country: expect.any(String),
        origin: expect.any(String),
        coat: expect.any(String),
        pattern: expect.any(String),
      });
    });

    // verify number of items returned
    expect(body.data.length).toEqual(limit);
  });

  test('should return 200 and list of breeds if limit is not specified', async () => {
    const { status, body } = await request(CATS_API).get(`/breeds`);

    expect(status).toEqual(200);

    // verify the structure of response
    expect(body).toEqual(
      expect.objectContaining({
        current_page: 1,
        data: expect.any(Array),
        first_page_url: `${CATS_API}/breeds?page=1`,
        links: expect.any(Array),
        next_page_url: `${CATS_API}/breeds?page=2`,
        path: `${CATS_API}/breeds`,
        per_page: 25,
        prev_page_url: null,
        to: 25,
      }),
    );
  });
});
```

### /facts endpoint

We haven’t covered `/facts` endpoint because the tests are the same as in `/breeds` endpoint. So that’s how our E2E tests for Cat facts API look like:

```js title="src/e2e/example-1/cats-api.test.ts"
import request from 'supertest';

const CATS_API = 'https://catfact.ninja'; // swagger https://catfact.ninja/

describe('Cats API', () => {
  describe('/fact', () => {
    test('should return 200 and random cat fact', async () => {
      const { status, body } = await request(CATS_API).get('/fact');

      expect(status).toEqual(200);
      expect(body).toEqual({
        fact: expect.any(String),
        length: expect.any(Number),
      });
    });

    test('should return 200 and random cat fact with max length specified', async () => {
      const maxFactLength = 22;
      const { status, body } = await request(CATS_API).get(`/fact?max_length=${maxFactLength}`);

      expect(status).toEqual(200);
      expect(body).toEqual({
        fact: expect.any(String),
        length: expect.any(Number),
      });

      expect(body.length).toBeLessThanOrEqual(maxFactLength);
    });

    test('should return 200 and empty object if length of fact is 0', async () => {
      const maxFactLength = 0;
      const { status, body } = await request(CATS_API).get(`/fact?max_length=${maxFactLength}`);

      expect(status).toEqual(200);
      expect(body).toEqual({});
    });
  });

  describe('/breeds', () => {
    test('should return 200 and list of breeds if limit is 2', async () => {
      const limit = 2;
      const { status, body } = await request(CATS_API).get(`/breeds?limit=${limit}`);

      expect(status).toEqual(200);

      // verify body structure
      body.data.forEach((breed: any) => {
        expect(breed).toEqual({
          breed: expect.any(String),
          country: expect.any(String),
          origin: expect.any(String),
          coat: expect.any(String),
          pattern: expect.any(String),
        });
      });

      // verify number of items returned
      expect(body.data.length).toEqual(limit);
    });

    test('should return 200 and list of breeds if limit is not specified', async () => {
      const { status, body } = await request(CATS_API).get(`/breeds`);

      expect(status).toEqual(200);

      // verify the structure of response
      expect(body).toEqual(
        expect.objectContaining({
          current_page: 1,
          data: expect.any(Array),
          first_page_url: `${CATS_API}/breeds?page=1`,
          links: expect.any(Array),
          next_page_url: `${CATS_API}/breeds?page=2`,
          path: `${CATS_API}/breeds`,
          per_page: 25,
          prev_page_url: null,
          to: 25,
        }),
      );
    });
  });
});
```