const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();

  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log("Can't append to server.log");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Oops!',
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (reqreq, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to the page, peeps!',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About my page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Wicked projects yo!',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
