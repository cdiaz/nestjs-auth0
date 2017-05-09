# Auth0 + NestJS Seed 
This is the seed project you need to use if you're going to create regular [NestJS Framework](http://nestjs.com) web application with Auth0. 

#Running the example
In order to run the example you need to have npm and NodeJS installed.

Now, run `npm install` to install the dependencies.

You also need to set the ClientSecret, ClientId and Domain for your [Auth0](https://auth0.com/signup) app as environment variables with the following names respectively: `AUTH0_CLIENT_SECRET`, `AUTH0_CLIENT_ID` , `AUTH0_DOMAIN` and `AUTH0_CALLBACK_URL` .

For that, if you just create a file named `.env` in the directory and set the values like the following, the app will just work:

````bash
# .env file
AUTH0_CLIENT_SECRET=myCoolSecret
AUTH0_CLIENT_ID=myCoolClientId
AUTH0_DOMAIN=myCoolDomain
AUTH0_CALLBACK_URL=myCallbackUrl
PORT=myAppPort
````

Once you've set those 3 environment variables, just run `npm start` and try calling [http://localhost:3000/](http://localhost:3000/)

![](https://media.giphy.com/media/3o7btM9aGAzX6iYBji/giphy.gif)