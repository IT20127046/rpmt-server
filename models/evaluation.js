const mongoose= require('mongoose');

const evaluationSchema = new mongoose.Schema({
    groupId:{
    type: String,
    required: true
},
evaluationTopic:{
    type: String,
    required:true
},
panel:{
    type: String,
    required:true
},
date: {
    type: String,
    required:true
},
from: {
    type: String ,
    required:true

},
to:{
    type: String,
    required:true
},
link:{
    type: String,
    required:true
}


});

module.exports = mongoose.model('evaluation',evaluationSchema);
