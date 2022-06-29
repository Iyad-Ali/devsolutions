exports.home = (req, res, next) => {
    res.render('index', {
        pageTitle: 'DevSolutions || Convert your business to online business in few days.',
        path: '/',
        isAuthenticated: req.session.isLoggedIn,
        user: req.session.user
    });
};

exports.aboutUs = (req, res, next) => {
    res.render('aboutUs', {
        pageTitle: "DevSolutions || What's DevSolutions",
        path: "/aboutUs",
        isAuthenticated: req.session.isLoggedIn,
        user: req.session.user
    });
};

exports.contactUs = (req, res, next) => {
    res.render('contactUs', {
        pageTitle: "DevSolutions || Contact Us",
        path: "/contactUs",
        isAuthenticated: req.session.isLoggedIn,
        user: req.session.user
    });
};

exports.services = (req, res, next) => {
    res.render('services', {
        pageTitle: "DevSolutions || Our Services",
        path: "/services",
        isAuthenticated: req.session.isLoggedIn,
        user: req.session.user
    });
};

exports.register = (req, res, next) => {
    res.render('register', {
        pageTitle: "DevSolutions || Register",
        path: "/register",
        isAuthenticated: false
    });
};