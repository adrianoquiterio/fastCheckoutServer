class OrderItem{
    constructor( app ){        
        this._app = app;
        this._conn = app.src.app.persistence.mysqlFactory();
        this._dao = new this._app.src.app.persistence.ProductsDao(  this._conn );
        this.item = {
            status : '',
            product : null,
            quantity : null,
            unitary : null,
            discount : null,
            total : null,
            gst : null
        };
    }

    add( item, quantity ){
        this.validate( item, quantity );

        this.item.product = item;
        this.item.quantity = quantity;
        //console.log(`Próximo de retornar item: ${JSON.stringify(this.item)}`)
        return this.item;
    };

    validate(item, quantity ){
        if ( !this.isItemValid(item) ){
            throw new Error( "Invalid item." );
        };

        this.findItemDataBase(item);
        
        if ( !this.isQuantityValid(quantity) ) {
            throw new Error("Invalid quantity");
        };
    };

    findItemDataBase( item ){

        let callback = function( error, result, fields ) {
            if( error ){
                console.log(`Something happened during the query:  ${error}`);
                //res.status(500).send(error);
                return;
            };
            return result;
            console.log( `Resultado do sql ${JSON.stringify(result)}`)
            this.item.product = result[0].id;
            this.item.unitary = result[0].price;
            
            res.status(200).json(result);
        };

        let info = this._dao.searchById( item, callback );
        //console.log(`Minha info é: ${JSON.stringify(info)}` )
    }

    isItemValid( item ){        
        return !!item && typeof item == 'number' && item > 0;
    };

    isQuantityValid(quantity){
        return !!quantity && typeof quantity == 'number' && quantity > 0;
    };

    calculate(){
        let item = this.item;
        item.total = ( item.quantity * item.unitary ) - item.discount;
        item.gst = item.total * 0.15;
    };
};

module.exports = () => {
    return OrderItem;
};