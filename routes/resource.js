var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var Dining_controller = require('../controllers/Dining');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// Dining ROUTES ///
// POST request for creating a Dining.
router.post('/Dinings', Dining_controller.Dining_create_post);
// DELETE request to delete Dining.
router.delete('/Dinings/:id', Dining_controller.Dining_delete);
// PUT request to update Dining.
router.put('/Dinings/:id', Dining_controller.Dining_update_put);
// GET request for one Dining.
router.get('/Dinings/:id', Dining_controller.Dining_detail);
// GET request for list of all Dining items.
router.get('/Dinings', Dining_controller.Dining_list);
module.exports = router;