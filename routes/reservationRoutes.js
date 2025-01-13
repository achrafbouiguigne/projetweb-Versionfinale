
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); 
const { ensureAuthenticated } = require('../controllers/authController');  


router.post('/api/reservations', ensureAuthenticated, async (req, res) => {
    const { terrain, date, time } = req.body;  
    const user_id = req.session.user.id; 

    
    console.log("Reservation data received:", { user_id, terrain, date, time });

    try {
        const query = 'INSERT INTO reservation (user_id, terrain, date, time) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await pool.query(query, [user_id, terrain, date, time]);

        console.log("Inserted reservation:", result.rows[0]);

        res.status(201).json({ message: 'Réservation ajoutée avec succès', reservation: result.rows[0] });
    } catch (err) {
        console.error('Erreur lors de l\'ajout de la réservation:', err);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la réservation' });
    }
});

router.delete('/api/reservations', ensureAuthenticated, async (req, res) => {
  const user_id = req.session.user.id; 

  try {
     
      const query = 'DELETE FROM reservation WHERE user_id = $1';
      const result = await pool.query(query, [user_id]);

      console.log(`Deleted ${result.rowCount} reservations for user_id: ${user_id}`);

      res.status(200).json({
          message: `${result.rowCount} réservation(s) supprimée(s) avec succès.`,
      });
  } catch (err) {
      console.error('Erreur lors de la suppression des réservations:', err);
      res.status(500).json({ message: 'Erreur lors de la suppression des réservations' });
  }
});

router.get('/api/my-reservations', ensureAuthenticated, async (req, res) => {
  const user_id = req.session.user.id; 

  try {
      const query = 'SELECT * FROM reservation WHERE user_id = $1 ORDER BY date, time';
      const result = await pool.query(query, [user_id]);

      res.status(200).json({
          message: 'Réservations récupérées avec succès',
          reservations: result.rows, 
      });
  } catch (err) {
      console.error('Erreur lors de la récupération des réservations:', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des réservations' });
  }
});






module.exports = router;
