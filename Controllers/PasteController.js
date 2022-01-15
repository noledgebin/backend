const { response } = require('express');
const Paste = require('../Model/PasteModel');

//displaying all the responses.
const ShowAll = (req,res,next)=>{
    Paste.find()
    .then((response)=>{
        res.json(response);
    })
    .catch((error)=>{
        res.json(error);
    })
}

//handle the new paste.
const store = (req,res,next) =>{
    let newPaste = Paste({
        Paste: req.body.Paste,
        OneTimeView: req.body.OneTimeView,
    })
    if(req.body.ExpireTime){
        var ExpireTime = req.body.ExpireTime;
        //ExpireTime is in Seconds converting into date
        var a = new Date(new Date().getTime() + ExpireTime * 1000);
        newPaste.ExpireTime = a;
    }

    newPaste.save()
    .then((response)=>{
        console.log(response.PasteID);
        res.json(response);
    })
    .catch((err)=>{
        res.json(err)
    })

}

//getting the document from DB
const GetPaste = (req, res, next)=>{
    let PasteID = req.params['PasteID'];
    Paste.findById(PasteID)
    .then(response=>{
        if(response != null){
            //if OneTimeView is True delete the document.
            if(response.OneTimeView){
                Paste.deleteOne({
                    "_id": response.id
                },function(err, obj) {
                    if (err) throw err;
                    console.log("document deleted");
                })
            }
            //display the document
             res.json(response) 
        }
        else
        //if document doesn't exit
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
    ShowAll,
    store,
    GetPaste
}