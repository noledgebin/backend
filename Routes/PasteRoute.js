const PasteController = require('../Controllers/PasteController')
const express = require('express')
const router = express.Router()


router.get('/AllPastes',PasteController.AllPaste)
router.post('/store',PasteController.store)
router.get('/GetPaste/:PasteID',PasteController.GetPaste)

module.exports = router