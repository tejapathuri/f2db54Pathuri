var Dining = require('../models/Dining');
// List of all Dinings
exports.Dining_list = async function (req, res) {
    try {
        theDinings = await Dining.find();
        res.send(theDinings);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific Dining.
exports.Dining_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Dining detail: ' + req.params.id);
};
// Handle Dining create on POST.
exports.Dining_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Dining();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"Dining_type":"goat", "cost":12, "size":"large"}
    document.name = req.body.name;
    document.duration = req.body.duration;
    document.director = req.body.director;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle Dining delete form on DELETE.
exports.Dining_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Dining delete DELETE ' + req.params.id);
};
// Handle Dining update form on PUT.
exports.Dining_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: Dining update PUT' + req.params.id);
};
exports.flim_view_all_Page = async function (req, res) {
    try {
        theDinings = await Dining.find();
        res.render('Dinings', { title: 'Dining Search Results', results: theDinings });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};