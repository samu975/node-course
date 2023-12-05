import axios from 'axios';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from './public-holidays.service';

const HOLIDAY_YEAR = 2023;
const HOLIDAY_COUNTRY = 'FR';

const PUBLIC_HOLIDAYS_FRANCE = [
  {
    date: '2023-01-01',
    localName: "Jour de l'an",
    name: "New Year's Day",
    countryCode: 'FR',
    fixed: true,
    global: true,
    counties: null,
    launchYear: 1967,
    types: ['Public'],
  },
  {
    date: '2023-04-10',
    localName: 'Lundi de Pâques',
    name: 'Easter Monday',
    countryCode: 'FR',
    fixed: false,
    global: true,
    counties: null,
    launchYear: 1642,
    types: ['Public'],
  },
];

describe('Get list of public holidays function', () => {
  // setup on axios.getListOfPublicHolidays()
  const axiosGetListOfPublicHolidaysInFranceSpy = jest
    .spyOn(axios, 'get')
    .mockImplementation(() =>
      Promise.resolve({ data: PUBLIC_HOLIDAYS_FRANCE })
    );

  test('Should call API with proper arguments', async () => {
    await getListOfPublicHolidays(HOLIDAY_YEAR, HOLIDAY_COUNTRY);
    expect(axiosGetListOfPublicHolidaysInFranceSpy).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${HOLIDAY_YEAR}/${HOLIDAY_COUNTRY}`
    );
  });

  test('Should return an error if the countrieCode does not exist', async () => {
    const countryCode = 'COL';
    await expect(
      getListOfPublicHolidays(HOLIDAY_YEAR, countryCode)
    ).rejects.toThrowError(
      `Country provided is not supported, received: ${countryCode}`
    );
  });

  test('Should return an array with public holidays in france', async () => {
    const result = await axios.get(
      `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${HOLIDAY_YEAR}/${HOLIDAY_COUNTRY}`
    );
    expect(result.data).toEqual(PUBLIC_HOLIDAYS_FRANCE);
  });

  afterEach(() => {
    // clear all mocks to make sure that they won't be passed to any tests out of this file
    jest.clearAllMocks();
  });
});

describe('Check If Today Is Public Holiday function', () => {
  test('Should return status 200 if today is holiday', async () => {
    jest
      .spyOn(axios, 'get')
      .mockImplementationOnce(() => Promise.resolve({ status: 200 }));

    const response = await axios.get(
      `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${HOLIDAY_COUNTRY}`
    );
    expect(response.status).toBe(200);
  });

  test('Should return status 400 if today is not a holiday', async () => {
    jest
      .spyOn(axios, 'get')
      .mockImplementationOnce(() => Promise.resolve({ status: 400 }));

    const response = await axios.get(
      `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${HOLIDAY_COUNTRY}`
    );
    expect(response.status).toBe(400);
  });

  test('Should call API with proper arguments ', async () => {
    const checkIfTodayIsPublicHolidaySpy = jest
      .spyOn(axios, 'get')
      .mockImplementationOnce(() => Promise.resolve({ status: 200 }));

    await checkIfTodayIsPublicHoliday(HOLIDAY_COUNTRY);

    expect(checkIfTodayIsPublicHolidaySpy).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${HOLIDAY_COUNTRY}`
    );
  });

  test('Should return an error if the countrieCode does not exist ', async () => {
    const countryCode = 'COL';
    await expect(checkIfTodayIsPublicHoliday(countryCode)).rejects.toThrowError(
      `Country provided is not supported, received: ${countryCode}`
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('Get the next public holiday', () => {
  // setup on axios.getNextPublicHolidays()
  const axiosGetNextPublicHolidaysFranceSpy = jest
    .spyOn(axios, 'get')
    .mockImplementation(() =>
      Promise.resolve({ data: PUBLIC_HOLIDAYS_FRANCE })
    );

  test('Should call API with proper arguments', async () => {
    await getNextPublicHolidays(HOLIDAY_COUNTRY);
    expect(axiosGetNextPublicHolidaysFranceSpy).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${HOLIDAY_COUNTRY}`
    );
  });

  test('Should return an error if the countrieCode does not exist', async () => {
    const countryCode = 'COL';
    await expect(getNextPublicHolidays(countryCode)).rejects.toThrowError(
      `Country provided is not supported, received: ${countryCode}`
    );
  });

  test('Should return an array with the next public holiday', () => {
    async () => {
      const result = await axios.get(
        `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${HOLIDAY_COUNTRY}`
      );
      expect(result.data).toEqual(PUBLIC_HOLIDAYS_FRANCE);
    };
  });
});
