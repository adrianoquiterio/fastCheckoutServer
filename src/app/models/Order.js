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
        this._totalPaid = 0;
        this._change = 0;
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

    quantityItem( value ){
        let objResponse = { quantity : 1 , item : null };        
        value = value.value.split("*");

        if( value.length > 1 ){
            objResponse.quantity = Number( value[0] );
            objResponse.item = Number( value[1] );
        } else {
            objResponse.item = parseInt( value[0] );
        };

        if(isNaN(objResponse.quantity)){
            throw new Error("Quantity is not a valid number");
        } 
        if ( isNaN(objResponse.item) ){
            throw new Error(`Item is not a valid number.`);
        };

        return objResponse;
    };
    async addItem( value, req ){
        let quantityItem = this.quantityItem(value);

        let orderItem = new this._app.src.app.models.OrderItem( this._app );
        
        let resultadoAdicao = await orderItem.add( quantityItem.item, quantityItem.quantity );
        this._items.push(resultadoAdicao)
        
        req.session.order.items.push( resultadoAdicao );

        this.calculate(req);        
        req.session.order.amount = this._totalValueOrder;
        req.session.order.quantity = this._totalQuantityOrder;
    };

    async addPayment( value, req ){
        this.calculate( req );    
        value = Number(value.value);

        if ( !isNaN(Number(value)) ){
            // If paid enough
            if( value <= 0 ){
                throw new Error(`Value must be positive! Informed: ${value}` )
            };

            if( value + this._totalPaid >= this._totalValueOrder ){
                this._totalPaid = value + this._totalPaid;
                this._change = this._totalPaid - this._totalValueOrder;
                await this.saveOnDatabase();
                
            } else {
                this._totalPaid = value + this._totalPaid;
            };
            
            req.session.order.totalPaid = this._totalPaid;
            req.session.order.change = this._change;
            this.rebuildMainVariables();
        };    
    };

    async saveOnDatabase(){
        try{
            let orderDao = new this._app.src.app.persistence.OrdersDao( this._app );                
            await orderDao.saveOrder( this.toDatabaseModel() );            
        } catch(e){
            console.log(`Problem trying to save the order on database! ${e.message} - ${e.stack}`);
            throw new Error("Wasn't possible to save your order on database! :(")
        }            
        return true;
    }
    
    toDatabaseModel(){
        let obj  = {}
        obj.header = {
            totalOrder : this._totalValueOrder,
            totalPayment : this._totalPaid,
            totalQuantity : this._totalQuantityOrder,
            change : this._change
        },
        obj.items = []
        this._items.forEach( ( value, index, array ) => {
            let objResult = {};
            objResult.id = value.product;
            objResult.quantity = value.quantity;
            objResult.unitary = value.unitary;
            objResult.discount = value.discount;
            objResult.total = value.total;
            objResult.description = value.description;
            obj.items.push(objResult);
        } );        
        return obj;
    };    

    calculate( req ){        
        this._totalValueOrder = req.session.order.items.reduce( ( total, value, index, array ) => {                        
            return total + ( value.total ) ;
        }, 0 ); 
        
        this._totalQuantityOrder = req.session.order.items.reduce( ( total, value, index, array ) => {                        
            return total + ( value.quantity ) ;
        }, 0 );         
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