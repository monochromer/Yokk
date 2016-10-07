const FrontPaths = [
    '/users/',
    '/addUser',
    '/user/:login',
    '/user/edit/:login'
]

module.exports = function(req, res, next) {
    // if (FrontPaths.includes(req.url)) {
    //     res.send('req.url');
    // };
    next();
};
