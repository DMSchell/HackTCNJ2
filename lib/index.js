import { MongoClient, ServerApiVersion } from "./mongodb.cjs";
const uri = "mongodb+srv://dmschell18:bjAisPWReJyiFSN8@cluster0.lxzqhsr.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
async function write(username, password) {
    try {
        const write = { message: 'how are you doing' }; 

        const message = await samples.insertOne(write);

        console.log(message); 

    } finally {

        await client.close(); 

    }
}

run().catch(console.dir);