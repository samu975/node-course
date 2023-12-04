import getS3PhotoPath from './get-s3-photo-path';

const S3_BUCKET_NAME = 'photo-assets';

describe('Get S3 photo path', () => {
  test('should return correct photo path', () => {
    const photoId = '1234567890';
    const path = getS3PhotoPath(S3_BUCKET_NAME, photoId);
    expect(path).toEqual('photo-assets/MTIzNDU2Nzg5MA==/1234567890');
  });
});
