const mongoose= require('mongoose');

const markSchema = new mongoose.Schema({
    groupId:{
    type: String,
    required: true
},
type:{
    type: String,
    required:true
},
marks:{
    type: Number,
    required:true
},
gradingStatus:{
    type: String,
    required:true
},
markedby:{
    type: String,
    required:true
}



});

module.exports = mongoose.model('Marks',markSchema);