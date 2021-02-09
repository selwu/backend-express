const router = require('express').Router();
const authMiddlewares = require('../controllers/middlewares/auth');
const fileController = require('../controllers/file');

router.post('', authMiddlewares, fileController.createDir);
router.get('', authMiddlewares, fileController.getFiles);

module.exports = router;
