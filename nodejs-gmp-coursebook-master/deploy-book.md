# Book deployment

## Instructions
1. Contact Mariia Kolomeiets to request valid AWS credentials - `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`.
2. Update environment variables in [repository settings](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/settings/ci_cd). Make sure that the necessary permissions are granted.
3. Run pipeline [manually](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/pipelines/new) from master branch with `DEPLOY_PROD = true` set.
4. The book will be available at https://d17btkcdsmqrmh.cloudfront.net/node-gmp/docs/Intro.

## Environment variables

| **Variable**       | **Value**        |
|--------------------|------------------|
| AWS_DEFAULT_REGION | eu-central-1     |
| AWS_ACCOUNT_ID     | XXXXXXXX3750     |
| CF_DISTRIBUTION_ID | XXXXXXXXXXF6UL   |
| PROGRAM_PATH       | node-gmp         |
| S3_BUCKET          | ebook-nodejs-gmp |
