const express = require('express');
const stuffCtrl = require('../controllers/stuffcontroller');
const router = express.Router();

router.post('/', stuffCtrl.createThing); 
router.put('/:id', stuffCtrl.modifyOneThing); 
router.delete('/:id', stuffCtrl.deleteOnething); 

router.get('/', stuffCtrl.getAll);

router.get('/:id', stuffCtrl.getOne); 

module.exports = router;
