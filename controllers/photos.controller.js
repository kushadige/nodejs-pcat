import fs from 'fs';
import Photo from '../models/photo.model.js';

export const getAllPhotos = async (req, res) => {

  const page = req.query.page || 1;
  const photosPerPage = 2;
  const totalPhotos = await Photo.find().countDocuments();

  const photos = await Photo.find()
  .sort('-dateCreated')
  .skip((page - 1) * photosPerPage)
  .limit(photosPerPage);

  res.render('index', { 
    photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage)
  });
};

export const getPhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', { photo });
  } catch (err) {
    res.sendStatus(404);
  }
};

export const createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
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
};

export const updatePhoto = async (req, res) => {
  try {
    const photo = await Photo.findOne({ _id: req.params.id });

    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();

    res.redirect(`/photos/${req.params.id}`);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findOne({ _id: req.params.id });

    const deletedImage = process.cwd() + '/public' + photo.image;

    fs.unlinkSync(deletedImage);

    await Photo.findByIdAndRemove(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.sendStatus(400);
  }
};

const photosController = {
  getAllPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto
};

export default photosController;