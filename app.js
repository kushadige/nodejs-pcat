import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import Photo from './models/Photo.js';

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
//app.use(myLogger);
//app.use(myLogger2);

// Routes
app.get('/', async (req, res) => {
  const photos = await Photo.find().sort('-dateCreated');

  res.render('index', { photos });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add-photo', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  //console.log(req.files);
  //await Photo.create(req.body)
  //res.redirect('/');

  const uploadDir = 'public/uploads';

  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.image;
  let uploadPath = process.cwd() + '\\public\\uploads\\' + uploadImage.name;

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });

    res.redirect('/');
  });

});

app.get('/photos/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', { photo });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'Not Found' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
