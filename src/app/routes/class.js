module.exports =  function( app ){

    const classController = new app.src.app.controllers.ClassController( app );
    
    app.route('/class(/:id)?')
        .get(function(req, res){
            classController.listClass( req, res, req.params.id );     
        })
        .post( function(req, res){
            classController.addOrUpdate(req, res , req.body["class"]); 
        } )
        .put(function (req, res){
            classController.addOrUpdate(req, res , req.body["class"]);     
        })
        .delete(function (req, res){
            classController.delete(req,res, req.params.id);
        });

};