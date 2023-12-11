const getS3PhotoPath = (bucketName: string, photoId: string) => {
  const base64Encoded = Buffer.from(photoId).toString('base64');
  return `${bucketName}/${base64Encoded}/${photoId}`;
};

export default getS3PhotoPath;
