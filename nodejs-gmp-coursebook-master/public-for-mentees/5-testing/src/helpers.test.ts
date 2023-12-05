import { validateInput, shortenPublicHoliday } from './helpers';

describe('validateInput', () => {
  it('should throw an error for unsupported country', () => {
    expect(() => validateInput({ country: 'Country_Unsupported' })).toThrow();
  });

  it('should throw an error for an incorrect year', () => {
    const notCurrentYear = new Date().getFullYear() - 1;
    expect(() => validateInput({ year: notCurrentYear })).toThrow();
  });

  it('should return true for valid inputs', () => {
    const currentYear = new Date().getFullYear();
    expect(validateInput({ year: currentYear, country: 'FR' })).toBeTruthy();
  });
});

describe('shortenPublicHoliday', () => {
  it('should return a shortened public holiday object', () => {
    const fullHoliday = {
      date: '2024-05-08',
      localName: 'Victoire 1945',
      name: 'Victory in Europe Day',
      countryCode: 'FR',
      fixed: true,
      global: true,
      counties: null,
      launchYear: null,
      types: ['Public'],
    };
    const expectedShort = {
      name: 'Victory in Europe Day',
      localName: 'Victoire 1945',
      date: '2024-05-08',
    };

    expect(shortenPublicHoliday(fullHoliday)).toEqual(expectedShort);
  });
});
