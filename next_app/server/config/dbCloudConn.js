const DBCloudConnection = async () => {
    
    const { MongoClient } = require("mongodb");
    let db = require("./db.js");


    // Create a new MongoClient instance
    const client = new MongoClient(db.url, db.options);


    async function run() {

        try {
            // Connect the client to the server	(optional starting in v4.7)
            const dbConnectedTo = await client.connect();

            // const dbInfo = await client.db("admin");
            // console.log("Connected to Database: ", dbInfo.client.options.appName);

                
            //   const database = client.db("<dbName>");
            //   const ratings = database.collection("<collName>");

            //   const cursor = ratings.find();
            //   await cursor.forEach(doc => console.dir(doc));


            // Send a ping to confirm a successful connection
            const successful = await client.db("admin").command({ ping: 1 });
            console.log("You successfully connected to MongoDB! ", "\nConnected to Database: ", dbConnectedTo.options.dbName, "\nPinged your deployment ==> Response:", successful);

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        };
    };
    run().catch(console.dir);
    
};

module.exports = DBCloudConnection;