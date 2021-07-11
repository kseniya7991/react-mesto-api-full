const mongoose = require('mongoose');
const app = require('./app');

const { INTERNAL_SERVER_ERROR } = require('./utils/utils');

const { PORT = 3000 } = process.env;

// подключение к серверу Mongo
async function start() {
  try {
    app.listen(PORT, () => `Server is running on port ${PORT}`);
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (error) {
    return `Init application error: status ${INTERNAL_SERVER_ERROR} ${error}`;
  }
  return null;
}

start();
