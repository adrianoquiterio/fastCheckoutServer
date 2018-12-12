class ClassDao{
    constructor( conn ){
        this._connection = conn;

    };
    fullList ( callback ){
        this._connection.query("select * from class" , callback);
    };

    searchById( id, callback ){
        this._connection.query("select * from  class where id = ? " , id , callback);
    };

    insert( data, callback){
        this._connection.query("insert into class set ?", data, callback);
    };

    delete( id, callback ){
        this._connection.query("delete from class where id = ?", id, callback);
    };

    update( data, callback ) {
        this._connection.query("update class set name = ? , parent = ? where id = ?", [data.name, data.parent,  data.id] , callback);
    };    
};

module.exports = function (){
    return ClassDao;
}