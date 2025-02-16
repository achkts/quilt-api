const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO).
    
    then(() => {
        console.log('Connected to MongoDB')
    }).
    catch((e) => {
        console.error('Error connecting to MongoDB', e.message)
    })

const quiltSchema = mongoose.Schema({
    name: {type:String, required:true, maxlength: 50},
    yearCreated: {type:Number, required:true},
    imageUrl: {type:String, required:false},
    description: {type:String, required:true, maxlength: 500},
    quiltType: {type:String, required:true},
    awards: {type:String, required:true},
    quiltShow: {type:String, required:true},
    price: {type:String, required:true},
    status: {type:String, required:true},
})

module.exports = mongoose.model('quilts', quiltSchema)