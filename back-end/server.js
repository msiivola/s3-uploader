var multer  =  require('multer');
var multerS3 = require('multer-s3')
const express = require('express');
// var cors = require('cors');

// Set up the Express app
const app = express();
// app.use(cors()) // Enable CORS

// Get environment variables
const  {
  BUCKET_NAME,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY_ID,
  PORT
} = require('./config');

// A quick test to see if we have env vars
if (typeof BUCKET_NAME === 'undefined') {
  console.log("Error: environment variables not defined. Use 'npm run start_local instead.");
  return;
}

// Serve static files for the Vue app
// app.use(express.static('dist'));

// Configure the AWS environment.
const AWS = require('aws-sdk'); // Automatically reads credentials from env vars
AWS.config.update({region: AWS_REGION});
const s3 = new AWS.S3();

// First list all buckets
var params = {};
s3.listBuckets(params, function(err, data) {
 if (err) {
    console.log("Error - could not list buckets");
  // console.log(err, err.stack); // an error occurred
 }
 else {
  console.log("List buckets:");
  console.log(data);           // successful response
 }
});

// Then list contents of the bucket
var params = {
  Bucket: BUCKET_NAME,
  //MaxKeys: 2
 };
 
s3.listObjects(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    console.log("List objects in", BUCKET_NAME);
    console.log(data);           // successful response
  }
});

// Note: the URL is of the style: https://BUCKET_NAME.s3.amazonaws.com/TODO.txt

// Get a pre-signed URL for GetObject operation for TODO.txt
var getPreSignedUrl = function() {
  var params = {Bucket: BUCKET_NAME, Key: 'fromApp/TODO.txt', Expires: 60};
  var url = s3.getSignedUrl('getObject', params);
  console.log('The URL is', url);
  return url;
};

// Set up Multer for uploads to our S3 bucket
var upload = multer({
   storage: multerS3({
     s3: s3,
     bucket: BUCKET_NAME,
     // metadata: function (req, file, cb) {
     //   cb(null, {fieldName: file.fieldname});
     // },
     key: function (req, file, cb) {
       cb(null, 'fromApp/' + file.originalname)
     }
   })
 }).single('userFile');

// -------------API -----------------------------------------------

// Upload.html
// app.get('/',function(req,res){
//       res.sendFile(__dirname + "/upload.html");
// });

// Upload files to S3
app.post('/api/upload',function(req,res){
    console.log('[api/upload]');
    upload(req, res, function(err) {
        if (err) {
          console.log("Error uploading file.");
          res.sendStatus(400);
        } else {
          console.log("File was uploaded");
          res.sendStatus(200);
        }
    });
});

// Generate an expiring URL for access to one object
app.get('/api/presigned', function(req, res) {
  console.log('[/api/presigned]')
  res.json({'url': getPreSignedUrl()});
});


// ------------ Server ---------------------

// Start server
app.listen(PORT, function(){
    console.log("Working on port", PORT);
});
