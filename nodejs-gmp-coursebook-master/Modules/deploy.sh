#!/bin/bash

## A script for local deployment only
## You need proper AWS credentials to deploy the app
## The script can be used for S3 + CloudFront deployments of your static web app

# colors:
#red=$'\e[1;31m'
grn=$'\e[1;32m'
yel=$'\e[1;33m'
blu=$'\e[1;34m'
end=$'\e[0m'

## Set variables as parameters:
##    ./deploy.sh bucketName distributionId "/nodejs-gmp/*"
##    ./deploy.sh bucketName distributionId
##    ./deploy.sh bucketName
## or replace default values:
S3_BUCKET_NAME=${1:-"ebook-nodejs-gmp-bkt"}
DISTRIBUTION_ID=${2:-"E1D647IOT17LAS"}
INVALIDATION_PATH=${3:-"/*"}

printf  "${grn}:::Using the following deployment parameters:::${end}\n"
printf "   S3 bucket name for deployment: ${grn}%s${end}\n" "${S3_BUCKET_NAME}"
printf "   CloudFront distribution ID for deployment: ${grn}%s${end}\n" "${DISTRIBUTION_ID}"
printf "   Cache invalidation path: ${grn}%s${end}\n" "${INVALIDATION_PATH}"

printf "${blu}=================== Deployment start ===================${end}\n";

###
printf "${yel}Removing old dependencies...${end}\n";
rm -rf node_modules

###
printf "${yel}Installing npm dependencies...${end}\n";
yarn

###
printf "${yel}Building the app...${end}\n";
yarn build

###
printf "${yel}Cleaning up the bucket...${end}\n";
aws s3 rm "s3://${S3_BUCKET_NAME}" --recursive

###
printf "${yel}Copying the app to the bucket...${end}\n";
aws s3 cp build "s3://${S3_BUCKET_NAME}" --recursive

###
printf "${yel}Invalidating cache of distribution...${end}\n";
aws cloudfront create-invalidation --distribution-id "${DISTRIBUTION_ID}" --paths "${INVALIDATION_PATH}" --output text --query "Invalidation.Id" > invalidation-id.txt
aws cloudfront wait invalidation-completed --distribution-id "${DISTRIBUTION_ID}" --id "$(cat invalidation-id.txt)"

###
printf "${yel}Cleaing up...${end}\n";
rm invalidation-id.txt

printf "${blu}=================== Deployment Complete ===================${end}\n";
