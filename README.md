# Let It Mow
This application builds upon the [sharing economy](http://people.uta.fi/~kljuham/2015-hamari_at_al-the_sharing_economy.pdf)  by offering a fully featured marketplace where users can find equipment that they need for yard work and rent it out for the day (or the week) instead buying something that they may use once or twice a year. Users can also post listings for equipment that they own and make extra money by renting it out to their neighbors.

The live app can be viewed here: [Let It Mow](http://let-it-mow.herokuapp.com/). It is currently centered around the Denver, Colorado area but is easily scalable to include any city or locale.



## Fork let-it-mow and contribute!

First, fork the repo on Github to your own account.

The secret keys that you'll need to get the app working are:
google Oauth CLIENT_ID AND CLIENT_SECRET
visit [google's dev console to](https://console.developers.google.com) to get those. You will also need an API key from [Zipe Code Api](https://www.zipcodeapi.com/API). Store all of those in a git ignored file and you're ready to run Let It Mow locally. Run npm install then npm run dev and visit http://localhost:8080/.

## Features

### User Submit Form

  The user submit form to allow users to add new rental listings is implemented
with [Redux Form](http://redux-form.com/6.7.0/).

Using Redux Form simplified much of building the form component. The code for creating each field is very consistent, making the code clean and easy to understand. Form validation is made easier using the validate method, and accessing the form's field values for submittal or to pass as props is uncomplicated and requires few lines of code.

The documentation for Redux Form is fairly comprehensive and there are decent examples to help get anyone started with it.

### Messaging and Real Time chat
Let it Mow offers users the ability to send a message to any renter about any piece of equipment directly through the site.
![chat](https://raw.githubusercontent.com/Jean-Luc19/let-it-mow/unread-messages-feature/client/public/images/chat-screen-shot1.png)

The next time the owner of that listing visits the site he'll be notified that he has new messages about that listing.






















## Getting started

First, fork the repo on Github to your own account

### Clone the repo

```sh
$ git clone https://github.com/YOUR_USERNAME_HERE/spaced-repetition-starter
```

```sh
$ cd spaced-repetition-starter
```

```sh
$ npm install
```

You can run it locally now with `npm run dev`, except you will need your own credentials
to get up and running with Google OAth.

### Get Google OAuth Credentials

Visit https://console.developers.google.com

* Navigate to Library
* Under 'Social APIs', Click 'Google+ API'
* Click 'Enable' at the top (if it isn't already)


* Navigate to Credentials
* It may require you to configure OAuth consent screen.
* Click 'Create credentials'
* Choose 'OAuth Client ID'
* Choose 'Web application'
* Add `http://localhost:8080` to Authorized JavaScript origins
* Add `http://localhost:8080/api/auth/google/callback` to Authorized redirect URIs
* Click 'Create'

You should get a Client ID and Secret.

Back in your project locally, create an `secret.js` file in the `/server` directory:

(Use the client ID and secret we just got from Google)

```js
module.exports = {
  CLIENT_ID: 'yourId123.apps.googleusercontent.com',
  CLIENT_SECRET: 'yoursecret'
}
```

This file is ignored by git because it is in your `.gitignore`. Never commit or push 'secret.js', the client id and secret need to be kept safe like a password.

### Local Development

```sh
  npm run dev
```

## Deployment to Heroku

```sh
$ heroku create
```

Configure your Google client id and secret on Heroku:

```sh
$ heroku config:set CLIENT_ID=yourId123.apps.googleusercontent.com CLIENT_SECRET=yoursecret
```

(You can also do this on dashboard.heroku.com under your app's settings.)

### To deploy:

```sh
$ git push heroku master
```

Your app should be live on Heroku soon, but if you try to `Log in with Google`, you will get a 400 error. Take note of your new app's URL.


#### Updating Google API authorized origins


To fix this, go back to the Google API Dashboard and:

(You might need to use `http` and or `http` for your Heroku URIs)

- Add `http://your-app-name-123.herokuapp.com` to Authorized JavaScript origins
- Add `http://your-app-name-123.herokuapp.com/api/auth/google/callback` to Authorized redirect URIs

Try to log in  `Log in with Google` again, and you're golden!

## Project's background information

#### Project's main goal

The goal of this project was to build an application that works and that people want to use.

#### Project's objective

The main object of this project is to practice and showcase the skills we've been learning in the
last few months.

#### Steps taken to complete the project

- Come up with project ideas
- Decide as a group on the best idea
- Choosing an API
- Design user flows
- Come up with application wireframes
- Finish and present MVP
- Get user feedback
- Improve application upon feedback
- Style
- [Documentation](https://medium.com/@meakaakka/a-beginners-guide-to-writing-a-kickass-readme-7ac01da88ab3)
- Final clean up
- Presentation
