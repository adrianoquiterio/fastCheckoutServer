module.exports = function ( app ){

    const order = new app.src.app.models.Order( app );

    app.route('/order')
        .post((req,res,next) => {
            order.newOrder();
            order.addItem(1,1);
            res.status(200).send('ok');
        });
};