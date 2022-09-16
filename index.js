const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


// middlewares
app.use(cors());
app.use(express.json());


// database connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.87jp9un.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log('DB Connected');

        // collections
        const hotelCollection = client.db('trip-finder').collection('hotels');

        


        app.get('/hotel', async (req, res) => {
            const query = {};
            const cursor = await hotelCollection.find(query);
            const result = await cursor.toArray();  
            res.send(result);
        });


        app.post('/hotel', async (req, res) => {
            const hotel = req.body;
            const result = await hotelCollection.insertOne(hotel);
            res.send(result);
        });


    } finally {
        //   await client.close();
    }
}

run().catch(console.dir);


app.get("/", (req, res) => {
    res.json("Server is runnig on. YAY! ")
});




app.listen(port, () => {
    console.log(`Server is runnin on port ${port}`)
})




