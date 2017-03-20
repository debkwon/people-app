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
There are a separate set of routes if you would like to view the JSON response in instead of the HTML template in the browser. These routes can be found in the same '/server/people.js' file. '/json' is tacked on to the end of the routes written in the first half of the file. You can make CURL requests in the command line OR use Postman to send requests and view responses: https://www.getpostman.com/

Routes
---------
Endpoints can be found in the server/people.js file. Here are the routes:  
GET '/' will list all people  
GET '/people' will display a form to add a person  
GET '/people/:id' will display a form with a person's current info and button options to update or remove them  
POST '/people' will submit the form and create a person (redirects to '/')  
PUT '/people/:id' will update a person in the database (redirects to '/')  
DELETE '/people/:id' will remove a person from the database (redirects to '/')  

GET '/json' will send JSON response of all people  
GET '/people/:id/json' will send JSON response of the specific person found by id  
POST '/people/json' will send JSON response of all people  
PUT '/people/:id/json' will update specific person by id  
DELETE '/people/:id/json' will send a 204 status and remove a single matched person by id from the database  

Templates
---------
You can find all the existing templates in the 'views' folder


