// app/routes.js
module.exports = function(app, passport) {

	const productController = require('./controllers/product.js')
	const shopController = require('./controllers/shop.js')

	const corporateController = require('./controllers/corporate.js')
	const corporateUserController = require('./controllers/corporateuser.js')
	const projectController = require('./controllers/project.js')
	const paymentController = require('./controllers/payment.js')
	const corporateEmpController = require('./controllers/corporateemp.js')
	const mapfloorController = require('./controllers/mapfloor.js')

	const userController = require('./controllers/user.js')

	// =====================================
	// home screen
	// =====================================
	app.get('/', function(req, res) { res.render('app/index-2.ejs'); });

	// =====================================
	// modules

	//Grandmarket
	app.post('/api/v1/user/signup', userController.addUser)

	//FRUIT - START
	// product
	app.get('/admin/product/list', isLoggedIn, productController.getList)
	app.get('/admin/product/add', isLoggedIn, productController.getAdd)
	app.get('/admin/product/edit/:id', isLoggedIn, productController.getEdit)
	app.get('/admin/product/delete/:id', isLoggedIn, productController.deleteProduct)
	app.get('/admin/product/detail/:id', isLoggedIn, productController.detailProduct)
	app.post('/admin/product/add', isLoggedIn, productController.postAdd)
	app.post('/admin/product/edit', isLoggedIn, productController.postEdit)

	// shop
	app.get('/admin/shop', isLoggedIn, shopController.getDetail)
	app.get('/admin/shop/edit', isLoggedIn, shopController.getEdit)
	app.post('/admin/shop/add', isLoggedIn, shopController.postAdd)
	app.post('/admin/shop/edit', isLoggedIn, shopController.postEdit)

	//FRUIT - END


	// corporate for super admin
	app.get('/admin/corporate/list', isLoggedIn, corporateController.getList)
	app.get('/admin/corporate/add', isLoggedIn, corporateController.getAdd)
	app.post('/admin/corporate/add', isLoggedIn, corporateController.postAdd)
	app.get('/admin/corporate/delete/:id', isLoggedIn, corporateController.deleteCorp)
	app.get('/admin/corporate/detail/:id', isLoggedIn, corporateController.detailCorp)

	// corporate - user
	app.get('/admin/corporateuser/add', isLoggedIn, corporateUserController.getAdd)
	app.post('/admin/corporateuser/add', isLoggedIn, corporateUserController.postAdd)
	app.get('/admin/corporateuser/delete', isLoggedIn, corporateUserController.deleteCorpUser)
	app.get('/admin/corporateuser/list', isLoggedIn, corporateUserController.getList)

	// corporate for corporate admin
	app.get('/admin/corporateemp/detail', isLoggedIn, corporateEmpController.getDetail)
	app.get('/admin/corporateemp/edit', isLoggedIn, corporateEmpController.getEdit)
	app.post('/admin/corporateemp/edit', isLoggedIn, corporateEmpController.postEdit)

	// project
	app.get('/admin/project/list', isLoggedIn, projectController.getList)
	app.get('/admin/project/add', isLoggedIn, projectController.getAdd)
	app.post('/admin/project/add', isLoggedIn, projectController.postAdd)
	app.get('/admin/project/delete', isLoggedIn, projectController.deleteProject)
	app.get('/admin/project/detail', isLoggedIn, projectController.detailProject)

	//payment
	app.get('/admin/payment/add', isLoggedIn, paymentController.getAdd)
	app.post('/admin/payment/add', isLoggedIn, paymentController.postAdd)

	//mapfloor
	app.get('/admin/mapfloor', isLoggedIn, mapfloorController.getAdd)

	// =====================================
	// login ===============================
	// =====================================
	// show the login form
	app.get('/admin/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login/login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/admin/login', passport.authenticate('local-login', {
            successRedirect : '/admin/dashboard', // redirect to the secure dashboard section
            failureRedirect : '/admin/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/admin/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login/signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/admin/signup', passport.authenticate('local-signup', {
		successRedirect : '/admin/dashboard', // redirect to the secure dashboard section
		failureRedirect : '/admin/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// DASHBOARD SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/admin/dashboard', isLoggedIn, function(req, res) {
		res.render('dashboard.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}
