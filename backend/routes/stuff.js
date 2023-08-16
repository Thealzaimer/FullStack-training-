const express = require('express');
const router = express.Router();

const stuffctrl = require('../controllers/stuffcontroller')



router.post('/', stuffctrl.createThing);
router.put('/:id', stuffctrl.modifyOneThing);
router.delete('/:id', stuffctrl.deleteOnething);
router.get('/', stuffctrl.getAll);
router.get('/:id', stuffctrl.getOne);


module.exports = router;