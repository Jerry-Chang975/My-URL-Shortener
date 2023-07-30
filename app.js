const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const indexRouter = require('./src/routes/index');

// body parser
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/', indexRouter);

// set up handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './src/views');
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
