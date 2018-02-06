import { Controller, Get, Req, Res, Next, HttpStatus } from '@nestjs/common';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_CALLBACK_URL } from './common/constants'

@Controller()
export class AppController {

  @Get()
  public index( @Res() res) {
    res.render('index', {
      title: 'NestJS + Auth0',
      env: { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_CALLBACK_URL }
    });
  }

  @Get('/callback')
  public callback() {}

  @Get('/user')
  public user( @Req() req, @Res() res) {
    res.render('user', {
      user: req.user 
    });
  }

  @Get('/logout')
  public logout( @Req() req, @Res() res) {
    req.logout();
    res.redirect('/');
  }

}