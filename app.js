const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const routes = require('./routes/index');
const rateLimiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errHandler = require('./middlewares/errHandler');
const envConfig = require('./configs/envCfg')

const { PORT, DB_URL } = envConfig();
const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(rateLimiter);
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/', routes);

app.use(errorLogger);
app.use(errHandler);

app.listen(PORT);
