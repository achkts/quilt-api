const mongoose = require('mongoose');


const quiltersSchema = mongoose.Schema({
    fname: {type:String, required:true, maxlength: 50},
    lname: {type:String, required:true, maxlength: 50},
    residentCity: {type:String, required:true},
    residentState: {type:String, required:true},
    experience: {type:String, required:true},
    email: {type:String, required:true},
})

module.exports = mongoose.model('quilters', quiltersSchema)