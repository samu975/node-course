import { PublicHoliday, PublicHolidayShort } from '../types';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from './public-holidays.service';

const COUNTRY_CODE = 'FR';
const COUNTRY_CODE_INCORRECT = 'COL';
const YEAR = 2023;

const PUBLIC_HOLIDAY_FR_SHORT: PublicHolidayShort = {
  name: 'Christmas Day',
  localName: 'Noël',
  date: '2023-12-25',
};

const PUBLIC_HOLIDAY_FR: PublicHoliday = {
  date: '2023-12-25',
  localName: 'Noël',
  name: 'Christmas Day',
  countryCode: 'FR',
  fixed: true,
  global: true,
  counties: null,
  launchYear: null,
  types: ['Public'],
};

describe('Public Holidays service', () => {
  describe('getListOfPublicHolidays', () => {
    test('should get a list of public holidays in france', async () => {
      const publicHolidays = await getListOfPublicHolidays(YEAR, COUNTRY_CODE);
      const christmasHoliday = publicHolidays.find(
        (holiday) =>
          holiday.date === PUBLIC_HOLIDAY_FR_SHORT.date &&
          holiday.name === PUBLIC_HOLIDAY_FR_SHORT.name
      );

      expect(christmasHoliday).toBeDefined();

      expect(christmasHoliday).toEqual(PUBLIC_HOLIDAY_FR_SHORT);
    });

    test('should thow an error if the countryCode does not exist', async () => {
      await expect(
        getListOfPublicHolidays(YEAR, COUNTRY_CODE_INCORRECT)
      ).rejects.toThrow(
        `Country provided is not supported, received: ${COUNTRY_CODE_INCORRECT}`
      );
    });
  });

  describe('checkIfTodayIsPublicHoliday', () => {
    test('should return false because today is not holiday', async () => {
      const todayIsPublicHoliday = await checkIfTodayIsPublicHoliday(
        COUNTRY_CODE
      );

      expect(todayIsPublicHoliday).toEqual(false);
    });
  });

  describe('getNextPublicHolidays', () => {
    test('should return a list of the next public holidays', async () => {
      const nextholidays = await getNextPublicHolidays(COUNTRY_CODE);
      const christmasHoliday = nextholidays.find(
        (holiday) =>
          holiday.date === PUBLIC_HOLIDAY_FR_SHORT.date &&
          holiday.name === PUBLIC_HOLIDAY_FR_SHORT.name
      );

      expect(christmasHoliday).toBeDefined();

      expect(christmasHoliday).toEqual(PUBLIC_HOLIDAY_FR_SHORT);
    });
    test('should thow an error if the countryCode does not exist', async () => {
      await expect(
        getNextPublicHolidays(COUNTRY_CODE_INCORRECT)
      ).rejects.toThrow(
        `Country provided is not supported, received: ${COUNTRY_CODE_INCORRECT}`
      );
    });
  });
});
