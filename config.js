//const dotenv = require('dotenv');
//dotenv.config(); // Read .env file
module.exports = {
    BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    PORT: process.env.PORT
};
