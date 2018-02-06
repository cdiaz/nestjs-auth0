import * as passport from 'passport';
import { Strategy } from 'passport-auth0';
import { Component } from '@nestjs/common';

@Component()
export class Auth0Strategy extends Strategy {

  constructor() {
    super (
      {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
      },
      async (accessToken, refreshToken, extraParams, profile, done) => {
        return done(null, profile);
      }
    )
    passport.use(this);

    passport.serializeUser((user, done) => {
      done(null, user);
    })
  
    passport.deserializeUser((user, done) => {
      done(null, user);
    })
  }

}