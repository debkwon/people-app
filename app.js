const express = require('express');
const app = express();
const path=require('path')
const morgan = require('morgan');
const nunjucks = require('nunjucks');
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});

const peopleRouter = require('./server/people');
const tables = require('./models/people');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/', peopleRouter);


tables.db.sync()
.then(() => {
  if (!module.parent){
    app.listen(1337, () => {
      console.log('Listening on 1337...')
    })
  }
})

module.exports = app;
