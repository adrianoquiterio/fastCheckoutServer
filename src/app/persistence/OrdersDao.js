class OrdersDao{
    constructor( app ){
        this._app = app;
    };

    async init( app ){
        // Creating the connection to Database
        this._mongoose = await app.src.app.persistence.mongooseFactory();
    };

    async allSales(){
        if( !this._mongoose ){
            await this.init( this._app );
        };
        
        let result = {}
        await this._mongoose.models["Order"].find(function (err, orders) {
            if (err) return console.error(err);           
            result = orders;
        });
        return result;
    };

    async saveOrder ( order ){
        if( !this._mongoose ){
            await this.init( this._app );
        };

        let orderSaved = new this._mongoose.models["Order"]( order )
        /*
        var order = new this._mongoose.models["Order"](
            {
                items : [
                    {
                        id : 1,
                        quantity : 1,
                        unitary : 10,
                        discount : 0,
                        total : 10,
                        description : 'Teste'
                    }
               ],
               header : {
                    totalOrder : 10,
                    totalPayment : 10,
                    totalQuantity : 1,
                    change : 0
               }               
            }
        )*/

        await orderSaved.save(( err, order ) => {
            if(err) {
                console.log(`Erro ao salvar no mongo: ${err} `);
            } 
            console.log("salvo no mongo")
        } );
        return {"msg" : "sucesso"}

    };

    async cleanBd (){
        if( !this._mongoose ){
            await this.init( this._app );
        };        
        return await this._mongoose.models["Order"].deleteMany()
    };

}

module.exports = () =>{
    return OrdersDao;
};