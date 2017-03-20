const db = require('./people').db
const People= require('./people').People
const {expect} = require('chai')

describe('People model', () => {
  before('wait for the db', () => db.didSync)

  describe('definition', () => {
    it('has expected name attribute', () => {
      expect(People.attributes.name).to.be.a('object');
    });

    it('has expected favoriteCity attribute', () => {
      expect(People.attributes.favoriteCity).to.be.a('object');
    });

  });
});
