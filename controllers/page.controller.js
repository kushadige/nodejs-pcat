import Photo from '../models/photo.model.js';

export const getAboutPage = (req, res) => {
  res.render('about');
};

export const getEditPage = async (req, res) => {
  try {
    const editPhoto = await Photo.findOne({ _id: req.params.id });
    res.render('edit', { editPhoto });
  } catch (err) {
    res.sendStatus(404);
  }
};

export const getAddPage = (req, res) => {
  res.render('add');
};

const pageController = {
  getAboutPage,
  getEditPage,
  getAddPage
};

export default pageController;
