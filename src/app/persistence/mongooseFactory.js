const mongoose = require('mongoose');

async function createMongooseFactory(){
    
    mongoose.connect('mongodb://localhost/dfastcheck',  { useNewUrlParser: true });
    /* Order Modeling - Beginning*/
    let modelItem = {
        id : { type : Number },
        quantity : { type : Number },
        unitary : { type : Number },
        discount : { type : Number },
        total : { type : Number },
        description : { type : String }
    };

    let modelSchema = {
        items : [ modelItem ],
        header : {
            date : { type: Date, default: Date.now },
            totalOrder : { type : Number },
            totalPayment : { type : Number },
            totalQuantity : { type : Number },
            change : { type : Number, default : 0 }                       
        }
    };   

    let orderSchema = new mongoose.Schema( modelSchema );
    /* Order Modeling - End*/
    // Create object model
    console.log('Declara-se a variavel')
    if( !mongoose.models["Order"] ){
        mongoose.model('Order', orderSchema);    
    }
    


    let db = mongoose.connection;
    await db.on('error', console.error.bind(console, 'An error while we tried to connect to MongoDB'));
    await db.on('open', function(){
        console.log('Mongoose successfuly connected!');  
            
    });
    return mongoose
};

module.exports = () => {
    return createMongooseFactory;
}
