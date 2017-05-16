import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as session from 'express-session';
import * as passport from 'passport';
import { ApplicationModule } from './app.module';
import { PassportService } from './passport.service';

const app = express();

new PassportService(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true
}));
// Init passport authentication
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'assets')));

const nest = NestFactory.create(ApplicationModule, app);

nest.listen(process.env.PORT || 3000,() =>
	{
	    console.log(`Nest app is listening on port ${process.env.PORT}.`);
	}
);