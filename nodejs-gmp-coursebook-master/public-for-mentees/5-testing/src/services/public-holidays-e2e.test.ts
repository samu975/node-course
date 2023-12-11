import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

const HOLIDAY_YEAR = 2024;
const HOLIDAY_COUNTRY_CODE = 'FR';

describe('Public Holidays API', () => {
  describe('/LongWeekend', () => {
    test('should return 200 and a list of long week holiday', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/LongWeekend/${HOLIDAY_YEAR}/${HOLIDAY_COUNTRY_CODE}`
      );

      expect(status).toEqual(200);

      expect(body).toEqual([
        {
          startDate: '2023-12-30',
          endDate: '2024-01-01',
          dayCount: 3,
          needBridgeDay: false,
        },
        {
          startDate: '2024-03-30',
          endDate: '2024-04-01',
          dayCount: 3,
          needBridgeDay: false,
        },
        {
          startDate: '2024-05-08',
          endDate: '2024-05-12',
          dayCount: 5,
          needBridgeDay: true,
        },
        {
          startDate: '2024-05-18',
          endDate: '2024-05-20',
          dayCount: 3,
          needBridgeDay: false,
        },
        {
          startDate: '2024-08-15',
          endDate: '2024-08-18',
          dayCount: 4,
          needBridgeDay: true,
        },
        {
          startDate: '2024-11-01',
          endDate: '2024-11-03',
          dayCount: 3,
          needBridgeDay: false,
        },
        {
          startDate: '2024-11-09',
          endDate: '2024-11-11',
          dayCount: 3,
          needBridgeDay: false,
        },
      ]);
    });

    test('should return 404 if the Country code is not accepted', async () => {
      const countryCode = 'COL';

      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/LongWeekend/${HOLIDAY_YEAR}/${countryCode}`
      );

      expect(status).toEqual(404);
      expect(body.title).toEqual('Not Found');
    });
  });

  describe('/AvailableCountries', () => {
    test('should return 200 and a list of avaible contires', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/AvailableCountries`
      );

      expect(status).toEqual(200);
      expect(body).toHaveLength(110);
    });
  });
});
