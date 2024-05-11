const cConfig = require('./data/config.json');

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createListing(client, newListing) {
    const result = await client.db("ebot").collection("users").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = cConfig.mongodb_url;

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await client.db("ebot").collection("users").updateMany(
            {},
            { $unset: {"new_field": -1} },
            false,
            true
        )

        /*await client.db("ebot").collection("users").updateMany(
            {},
            { $set: {"new_field": -1} },
            false,
            true
        )*/
        console.log("w6qe4");
        await listDatabases(client);




    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);