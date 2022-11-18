var express = require('express');
var router = express.Router();
const Dining_controlers= require('../controllers/Dining');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('Dining', { title: 'Search results' });
// });

module.exports = router;
/* GET detail Dining page */ 
router.get('/detail', Dining_controlers.Dining_view_one_Page); 

/* GET create Dining page */ 
router.get('/create', Dining_controlers.Dining_create_Page); 
 
 
// GET create Dining page */ 
router.get('/update', Dining_controlers.Dining_update_Page); 


/* GET delete costume page */ 
router.get('/delete', Dining_controlers.Dining_delete_Page); 

router.get('/', Dining_controlers.Dining_view_all_Page);
 