const express = require('express');
const router = express.Router();
const Notice = require('../models/notice');

// Save Notice
router.post('/notice/add',(req,res)=>{
    let newNotice = new Notice(req.body);

    newNotice.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true
        });
    });
});

// Get All Notices
router.get('/notice/getAll',(req,res) =>{
    Notice.find().exec((err,exsitingNotices)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            exsitingNotices
        });
    });
});

// Get Specific Notice
router.get("/notice/get/:id",(req,res) =>{
    let noticeID = req.params.id;

    Notice.findById(noticeID,(err,notice)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            notice
        });
    });
});

// Update Notice
router.put('/notice/update/:id',(req,res)=>{
    Notice.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,notice)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:true
            });
        }
    );
});

// Delete Notice
router.delete('/notice/delete/:id',(req,res)=>{
    Notice.findByIdAndRemove(req.params.id).exec((err,deletedNotice)=>{
        if(err) return res.status(400).json({
            success:"Deleted unsuccesful",err
        });

        return res.json({
            success:true,
            deletedNotice
        });

    });
});

module.exports = router;