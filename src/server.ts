import express from 'express';
import mongoose from 'mongoose';
import { Models, productCategorySchema, productSchema } from './schemas';
import randomstring from 'randomstring';

const app = express();


// these will be added to mongoose instance
mongoose.model(Models.Products, productSchema);
mongoose.model(Models.ProductCategory, productCategorySchema);

// on startup, create a mongodb connection instance, if that is successful,
// add endpoints to express instance.
const connectionString = 'mongodb+srv://mongo:mongo@cluster0.ouori.gcp.mongodb.net/mongo?retryWrites=true&w=majority';

//using mongoose to take care of the schema
// using default instance of mongoose to conenct to mongodb
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

    // express app..
    app.listen(process.env.PORT ? process.env.PORT : 8080, () => {
        console.log(`Express app listening at port ${process.env.PORT ? process.env.PORT : 8080}`);
        
        let productCateogry = randomstring.generate({
            length: 12,
            charset: 'alphabetic'
          });
        seeder(productCateogry);


        //mongoose.disconnect();
    });

    init_express();


},
    err => {
        console.log('unable to connect to database. Make sure mongo isntance is running on the given connection string', err)
    });
// we can handle below event if needed..
mongoose.connection.on('disconnected', console.error.bind(console, 'database disconnected!'));



async function seeder(category:String) {
    let pCatgModel = mongoose.model(Models.ProductCategory);
    let catItem = new pCatgModel({
        name : category
    });
    await catItem.save();
    setInterval(async () => {
        let model = mongoose.model(Models.Products);
        let product = new model({
            name: "fateh",
            price: 123,
            dimentions: "12 by 12",
            remaining: 21,
            rating: 6.8
        });
        await product.save();
        
        console.log(product.id);
    }, 3000)
}

async function create(modelName: Models, data: any) {
    return mongoose.model(modelName).create(data);
}

function find(modelName: Models, select: any, sort: any, limit?: any, callback?: ((err: mongoose.NativeError, res: mongoose.Document[]) => void) | undefined) {
    let query = mongoose.model(modelName).find(select);
    query?.limit(limit);
    query?.sort(sort);
    query?.exec(callback);
}

function init_express() {

    app.get('/', function (req, res) {
        res.send('hello world')
        mongoose.disconnect();
    });

    app.get('/products', function (req, res) {
        mongoose.model(Models.Products).find({}, function (err, products) {
            if (err) {
                res.send({ error: 'could not fetch data from mongodb' });
            }
            res.send(products)
        })
    });
    app.get('/categories', function (req, res) {
        mongoose.model(Models.ProductCategory).find({}).select('name').then(data=> {
            res.send(data)
        })
    });

}