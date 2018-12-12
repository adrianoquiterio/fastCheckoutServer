class OrderItem{
    constructor(){
        this.item = {
            status : '',
            product : null,
            quantity : 1,
            unitary : null,
            discount : null,
            total : null,
            gst : null
        };
    }
};

module.exports = function (){
    return OrderItem
};