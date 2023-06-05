const express = require('express');

const repairsController = require('./../controllers/repairs.controller');

const router = express.Router();

router.route('/').get(repairsController.findAll).post(repairsController.create);

router
  .route('/:id')
  .get(repairsController.findRepair)
  .patch(repairsController.updateRepair)
  .delete(repairsController.deleteRepair);

module.exports = router;
