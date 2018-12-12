module.exports = ( app ) => {

    const productControll = new app.src.app.controllers.ProductsController( app );
        
    app.route('/products(/:id)?')        
        // full products list
        .get(function(req, res){            
            productControll.listProduct( req, res, req.params.id );            
        })
        // product register
        .post(function (req, res){
            productControll.addOrUpdate(req, res , req.body["product"]);            
        })
        // Product data update
        .put(function(req, res){
            productControll.addOrUpdate(req, res , req.body["product"]);            
        })
        .delete( function (req, res){
            productControll.delete(req,res, req.params.id);
        } );
};