class ProductsDao{
    constructor( conn ){
        this._connection = conn;
    };
    fullList ( callback ){
        this._connection.query("select * from full_product" , callback);
    };

    async searchById( id, callback ){        
        return new Promise((resolve, reject) => {
            let busca = this._connection.query("select * from full_product where id = ? " , id );
            busca
                .on('error', function (err){
                    reject('Houve um erro na consulta ao banco' + err);
                })
                .on('result', function(row){                    
                    resolve(row);
                });            
        });
    };

    insert( data, callback){
        this._connection.query("insert into products set ?", data, callback);
    };

    delete( id, callback ){
        this._connection.query("delete from products where id = ?", id, callback);
    };

    update( data, callback ) {
        this._connection.query("update products set description = ? , price = ? , class  = ? where id = ?", [data.description, data.price, data.class, data.id] , callback);
    };
};

module.exports = function(){
    return ProductsDao
} 