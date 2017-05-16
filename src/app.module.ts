import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { EnsureLoggedIn } from './app.middleware';
import { AppController } from './app.controller';

@Module({
    controllers: [ AppController ]
})

export class ApplicationModule {

  configure(consumer: MiddlewaresConsumer) {
		consumer
		.apply(EnsureLoggedIn)
		.forRoutes({
	        path: 'user',
	        method: RequestMethod.ALL
		})
	}
}
