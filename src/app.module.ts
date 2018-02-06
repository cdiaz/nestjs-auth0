import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { EnsureLoggedIn } from './app.middleware';
import { AppController } from './app.controller';
import { Auth0Strategy } from './auth0.strategy';
import * as passport from 'passport';

@Module({
  components: [ Auth0Strategy ],
  controllers: [AppController]
})

export class ApplicationModule {

  configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(EnsureLoggedIn)
      .forRoutes({ path: 'user', method: RequestMethod.ALL })
      .apply(passport.authenticate('auth0', {
        successRedirect: '/user',
        failureRedirect: '/'
      }))
      .forRoutes({ path: 'callback',method: RequestMethod.ALL})
  }
}
