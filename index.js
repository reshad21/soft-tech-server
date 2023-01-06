const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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
      // console.log(product);
      const result = await productsCollection.insertOne(product)
      res.send(result)

    })
  }
  finally {

  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
})
