import { Controller, Get, Request, Response, Next } from 'nest.js';
import * as passport from 'passport';
import 'dotenv/config';

@Controller()
export class AppController {

    public env = {
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
        AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL
    }

    @Get()
    public index(@Response() res) {
        res.render('index', { 'title': 'NestJS + Auth0', 'env': this.env
        });
    }

    @Get('/login')
    public async loginView(@Response() res) {
        res.render('login', { 'env': this.env });
    }

    @Get('/callback')
    public async callback(@Request() req, @Response() res, @Next() next) {
        await passport.authenticate('auth0', { 
            successRedirect: '/user', 
            failureRedirect: '/url-if-something-fails' 
        })(req, res, next);
    }

    @Get('/logout')
    public logout(@Request() req, @Response() res) {
        req.logout();
        res.redirect('/');
    }

    @Get('/user')
    public user(@Request() req, @Response() res) {
        res.render('user', { 'user': req.user });
    }
}