const {MongoClient} = require('mongodb');

async function getClient() {
    const mongoConnect1 = process.env.MONGO

    const client = new MongoClient(mongoConnect1);

    try {
        await client.connect();
        const myDB = client.db("cse341")
        const myQuiltsCollection = myDB.collection("quilts");

        return myQuiltsCollection;


    } catch (e) {
        console.error(e);
    } 
}

getClient().catch(console.error);

module.exports = { getClient }