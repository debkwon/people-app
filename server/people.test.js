const request = require('supertest-as-promised');
const {expect} = require('chai');
const db = require('../models/people').db;
const People = require('../models/people').People;
const app = require('../app');

describe('/server/people Routes', () => {

  // create people for database
  const people = [
    {
      id: 1,
      name: 'Jane',
      favoriteCity: 'London'
    },
    {
      id: 2,
      name: 'Grace',
      favoriteCity: 'New York City'
    }
  ]

  let jane, grace;

  // drop database and create people records before each test
  before('sync database and create people', () =>

    db.sync({force: true})
    .then(() => {
      //for each of the people in the people array, create their record in db
      db.Promise.map(people,
        person => {
          return People.create(person)
        })
      .then(createdPeople => {
        jane = createdPeople[0]
        grace = createdPeople[1]
      })
    })
  )

  it('GET /json lists all the people', () =>
    request(app)
      .get(`/json`)
      .expect(200)
      .then(res => {
        expect(res.body).to.have.length(people.length)
        const [jane, grace]= res.body
        expect(jane).to.contain.all.keys(['id', 'name', 'favoriteCity'])
        expect(grace).to.contain.all.keys(['id', 'name', 'favoriteCity'])
      })
  )

   it('GET /people/:id/json gets a single review', () =>
    request(app)
      .get(`/people/2/json`)
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('object')
        expect(res.body.name).to.equal("Grace")
        expect(res.body.id).to.equal(2)
        expect(res.body.favoriteCity).to.equal("New York City")
      })
  )

  it('POST /people/json creates a person', () =>
    request(app)
      .post('/people/json')
      .send({
        id:10,
        name: "Lana",
        favoriteCity: "Brooklyn"
      })
      .then(res => {
        expect(res.body.message).to.equal("Person was successfully created")
        expect(res.body.personObj).to.contain({
          id: 10,
          name: "Lana",
          favoriteCity: "Brooklyn"
        })
      })
  )

  it('PUT /people/:id/json updates a person', () =>
    request(app)
      .put('/people/1/json')
      .send({
        name: "Jane",
        favoriteCity: "San Francisco"
      })
      .expect(201)
      .then(res => {
        expect(res.body.message).to.equal("Person was updated")
      })
      .then(() =>
        People.findById(1)
        .then(person=> {
          expect(person).to.be.an('object')
          expect(person.name).to.equal("Jane")
          expect(person.favoriteCity).to.equal('San Francisco')
          expect(person.id).to.equal(1)
        })
      )
  )

  it('DELETE /people/:id/json removes a person', () =>
    request(app)
      .delete('/people/1/json')
      .expect(204)
      .then(() => {
        People.findById(1)
        .then(person => {
          expect(person).to.be.null;
        })
      })
  )

})
