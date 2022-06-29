const stripe = require("stripe")("sk_test_51LG27vGL9EddvwtTx48ZZu9OeKl0mKVD1PhJRYf7VaOjtZsKYyR56ZpcB15KOIz6luVoNnKw7xqkKCMIaULigy7p00HXBbbX1N");

exports.getCheckout = (req, res, next) => {
    let amount = req.body.amount;
   
    return stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: 'DevSolutions service payment',
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: req.protocol + '://' + req.get('host') + '/', // => http://localhost:3000
        cancel_url: req.protocol + '://' + req.get('host') + '/payment'
    })
    .then(session => {
        res.render('checkout', {
            path: '/checkout',
            pageTitle: 'Checkout',
            amount: amount,
            sessionId: session.id,
            isAuthenticated: req.session.isLoggedIn,
            user: req.session.user
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
    };

 //for products
// exports.getCheckout = (req, res, next) => {
//     let products;
//     let total = 0;
//     req.user
//         .populate('cart.items.productId')
//         .execPopulate()
//         .then(user => {
//             products = user.cart.items;
//             total = 0;
//             products.forEach(p => {
//                 total += p.quantity * p.productId.price;
//             });

//             return stripe.checkout.sessions.create({
//                 payment_method_types: ['card'],
//                 line_items: products.map(p => {
//                     return {
//                         name: p.productId.title,
//                         description: p.productId.description,
//                         amount: p.productId.price * 100,
//                         currency: 'usd',
//                         quantity: p.quantity
//                     };
//                 }),
//                 success_url: req.protocol + '://' + req.get('host') + '/checkout/success', // => http://localhost:3000
//                 cancel_url: req.protocol + '://' + req.get('host') + '/checkout/cancel'
//             });
//         })
//         .then(session => {
//             res.render('shop/checkout', {
//                 path: '/checkout',
//                 pageTitle: 'Checkout',
//                 products: products,
//                 totalSum: total,
//                 sessionId: session.id
//             });
//         })
//         .catch(err => {
//             const error = new Error(err);
//             error.httpStatusCode = 500;
//             return next(error);
//         });
// };