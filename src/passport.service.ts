import * as Auth0Strategy from 'passport-auth0';
import 'dotenv/config';

export class PassportService {

    constructor(private passport){

		// This will configure Passport to use Auth0
		const strategy = new Auth0Strategy({
		    domain:       process.env.AUTH0_DOMAIN,
		    clientID:     process.env.AUTH0_CLIENT_ID,
		    clientSecret: process.env.AUTH0_CLIENT_SECRET,
		    callbackURL:  process.env.AUTH0_CALLBACK_URL
		}, (accessToken, refreshToken, extraParams, profile, done) => {
		    // accessToken is the token to call Auth0 API (not needed in the most cases)
		    // extraParams.id_token has the JSON Web Token
		    // profile has all the information from the user
		    return done(null, profile);
		  });

		passport.use(strategy)

		// you can use this section to keep a smaller payload
		passport.serializeUser((user, done) => {
			done(null, user)
		})

		passport.deserializeUser((user, done) => {
			done(null, user);
		})
    }
}