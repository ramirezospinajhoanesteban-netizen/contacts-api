const express = require('express');

const router = express.Router();

const controller = require('../controllers/contacts.controller');

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.patch('/:id/favorite', controller.toggleFavorite);

router.delete('/:id', controller.remove);

module.exports = router;