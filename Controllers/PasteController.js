const { response } = require('express');
const Paste = require('../Model/PasteModel');


//Function to show all the pastes (For Development only)
const AllPaste = (req,res,next)=>{
    Paste.find()
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err);
    })
}

//To store the paste in the database
const store = (req,res,next)=>{
    let newPaste = Paste({  
        text: req.body.text,
        compressed : req.body.compressed,
        syntaxHl : req.body.syntaxHl,
        passwd : req.body.passwd,
    })
    console.log(req.body)
    if(req.body.ExpireTime)
    {
        var ExpireTime = req.body.ExpireTime
        //Note : ExpireTime is in Seconds
        var a = new Date(new Date().getTime() + ExpireTime * 1000)
        newPaste.ExpireTime = a;
    }
    if(req.body.BurnAfterRead)
    {
        newPaste.BurnAfterRead = req.body.BurnAfterRead
    }
    
    newPaste.save()
    .then((respones)=>{
        res.json(respones._id)
        // res.json(newPaste._id)
        console.log(respones._id)
    })
    .catch((err)=>{
        res.json(err)
    })
}

//Retrieving the Paste from the database
const GetPaste = (req,res,next)=>{
    let PasteID = req.params['PasteID'];
    let userGivenPass = req.body
    console.log(req.body)
    console.log(PasteID)
    Paste.findById(PasteID)
    .then(response=>{
        if(response != null){
            console.log(response)
            console.log((response.passwd));
            console.log(response.passwd != userGivenPass)
            if (response.passwd) 
            {
                if(response.passwd != userGivenPass.passwd)
                {
                    
                    return res.json({
                        error: "Incorrect Password or Paste doens't exist"
                    })
                }
            }
            console.log(response.BurnAfterRead);
            console.log(response)
            res.json(response)
            if(response.BurnAfterRead){
                console.log('Deleting..')
                Paste.findByIdAndRemove({
                    "_id": PasteID
                },(err)=>{console.log(err)})
            }
        }
        else
        res.json({
            message: 'Paste Not Found' 
        })
    })
    .catch((err)=>{
        res.json({
            message: `Error Occurred : ${err}`
        })
    })
}

module.exports = {
    AllPaste,
    store,
    GetPaste
}