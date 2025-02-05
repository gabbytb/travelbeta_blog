const express = require("express");
const cors = require("cors");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();     // Handles Next.js pages

const dotenv = require("dotenv");
dotenv.config();    // Load environment variables





const server = express();




// Wait for Next.js to be ready
app.prepare().then(() => {

    // *******************************************************
    // *******************************************************
    // Middleware (optional)
    // *******************************************************
    // *******************************************************
    // Middleware to enable CORS
    server.use(cors());  // Allows other servers (like Next.js) to talk to this server
    server.use(express.json());  // Parse incoming JSON requests
    server.use(express.urlencoded({ extended: true }));


    // Import Database Connection
    const dbCloudConnection = require("./config/dbCloudConn");
    
    // Database Connection
    dbCloudConnection();

    // Serve static files (from the "public" folder)
    server.use(express.static("public"));
  
    // Custom API route using Express
    // Example API route (Express instead of Next.js API routes)
    // server.get("/api/custom", (req, res) => {
    //     res.json({ message: "Hello from Express API!" });
    // });

    // Sample API Route
    server.get("/api/data", (req, res) => {
        res.json({ message: "Hello from Express!", data: "gabby", success: true });
    });

    // Handle all other requests with Next.js
    server.all("*", (req, res) => {
        return handle(req, res);    // Let Next.js handle all routes
    });
    
    // Import Port
    const PORT = process.env.PORT || 3000;
  
    // Start the server
    server.listen(PORT, (err) => {
        if (err) throw console.log("Error with port: ", err);
        console.log(`Ready on http://localhost:${PORT} ✓`);
    });

})
.catch((err) => {
    console.error("Error starting server:", err);
});
