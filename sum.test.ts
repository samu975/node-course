import { sum } from './sum';

test('should sum 7 + 3 = 12', () => {
  const result = sum(7, 3);
  expect(result).toBe(10);
});
