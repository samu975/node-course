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
