exports.home = (req, res, next) => {
    res.render('index', {
        pageTitle: 'DevSolutions || Convert your business to online business in few days.',
        path: '/'
    });
};

exports.aboutUs = (req, res, next) => {
    res.render('aboutUs', {
        pageTitle: "DevSolutions || What's DevSolutions",
        path: "/aboutUs"
    });
};

exports.contactUs = (req, res, next) => {
    res.render('contactUs', {
        pageTitle: "DevSolutions || Contact Us",
        path: "/contactUs"
    });
};

exports.services = (req, res, next) => {
    res.render('services', {
        pageTitle: "DevSolutions || Our Services",
        path: "/services"
    });
};

exports.register = (req, res, next) => {
    res.render('register', {
        pageTitle: "DevSolutions || Register",
        path: "/register"
    });
};