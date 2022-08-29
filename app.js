import express from 'express';

const app = express();

// Template engine
app.set('view engine', 'ejs');

/*
const myLogger = (req, res, next) => {
  console.log('Middleware Log 1');
  next(); // in order to continue to next middleware
}
const myLogger2 = (req, res, next) => {
  console.log('Middleware Log 2');
  setTimeout(() => {
    next(); // in order to continue to the next middleware
  }, 500);
}
*/

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//app.use(myLogger);
//app.use(myLogger2);

app.get('/', (req, res) => {
  
  const photo = {
    id: 1,
    name: 'Photo Name',
    description: 'Photo description',
  };

  res.render('index', {...photo});
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add-photo', (req, res) => {
  res.render('add');
});

app.post('/photos', (req, res) => {

  console.log(req.body);

  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
