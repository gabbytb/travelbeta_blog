const { ServerApiVersion } = require("mongodb");

const username = encodeURIComponent("travelbetablog");
const password = encodeURIComponent("tr@v3lb3t@b10g");
const cluster = "travelbetablog.v1wir.mongodb.net";
const clusterName = "blog";


// Define MongoClient options
const options = {
    retryWrites: true,
    w: "majority",
    serverSelectionTimeoutMS: 45000, // Timeout if the connection fails (45s)
    socketTimeoutMS: 60000, // Timeout for socket operations (60s)
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};

const uri = `mongodb+srv://${username}:${password}@${cluster}/${clusterName}`;
// console.log("URI: ", uri);


module.exports = {
    url: uri || null,
    options: options
};