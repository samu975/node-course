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
