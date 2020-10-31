require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import path from 'path';
import cookieSession from 'cookie-session';
import { errorHandler } from './routes/middlewares';
import { createConnection } from 'typeorm';

const init = async () => {
  console.log(chalk.blue('Starting up...'));
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DATABASE_HOST!,
      port: parseInt(process.env.DATABASE_PORT!),
      username: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      database: process.env.DATABASE_NAME!,
      entities: [`${__dirname}/infrastructure/data/DTO/**/*.js`],
      synchronize: process.env.NODE_ENV == 'dev'? true : false,
    });

    console.log(chalk.green('Conected to PostgreSQL'));
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
  const { auth } = require('./routes/auth');
  const { scrapping } = require('./routes/scrapping');
  const { products } = require('./routes/products');
  const { users } = require('./routes/users');
  const { lists } = require('./routes/lists');
  app.use('/api/auth', auth);
  app.use('/api', scrapping);
  app.use('/api', products);
  app.use('/api', users);
  app.use('/api', lists);
  app.use(errorHandler);

  if (process.env.NODE_ENV === 'pro') {
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.header('host')}${req.url}`);
      else next();
    });
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

const env = () => {
  if (
    !process.env.DATABASE_HOST ||
    !process.env.DATABASE_PORT ||
    !process.env.DATABASE_USER ||
    !process.env.DATABASE_PASSWORD ||
    !process.env.DATABASE_NAME
  ) {
    throw new Error('Some env variables are not setted');
  }
};

//Check that all env variables are setted
env();

//Init the server
init();
