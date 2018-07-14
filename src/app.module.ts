import {Injectable, MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod} from '@nestjs/common';
import {EnsureLoggedIn} from './app.middleware';
import {AppController} from './app.controller';
import {Auth0Strategy} from './auth0.strategy';
import {authenticate} from 'passport';

@Injectable()
class Auth0LoginMiddleware implements NestMiddleware {
  resolve() {
    return authenticate('auth0', {
      clientID: process.env.AUTH0_CLIENT_ID,
      domain: process.env.AUTH0_DOMAIN,
      redirectUri: process.env.AUTH0_CALLBACK_URL,
      audience: 'https://' + process.env.AUTH0_DOMAIN + '/userinfo',
      responseType: 'code',
      scope: 'openid profile'
    });
  }
}

@Injectable()
class Auth0CallbackMiddleware implements NestMiddleware {
  resolve() {
    return authenticate('auth0', {
      successRedirect: '/user',
      failureRedirect: '/'
    });
  }
}

@Module({
  providers: [Auth0Strategy, Auth0LoginMiddleware, Auth0CallbackMiddleware],
  controllers: [AppController]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Auth0LoginMiddleware)
      .forRoutes({path: '/login', method: RequestMethod.ALL})

      .apply(Auth0CallbackMiddleware)
      .forRoutes({path: '/callback', method: RequestMethod.ALL})

      .apply(EnsureLoggedIn)
      .forRoutes({path: '/user', method: RequestMethod.ALL});
  }
}
