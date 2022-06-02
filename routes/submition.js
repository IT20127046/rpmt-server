const express = require("express");
const router = express.Router();
const multer = require("multer");
const Submitions = require("../models/submition")

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, "./uploads");
    },
    filename: (req, file, callback)=> {
        callback(null, file.originalname);
    }
});

const upload = multer({storage: storage});

router.post('/submition', upload.single("file"),async (req, res) => {
    const file = new Submitions ({
        groupId: req.body.groupId,
        type: req.body.type,
        description: req.body.description,
        files: req.file.originalname,
        
    });

    await file
     .save()
     .then(()=> res.json({success : true}))
     .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Get all submitions
router.get('/submition/all', (req,res)=>{
    Submitions.find().exec((err,submitions)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            exsitingSubmitions:submitions
        });
    });
});




//get a specipic submition
router.get("/submition/:id",(req,res) =>{
    let submitionId = req.params.id;

    Submitions.findById(submitionId,(err,submition)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            submition
        });
    });
});








//get a specipic id submition
router.get("/submition/group/:id",(req,res) =>{
    let submitionId = req.params.id;

    Submitions.find({groupId:submitionId},(err,submition)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            exsitingSubmitions:submition
        });
    });
});



//delete submition
router.delete('/submition/delete/:id',(req,res)=>{
    Submitions.findByIdAndRemove(req.params.id).exec((err,deletedSubmition)=>{
        if(err) return res.status(400).json({
            message:"Deleted unsuccesful",err
        });

        return res.json({
            message:"Deleted Succesfull",deletedSubmition
        });

    });
});




//update submition
router.put('/submition/update/:id',(req,res)=>{
    Submitions.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,submition)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Update Successfully"
            });
        }
    );
});





//update status
router.put('/submition/update/status/:id',(req,res)=>{
    Submitions.updateOne(
        { _id: req.params.id },
        { $set:
           {
             status: req.body.status,
             
           }
        }
     
    
    
    ,
        (err,submition)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Update Successfully"
            });
        }
    );
});






module.exports = router;