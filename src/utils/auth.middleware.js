const authMiddleware = {
    isLoggIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/')
    },
    isNotLoggIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/user')
    }
}

export default authMiddleware   