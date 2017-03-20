const Sequelize = require('sequelize')
const databaseURI = process.env.DATABASE_URL || 'postgres://localhost:5432/peoples';
const db = new Sequelize(databaseURI);

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
