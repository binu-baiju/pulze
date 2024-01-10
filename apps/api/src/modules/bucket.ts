const AWS = require("aws-sdk");
import { Endpoint } from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();
// process.env.ACCESSKEYID;
const ACCESSKEYID = process.env.ACCESSKEYID;
const SECRETACCESSKEY = process.env.SECRETACCESSKEY;
const BUCKET_NAME = process.env.BUCKET_NAME;
const END_POINT = process.env.END_POINT;

export const bucket = BUCKET_NAME;

export const s3 = new AWS.S3({
  endpoint: END_POINT,
  accessKeyId: 'AKIAS5RNQ32LXOR7TBLP',
  secretAccessKey: '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',
  sslEnabled: false,
  s3ForcePathStyle: true,
  
});

// export const s3 = new AWS.S3({
//   endpoint: "http://s3-ap-south-1.amazonaws.com",
//   accessKeyId: ACCESSKEYID,
//   secretAccessKey: SECRETACCESSKEY,
//   sslEnabled: false,
//   s3ForcePathStyle: true,
// });


// endpoint: "https://s3.eu-north-1.amazonaws.com",
