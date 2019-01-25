module.exports = function ( app ){
    let order = new app.src.app.models.Order( app );    
    app.route('/addItem/')
        .post(async (req,res,next) => {            
            if( !!req.body.newOrder || !req.session.order ){                
                req.session.order = new app.src.app.models.OrderItems();
            };            
            try{
                await order.addItem(req.body, req);      
                res.status(200).json(req.session.order);               
                return  
            } catch (e){                
                res.status(500).send(`An error occurred ${e}`);
                return;
            };             
        });
    
    app.route('/addPayment/')
        .post( async (req, res, next) => {
            try{
                await order.addPayment(req.body, req);
                res.status(200).json(req.session.order);
                return;
            } catch (e){
                res.status(500).send(`An error occurred ${e}`);
                return;
            };
        } );
    app.route('/cancelOrder/')
        .post( async(req, res, next) => {
            try {
                req.session.destroy();                
                return;
            } catch (e) {
                res.status(500).send(`An error occurred ${e}`);
                return;
            };
        } );

    app.route('/allOrders')
        .get( async(req, res, next) => {
            try{                
                let orderDao = new app.src.app.persistence.OrdersDao( app );                
                res.status(200).json( await orderDao.allSales() )    ;            
            }catch (e) {
                res.status(500).send(`An error occurred! :( ${e} - ${e.message} - ${e.stack}`);
                return;
            };
        } );
    app.route("/saveOrder")
        .post( async(req,res,next) => {
            try{
                let orderDao = new app.src.app.persistence.OrdersDao( app );                
                res.status(201).json( await orderDao.saveOrder())
                return
            } catch(e){
                res.status(500).send(`An error occurred ${e} - ${e.message} - ${e.stack}`)
            }
        } )
    app.route("/deleteOrder")
        .delete( async(req,res,next) => {
            try{
                let orderDao = new app.src.app.persistence.OrdersDao( app );                
                res.status(201).json( await orderDao.cleanBd())
                return
            } catch(e){
                res.status(500).send(`An error occurred ${e} - ${e.message} - ${e.stack}`)
            }
        } )    
};