

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
       
        let product = await this.findItemDataBase(item);
        let rowsResulted = product.length;     
        
        if( rowsResulted === 1 ) {
            this.item.status = 1;
            this.item.product = item;
            this.item.unitary = product[0].price;
            this.item.description = product[0].description;
            this.item.quantity = quantity;
            this.item.total = this.item.unitary * this.item.quantity;    
        } else if( rowsResulted == 0 ){
            throw new Error(`There is any product registered with the code ${item}`);
        } else {
            throw new Error(`There are ${rowsResulted} products on database whith the code: ${item}`)
        };        
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