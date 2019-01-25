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
            let rows = [];
            
            busca
                .on('error', function (err){                  
                    console.log("Error during database access: " + err );  
                    reject(", please contact the Systems Administrator ");
                })

                .on('result', function(row){                          
                    rows.push(row);
                    resolve(rows);
                })     
                .on("end", function(){
                    // Necessary where the query returns empty        
                    resolve(rows);                    
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