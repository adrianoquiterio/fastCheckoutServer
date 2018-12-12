class Order{
    
    constructor( app  ){
        this._app = app;
        this.rebuildMainVariables();
    };

    rebuildMainVariables(){        
        this._header = this._buildHeaderModel();
        this._items = this._buildItemsModel();
        this._fincInstruments = this._buildFinInsturments();   
        this._totalValueOrder = 0;
    };

    _buildHeaderModel(){
        let model = {
            issue : new Date(),
            unit : 1,
            custumer : 1,
            note : '',
            status : '',
            amount : 0
        };
        return model;
    };

    _buildItemsModel(){
        let model = [];
        return model;
    };

    _buildFinInsturments(){
        let model = {
            type : null,
            amount : null,
            percentage : null,
            installments : null,
            due : null,
            change : null
        };
        return model;
    };

    newOrder(){
        this.rebuildMainVariables();
    };

    

    addItem( item, quantity ){
        
        
        var orderItem = new this._app.src.app.models.OrderItem( this._app );
        
        orderItem.add( item, quantity );

        this._items.push(orderItem);
                
    };

    calculate(){
        this._totalValueOrder = this._items.reduce( ( total, value, index, array ) => {
            return total + value.total;
        }, 0 );
    };

    addPayment( value, type ){
        this.calculate();

    };

    cancelItem( itemId ){
        this._items.forEach( ( item, index, array ) => {
            if( item.id == itemId ){
                item.cancel();
                break;
            };
        } );
        this.calculate();
    };

    cancelOrder(){
        this._items.forEach( ( item ) => {
            item.cancela();
        });
        this.calculate();
    };

    record(){
        this.calculate();
    };
    
};

Order.prototype.toString = function orderToString(){
    return JSON.stringify({
        header : this._header,
        itens : this._items,
        fincInstruments : this._fincInstruments
    });
};

module.exports = () => {
    return Order;
};