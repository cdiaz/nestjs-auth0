import { HttpException, Middleware, NestMiddleware } from 'nest.js';

@Middleware()

export class EnsureLoggedIn implements NestMiddleware {

    constructor() {}

    resolve() {
      return(req, res, next) => {          
        if (!req.isAuthenticated || !req.isAuthenticated()) {
          if (req.session) {
            req.session.returnTo = req.originalUrl || req.url;
          }
          return res.redirect('/login');
        }
        next();
      }
    }     
}