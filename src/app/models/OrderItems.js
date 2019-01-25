class OrderItems{
    constructor(){
        this.items = [];
        this.amount = 0;
        this.quantity = 0;
        this.totalPaid = 0;        
        this.change = 0;
    };
};
module.exports = () => OrderItems;