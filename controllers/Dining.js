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
    document.Dining_style = req.body.Dining_style;
    document.Dining_type = req.body.Dining_type;
    document.Dining_size = req.body.Dining_size;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
    
};

// for a specific Dining. 
exports.Dining_detail  = async function (req, res) {
    console.log("dining"  + req.params.id) 
    try { 
        result = await Dining.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
}; 

// Handle Dining update form on PUT. 
exports.Dining_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await Dining.findById( req.params.id); 
        console.log("teja");
        // Do updates of properties 
        if(req.body.Dining_style)  
               toUpdate.Dining_style = req.body.Dining_style; 
        if(req.body.Dining_type) toUpdate.Dining_type = req.body.Dining_type;
        if(req.body.Dining_size) toUpdate.Dining_size = req.body.Dining_size; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
}; 

//Handle building the view for updating a Dining. 
// query provides the id 
exports.Dining_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await Dining.findById(req.query.id) 
        res.render('Diningupdate', { title: 'Dining Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle Dining delete form on DELETE.
//exports.Dining_delete = function (req, res) {
    //res.send('NOT IMPLEMENTED: Dining delete DELETE ' + req.params.id);
//};

// Handle Dining delete on DELETE. 
exports.Dining_delete = async function(req, res) { 
    console.log("delete "  + req.params.id) 
    try { 
        result = await Dining.findByIdAndDelete( req.params.id) 
        console.log("Removed " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": Error deleting ${err}}`); 
    } 
}; 
//views
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

 
 // Handle a show one view with id specified by query 
 exports.Dining_view_one_Page = async function(req, res) { 
    console.log("single view for id "  + req.query.id) 
    try{ 
        result = await Dining.findById( req.query.id) 
        res.render('Diningdetail',  
{ title: 'Dining Detail', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 
//Handle building the view for creating a Dining. 
// No body, no in path parameter, no query. 
// Does not need to be async 
exports.Dining_create_Page =  function(req, res) { 
    console.log("create view") 
    try{ 
        res.render('Diningcreate', { title: 'Dining Create'}); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle building the view for updating a dining. 
// query provides the id put
exports.Dining_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await Dining.findById(req.query.id) 
        res.render('diningupdate', { title: 'Dining Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle a delete one view with id from query 
exports.Dining_delete_Page = async function(req, res) { 
    console.log("Delete view for id "  + req.query.id) 
    try{ 
        result = await Dining.findById(req.query.id) 
        res.render('Diningdelete', { title: 'Dining Delete', toShow: 
result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

 

 