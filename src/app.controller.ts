import { Controller, Get, Res, Req, Render } from '@nestjs/common';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_CALLBACK_URL } from './common/constants'

@Controller()
export class AppController {

  @Get()
  @Render('index')
  public index() {
    return {
      title: 'NestJS + Auth0',
      env: { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_CALLBACK_URL }
    };
  }

  @Get('/callback')
  public callback() {}

  @Get('/user')
  @Render('user')
  public user( @Req() req) {
    return { user: req.user };
  }

  @Get('/logout')
  public logout( @Req() req, @Res() res) {
    req.logout();
    res.redirect('/');
  }

}