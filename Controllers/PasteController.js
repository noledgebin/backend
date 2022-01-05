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
        PasteMsg: req.body.PasteMsg,
    })
    if(req.body.ExpireTime)
    {
        var ExpireTime = req.body.ExpireTime
        //Note : ExpireTime is in Seconds
        var a = new Date(new Date().getTime() + ExpireTime * 1000)
        newPaste.ExpireTime = a;
    }
    
    newPaste.save()
    .then((respones)=>{
        res.json(`Paste Added Successfully and the paste-id is ${newPaste._id}`)
    })
    .catch((err)=>{
        res.json(err)
    })
}

//Retrieving the Paste from the database
const GetPaste = (req,res,next)=>{
    let PasteID = req.params['PasteID'];
    console.log(PasteID)
    Paste.findById(PasteID)
    .then(response=>{
        if(response != null)
        res.json(response)
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