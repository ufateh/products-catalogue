import express from 'express';
import mongoose from 'mongoose';
import { Models, productCategorySchema, productSchema } from './schemas';
import { Chance } from 'chance';
import * as bodyParser from 'body-parser';
const generator = new Chance();
const app = express();
app.use(bodyParser.json());

function init_express() {

    app.get('/', function (req, res) {
        res.send('API is working')
        //mongoose.disconnect();
    });

    app.get('/products', function (req, res) {
        // the reason populate funciton is used here is due to the fact that MongoDB does not return the referenced data automatically, we have to get the reference object id and then query it again.
        // mongoose provide us the ability to use populate to fetch the referenced info.
        mongoose.model(Models.Products).find({}).populate('category').then(products => {
            res.send(products)
        })
    });
    app.get('/products/search/:text', function (req, res) {
        mongoose.model(Models.Products).find({ $text: { $search: req.params.text } }).exec(function (err, docs) {
            if (err) {
                res.send({ error: `could not fetch any document`, server_error: err });
            }
            res.send(docs)
        });
    });
    app.get('/products/:name', function (req, res) {
        let name = req.params.name;
        mongoose.model(Models.Products).find({ name: name }).populate('category').then(products => {
            res.send(products)
        })
    });
    app.post('/products', function (req, res) {
        mongoose.model(Models.Products).find(req.body).populate('category').then(products => {
            res.send(products)
        }).catch(err => {
            res.send({ error: err })
        })
    });
    app.get('/categories', function (req, res) {
        mongoose.model(Models.ProductCategory).find({}).select('name').then(data => {
            res.send(data)
        })
    });
    app.get('/categories/:name', function (req, res) {
        let name = req.params.name;
        mongoose.model(Models.ProductCategory).find({ name: name }).select('name').then(data => {
            res.send(data)
        })
    });
    app.post('/categories', function (req, res) {
        mongoose.model(Models.ProductCategory).find(req.body).select('name').then(data => {
            res.send(data)
        }).catch(err => {
            res.send({ error: err })
        })
    });
    app.get('/search/:category/products/:name', function (req, res) {
        let category = req.params.category;
        let name = req.params.name;
        mongoose.model(Models.ProductCategory).findOne({ name: category }).then(data1 => {
            mongoose.model(Models.Products).find({ name: name, category: data1?._id }).select('name').then(data => {
                res.send(data)
            }).catch(err => {
                res.send({ error: err })
            })
        }).catch(err => {
            res.send('could not find the category');
        })

    });

}


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

        let productCateogry = generator.word();
        //seeder(productCateogry);


        //mongoose.disconnect();
    });

    init_express();


},
    err => {
        console.log('unable to connect to database. Make sure mongo isntance is running on the given connection string', err)
    });
// we can handle below event if needed..
mongoose.connection.on('disconnected', console.error.bind(console, 'database disconnected!'));



async function seeder(category: String) {
    let pCatgModel = mongoose.model(Models.ProductCategory);
    console.log('going to create category: ', category)
    let catItem = new pCatgModel({
        name: category
    });
    await catItem.save();
    setInterval(async () => {
        let model = mongoose.model(Models.Products);

        let temp = generator.word();
        console.log(`product ${temp} created`)
        let product = new model({
            name: temp,
            price: generator.integer({ min: 1, max: 20000 }),
            dimentions: generator.sentence({ words: 5 }),
            remaining: generator.integer({ min: 0, max: 100 }),
            rating: generator.integer({ min: 0, max: 10 }),
            category: catItem.id
        });
        await product.save();

        console.log(product.id);
    }, 3000)
}
