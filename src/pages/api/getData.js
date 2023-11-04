const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://muizz:oluwafemi2004@cluster0.f7czzhs.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

export default async function run(req, res) {
    try {
        const database = client.db('uploads');
        const formData = database.collection('upload');

        const data = await formData.find({}).toArray();

        res.json(data)
    } finally {

        // await client.close();
    }
}
run().catch(console.dir);