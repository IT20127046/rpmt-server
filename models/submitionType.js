const mongoose= require('mongoose');

const submitionTypeSchema = new mongoose.Schema({
    submitionType:{
    type: String,
    required: true
},
description:{
    type: String,
    required:true
},
almarks:{
    type: Number,
    required:true
},
deadLine: {
    type: String,
    required:true
},
Status: {
    type: String ,
    required:true

},
guidelines:{
    type: String,
    required:true
}


});

module.exports = mongoose.model('submitionType',submitionTypeSchema);
