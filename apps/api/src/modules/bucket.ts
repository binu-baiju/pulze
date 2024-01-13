const AWS = require("aws-sdk");
import { Endpoint } from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();
// process.env.ACCESSKEYID;
const ACCESSKEYID = process.env.ACCESSKEYID;
const SECRETACCESSKEY = process.env.SECRETACCESSKEY;
const BUCKET_NAME = process.env.BUCKET_NAME;
const END_POINT = process.env.END_POINT;

console.log(ACCESSKEYID);
console.log(SECRETACCESSKEY);


export const bucket = BUCKET_NAME;

export const s3 = new AWS.S3({
  endpoint: END_POINT,
  accessKeyId: ACCESSKEYID,
  secretAccessKey: SECRETACCESSKEY,
  sslEnabled: false,
  s3ForcePathStyle: true,
  region:'Asia Pacific (Mumbai) ap-south-1'
});

// export const s3 = new AWS.S3({
//   endpoint: "http://s3-ap-south-1.amazonaws.com",
//   accessKeyId: ACCESSKEYID,
//   secretAccessKey: SECRETACCESSKEY,
//   sslEnabled: false,
//   s3ForcePathStyle: true,
// });


// endpoint: "https://s3.eu-north-1.amazonaws.com",
