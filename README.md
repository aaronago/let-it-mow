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


## Tech Stack

Let It Mow was created using:

* Node.Js
* Express
* MongoDB / Mongoose
* React
* Redux
* Sockets.io
* Passport
* Oauth 2.0
