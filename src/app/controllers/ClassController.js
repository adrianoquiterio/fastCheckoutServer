class ClassController{
    constructor( app ){        
        this._conn = app.src.app.persistence.mysqlFactory();
        this._dao = new app.src.app.persistence.ClassDao( this._conn );
    };
    
    listClass( req, res, id ){
        let callback = function( error, result, fields ) {
            if( error ){
                console.log(`Something happened during the query:  ${error}`);
                res.status(500).send(error);
                return;
            };
            res.status(200).json(result);
        };
        if( id ) {
            this._dao.searchById( id, callback );
        } else {
            this._dao.fullList(callback);
        };
    };

    addOrUpdate( req, res, data ){
        let method = req.method.toLowerCase();
        let callback = function( error, result, fields ) {
            if( error ){
                console.log(`Something happened during the update:  ${error}`);
                res.status(500).send(error);
                return;
            };

            if( method == 'post' ){
                data.id = result.insertId;
                res.status(201);
            } else {
                res.status(200);
            };
            res.json(data);
        };

        if( method == 'put'  ){
            req.assert("class.id", "Field class.id must be informed").notEmpty();
        };
        req.assert("class.name", "Field class.description should not be empty and have at least 5 caracters").isLength({min : 5});
        req.assert("class.parent", "Invalid parent class").notEmpty().isInt( { min : 0 });                    
        
        var valErrors = req.validationErrors();
        if(valErrors){
            console.log(`Houveram erros de validação ${JSON.stringify(valErrors)}`);
            res.status(400).send(valErrors);
            return;
        };

        //let data = req.body["product"];
        if( method == 'post' ){
            this._dao.insert(data, callback)
        } else if ( method == 'put' ) {
            this._dao.update( data, callback);
        };
    };

    delete(req, res, id){
        let callback = function( error, result, fields ) {
            if( error ){
                console.log(`Something happened during the deletion:  ${error}`);
                res.status(500).send(error);
                return;
            };
            res.status(204).json(result);
        };        
        if( !id ){
            res.status(400).send({"error" : "Id must be informed"});
            return;
        };
        this._dao.delete(id, callback);
    };    
};

module.exports = function(){
    return ClassController;
}