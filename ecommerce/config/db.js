const mongoose = require('mongoose');
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = require('.');

const connection = async function () {
  const conn = await mongoose.connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
  );
  console.log('Mongo DB connected:', conn.connection.host);
};

module.exports = { connection, mongoose };
