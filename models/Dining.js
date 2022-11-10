const mongoose = require("mongoose") 
const Dining = mongoose.Schema({ 
 Dining_style: String, 
 Dining_type: String, 
 Dining_size: Number 
}) 
 
module.exports = mongoose.model("Dining", 
Dining) 