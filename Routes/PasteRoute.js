const PasteController = require('../Controllers/PasteController')
const express = require('express')
const router = express.Router()


router.get('/AllPastes',PasteController.AllPaste)
router.post('/store',PasteController.store)
router.get('/GetPaste/:PasteID',PasteController.GetPaste)
router.post('/GetPaste/:PasteID',PasteController.GetPaste)
router.get('/',(req,res)=>{
    res.sendStatus(200);
})
module.exports = router