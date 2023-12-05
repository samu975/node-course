import axios from 'axios';
import getGenderByName from './get-gender-by-name';

const GENDER_JOHN = {
  name: 'john',
  gender: 'male',
  probability: 0.999,
  count: 1,
};

// mock axios module. pay attention name is passed as string
jest.mock('axios');
// some magic around types
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('[Mocks] Get gender by name', () => {
  test('should return gender', async () => {
    // mock response from API
    mockedAxios.get.mockResolvedValue({ data: GENDER_JOHN });

    const genderResponse = await getGenderByName(GENDER_JOHN.name);
    // expect that getGenderByName() func returns what API returns
    expect(genderResponse).toEqual(GENDER_JOHN);
  });

  afterEach(() => {
    // clear all mocks to make sure that they won't be passed to any tests out of this file
    jest.clearAllMocks();
  });
});
