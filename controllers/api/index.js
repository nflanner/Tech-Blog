const router = require('express').Router();
const userRoutes = require('./userRoutes');
const contentRoutes = require('./contentRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/content', contentRoutes);
router.use('/comment', commentRoutes);

module.exports = router;