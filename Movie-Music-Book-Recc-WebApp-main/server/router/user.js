const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

require("../db/conn");
const User = require("../model/userSchema");

router.post('/userData',async (req,res)=>{
    const {_id} = req.body
    const user = await User.findById({ _id: mongoose.Types.ObjectId(_id) });
    if(user === null){
        return res.json({message:"User Doesnt exists",status:false})
    }
    else if(user === ""){
        return res.json({message:"User doesnt exist",status:false})
    }
    else{   
        return res.json({data:user,status:true})
    }
})

router.post('/changeProfilePhoto',async(req,res)=>{
    const {_id,profilePhoto} = req.body
    console.log(req.body._id," ",req.body.profilePhoto)
    const user = await User.findById({ _id: mongoose.Types.ObjectId(_id) });
    if(user === null){
        return res.json({message:"USer doesnt exist",status:false})
    }
    else{
        user.profilePhoto = profilePhoto
        await User.findByIdAndUpdate({_id},user)
        return res.json({message:"Profile photo changed succesfully",status:true})
    }

})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
router.post('/changeProfile',async(req,res)=>{
    const {_id,name,email,profilePhoto,phone,DOB,userName} = req.body
    console.log(_id, name, email, profilePhoto, phone, DOB, userName);
    const user = await User.findById({_id:mongoose.Types.ObjectId(_id)})
    if(user === null || user === ""){
        return res.json({message:"User doesnt exist",status:false})
    }
    else{
        user.name = name
        user.email = email
        user.profilePhoto = profilePhoto
        user.DOB = DOB
        user.phone = phone
        user.userName = userName

        await User.findByIdAndUpdate(
            {_id},user
        ).then(e=>{return res.json({message:"Successfully changed profile",status:true})}).catch(e=>{return res.json({message:"Server error",status:false})})
    }
})

module.exports = router;

