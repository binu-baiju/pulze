const AWS = require("aws-sdk");

const ACCESSKEYID = process.env.ACCESSKEYID;
const SECRETACCESSKEY = process.env.SECRETACCESSKEY;
const BUCKET_NAME = process.env.BUCKET_NAME;

export const bucket = BUCKET_NAME;

export const s3 = new AWS.S3({
  endpoint: "http://s3-ap-south-1.amazonaws.com",
  accessKeyId: "AKIAS5RNQ32LZBCCWN5J",
  secretAccessKey: "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",
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
