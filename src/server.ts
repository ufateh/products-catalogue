import { MongoClient } from 'mongodb';

// on startup, create a mongodb connection instance, if that is successful,
// add endpoints to express instance.
const conectionString = 'mongodb+srv://mongo:mongo@cluster0.ouori.gcp.mongodb.net/mongo?retryWrites=true&w=majority';

MongoClient.connect(conectionString, { useUnifiedTopology: true })
    .then((client: MongoClient) => {
        console.log('Connected to Database')
        const db = client.db('mongo')
        const collection = db.collection('test');
        collection.insertOne({ name: 'rollercoaster', category: 'heavy' }).then(res => {
            console.log('added')
        }).catch(err => {
            console.log('error happended while saving the data', err)
        }).finally(() => {
            client.close()
        });
    }).catch(err => {
        console.log('error happened', err)
    })