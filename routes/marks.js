const express = require('express');
const Marks = require('../models/mark');
const router = express.Router();




//save marks

router.post('/mark/save',(req,res)=>{
    let newMark = new Marks(req.body);

    newMark.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Marks saved Succefully"
        });
    });
});



//get marks

router.get('/marks',(req,res) =>{
    Marks.find().exec((err,marks)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingMarks:marks
        });
    });
});



//get a specipic mark
router.get("/mark/:id",(req,res) =>{
    let markId = req.params.id;

    Marks.findById(markId,(err,mark)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            mark
        });
    });
});




//update mark
router.put('/mark/update/:id',(req,res)=>{
    Marks.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,mark)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Update Successfully"
            });
        }
    );
});


//delete mark

router.delete('/mark/delete/:id',(req,res)=>{
    Marks.findByIdAndRemove(req.params.id).exec((err,deletedMark)=>{
        if(err) return res.status(400).json({
            message:"Deleted unsuccesful",err
        });

        return res.json({
            message:"Deleted Succesfull",deletedMark
        });

    });
});







//get a specipic grp id marks
router.get("/marks/group/:id",(req,res) =>{
    let gId = req.params.id;
  
    Marks.find({groupId:gId},(err,mark)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            existingMarks:mark
        });
    });
  });




  

//get a specipic supervisor  marks
router.get("/marks/supervisor/:id",(req,res) =>{
    let sname = req.params.id;
  
    Marks.find({markedby:sname},(err,mark)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            existingMarks:mark
        });
    });
  });
  





module.exports = router;
