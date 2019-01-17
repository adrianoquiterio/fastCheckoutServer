

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
    };

    async add( item, quantity ){
        this.validate( item, quantity );
        let produto = await this.findItemDataBase(item);

        this.item.product = item;
        this.item.unitary = produto.price;
        this.item.quantity = quantity;
        this.item.total = this.item.unitary * this.item.quantity;
        console.log(`Próximo de retornar item: ${JSON.stringify(this.item)}`)
        return this.item;
    };

    validate(item, quantity ){
        if ( !this.isItemValid(item) ){
            throw new Error( "Invalid item." );
        };

        if ( !this.isQuantityValid(quantity) ) {
            throw new Error("Invalid quantity");
        };
    };

    async findItemDataBase( item ){
        let resultado = await this._dao.searchById(item, function(error, result){
            if(error) throw error
            return result
        });
        return resultado;        
    };

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