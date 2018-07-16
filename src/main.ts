import {NestFactory} from '@nestjs/core';
import 'dotenv/config';
import * as express from 'express';
import * as path from 'path';
import * as session from 'express-session';
import * as passport from 'passport';
import {ApplicationModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(express.static(path.join(__dirname, 'assets')));
  app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    console.log(`Nest app is listening on port ${PORT}.`);
  })
}

bootstrap();
