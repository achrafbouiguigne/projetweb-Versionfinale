  const express = require('express');
  const session = require('express-session');
  const path = require('path');
  const pool = require('./config/db');  
  const authRoutes = require('./routes/authRoutes');  

  const app = express();
  const port = process.env.PORT || 3000;

 
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

 
  app.use(express.urlencoded({ extended: true }));


  app.use(session({
    secret: 'your_secret_key',  
    resave: false,
    saveUninitialized: true,
  }));

 
  app.use('/', authRoutes);  
  app.use(express.static('public'));
  app.use(express.json());

  const reservationRoutes = require('./routes/reservationRoutes'); 

 

  app.use('/', reservationRoutes);
  app.get('/api/reservations', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT r.id, r.terrain, r.date, r.time, u.username
        FROM reservation r
        INNER JOIN users u ON r.user_id = u.id
        ORDER BY r.date, r.time;
      `);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

  

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
