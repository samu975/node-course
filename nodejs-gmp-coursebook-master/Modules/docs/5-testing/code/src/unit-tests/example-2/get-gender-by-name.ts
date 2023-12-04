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
