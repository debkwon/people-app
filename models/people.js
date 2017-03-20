const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/peoples');

const People = db.define('peoples', {
  name: {
    type: Sequelize.STRING
  },
  favoriteCity: {
    type: Sequelize.STRING,
  }
});

module.exports = {
  People,
  db
}
