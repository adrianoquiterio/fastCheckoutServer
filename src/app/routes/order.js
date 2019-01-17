module.exports = function ( app ){

    const order = new app.src.app.models.Order( app );
    app.route('/order')
        .post((req,res,next) => {
            
            if( !req.session.order ){
                req.session.order = new app.src.app.models.OrderItems();
            };
            order.addItem(1,1,req);
            res.status(200).send('ok');
        })
        .get((req,res,next) => {
            
            if( !req.session.order ){
                req.session.order = new app.src.app.models.OrderItems();
            };
            order.addItem(1,1,req);
            res.status(200).send('ok');
        });
};