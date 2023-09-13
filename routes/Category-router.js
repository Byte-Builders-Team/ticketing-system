const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/category-ctrl');
const authorization = require('../middleware/authorization');

router.get('/categories', authorization.verifyTokenAndAdmin, categoryCtrl.getCategories);
router.get('/categories/:id', authorization.verifyTokenAndAdmin, categoryCtrl.getCategorieById);
router.put('/categories/:id', authorization.verifyTokenAndAdmin, categoryCtrl.updateCategory);
router.delete('/categories/:id', authorization.verifyTokenAndAdmin, categoryCtrl.deleteCategory);
router.post('/categories', authorization.verifyTokenAndAdmin, categoryCtrl.createCategory);
module.exports = router;
