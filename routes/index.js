const userRoutes = require('./user.router');

const router = (app) => {
    app.use('/api', userRoutes);
}

module.exports = router;