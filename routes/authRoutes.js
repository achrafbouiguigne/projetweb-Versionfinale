const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/', (req, res) => res.render('index'));


router.get('/login', (req, res) => res.render('login'));


router.get('/register', (req, res) => res.render('register'));

router.get('/privacy-policy', (req, res) => res.render('privacy-policy'));
router.get('/contact', (req, res) => res.render('contact'));


router.post('/register', authController.registerUser);


router.post('/login', authController.loginUser);


router.get('/dashboard', authController.ensureAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

router.get('/reservation', authController.ensureAuthenticated, (req, res) => {
  res.render('reservation', { user: req.session.user });
});

router.get('/allReservations', authController.ensureAuthenticated,(req, res) =>{ 
  res.render('allReservations', { user: req.session.user });


});

router.get('/monProfile', authController.ensureAuthenticated, (req, res) => {
  res.render('monProfile', { user: req.session.user });
});









module.exports = router;
