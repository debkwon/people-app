const api = require('express').Router();
const People = require('../models/people').People;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

api.use(bodyParser.urlencoded({extended:false}));
api.use(bodyParser.json());

//for PUT or DELETE requests, HTML form actions can take a param that will override the method..for example: <form action='update/1?_method=PUT'> will allow you to keep a PUT route
api.use(methodOverride('_method'));

let jsonRes = (res) => JSON.stringify(res,null,'\t')

/*******ROUTES********/

api.get('/', (req,res,next) => {
  People.findAll()
  .then(allPeople => {
    res.render('index', {
      people: allPeople,
      json: jsonRes(allPeople)
    })
  })
  .catch(next)
})

api.get('/people', (req,res,next) => {
  res.render('add_people')
})

api.get('/people/:id', (req,res,next) => {
  People.findById(req.params.id)
  .then(foundPerson => {
    res.render('edit_people', {
      person: foundPerson,
      json: jsonRes(foundPerson)
    })
  })
  .catch(next)
})

api.post('/people', (req,res,next) => {
  People.create(req.body)
  .then(createdPerson => {
    res.status(201).redirect('/')
  })
  .catch(next);
})

api.put('/people/:id', (req,res,next) => {
  People.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(() => res.status(201).redirect('/'))
  .catch(next)
})

api.delete('/people/:id', (req,res,next) => {
  People.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.status(204).redirect('/'))
  .catch(next)
})

///****sending JSON response instead of HTML templates*****

api.get('/json', (req,res,next) => {
  People.findAll()
  .then(allPeople => {
    res.json(allPeople)
  })
  .catch(next)
})

api.get('/people/:id/json', (req,res,next) => {
  People.findById(req.params.id)
  .then(foundPerson => {
    res.json(foundPerson)
  })
  .catch(next)
})

api.post('/people/json', (req,res,next) => {
  People.create(req.body)
  .then(createdPerson => {
    res.status(201).send({message: "Person was successfully created", personObj: createdPerson})
  })
  .catch(next);
})

api.put('/people/:id/json', (req,res,next) => {
  People.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(() => res.status(201).send({message: "Person was updated"}))
  .catch(next)
})

api.delete('/people/:id/json', (req,res,next) => {
  People.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.status(204).send())
  .catch(next)
})

//for any other requests, send error along
api.use((err,req,res, next) => {
  res.status(500).send(err)
})

api.use((req, res) => {
  res.status(404).end()
})

module.exports = api
