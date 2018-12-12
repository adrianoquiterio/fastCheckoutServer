class OrderItem{
    constructor( dao ){
        this._dao = dao;
        this.validate( item, quantity );
        this.item = {
            status : '',
            product : item,
            quantity : quantity,
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
    };

    validate(item, quantity ){
        if ( !isItemValid(item) ){
            throw new Error( "Invalid item." );
        };

        findItemDataBase(item);
        
        if ( !isQuantityValid(quantity) ) {
            throw new Error("Invalid quantity");
        };
    };

    findItemDataBase( item ){

        let callback = function( error, result, fields ) {
            if( error ){
                console.log(`Something happened during the query:  ${error}`);
                res.status(500).send(error);
                return;
            };
            this.item.product = result[0].id;
            this.item.unitary = result[0].price;
            res.status(200).json(result);
        };

        let info = this._dao.searchById( item, callback );
    }

    isItemValid( item ){
        return !!item && item instanceof Number && item > 0;
    };

    isQuantityValid(quantity){
        return !!quantity && quantity instanceof Number && quantity > 0;
    };

    calculate(){
        let item = this.item;
        item.total = ( item.quantity * item.unitary ) - item.discount;
        item.gst = item.total * 0.15;
    };
};

module.exports = function (){
    return OrderItem
};