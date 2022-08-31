import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import methodOverride from 'method-override';

import photosController from './controllers/photos.controller.js';
import pageController from './controllers/page.controller.js';

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

// template engine
app.set('view engine', 'ejs');


// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}));


// ROUTES
app.get('/', photosController.getAllPhotos);
app.get('/photos/:id', photosController.getPhoto);
app.post('/photos', photosController.createPhoto);
app.put('/photos/:id', photosController.updatePhoto);
app.delete('/photos/:id', photosController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add-photo', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);


app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});