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

    async addItem( item, quantity, req ){
                
        let orderItem = new this._app.src.app.models.OrderItem( this._app );
        let resultadoAdicao = await orderItem.add( item, quantity );
        
        req.session.order.items.push( resultadoAdicao );

        this.calculate(req)
        console.log(`Quantidade de itens: ${ req.session.order.items.length } - Session: ${ req.sessionID }`);
        console.log('Total ' + this._totalValueOrder );
    };

    calculate( req ){
        this._totalValueOrder = req.session.order.items.reduce( ( total, value, index, array ) => {            
            return total + ( value.total ) ;
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


module.exports = () => {
    return Order;
};