require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import chalk from 'chalk';
import path from 'path';
import cookieSession from 'cookie-session';
import { auth, media, groups } from './routes';
import { errorHandler } from './routes/middlewares';

const sslRedirect = require('heroku-ssl-redirect');

const init = async () => {
  console.log(chalk.blue('Starting up...'));
  try {
    await mongoose.connect(process.env.DATABASE_URL || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(chalk.green('Conected to MongoDB'));
  } catch (err) {
    console.error(err);
  }

  const app = express();

  app.set('port', process.env.PORT || 5000);
  console.log(
    chalk.blue(
      `App Environment: PORT: ${app.get('port')} CONFIG: ${
        process.env.NODE_ENV
      } `
    )
  );

  app.use(bodyParser.json());
  app.use(
    cookieSession({
      signed: false,
      secure: false,
      // maxAge: 900000,
      httpOnly: false,
    })
  );
  app.use('/api/auth', auth);
  app.use('/api', groups);
  app.use('/api', media);
  app.use(errorHandler);

  if (process.env.NODE_ENV === 'pro') {
    app.use(sslRedirect(['pro']));
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(
        path.resolve(__dirname, '..', 'client', 'build', 'index.html')
      );
    });
  }

  app.listen(app.get('port'), () => {
    console.log(chalk.bgGreen.black.bold(`Server running...`));
  });
};

init();
