REST-ful API example
---------
To get started:
Fork and/or clone this repo

In your command line:

* npm install
* npm start
* npm run test

In your browser, head to localhost:1337

Overview
---------
People objects look like:

  {
    id: 1,
    name: 'Jane',
    favoriteCity: 'London'
  }

You can make requests to:

* add people, with a name and favoriteCity
* edit people's details
* remove people from the list
* view a list of all people

JSON responses:
---------
There are a separate set of routes if you would like to view the JSON response in your browser instead of an HTML template. These routes can be found in the same '/server/people.js' file. '/json' is tacked on to the end of the routes written in the first half of the file.

Routes
---------
Backend routes are in the 'server' folder, in the people.js file

Templates
---------
You can find all the existing templates in the 'views' folder


