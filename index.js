const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('server is running');
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gplljg9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const productsCollection = client.db("softTechDb").collection("products");

    // ============ products collection all code ============= //
    app.post('/product', async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product)
      res.send(result)
    })

    app.get('/products', async (req, res) => {
      const query = {};
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    })

    app.get('/product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await productsCollection.findOne(query)
      res.send(result);
    })

    app.put('/product/:id', async (req, res) => {
      console.log(req.body);
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = req.body;
      const updatedDoc = {
        $set: {
          price: product.price
        }
      }
      const result = await productsCollection.updateOne(query, updatedDoc);
      res.send(result);

    })


  }
  finally {

  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
})


