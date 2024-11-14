const express = require("express");
const {connectMongoDb} = require("./connection");
const app = express();

const port = process.env.PORT || 8001;

app.use(express.json());

app.use("/api/player", require("./routes/userRoutes"));
connectMongoDb('mongodb://localhost:27017/Game2048');

app.listen(port, ()=> {
    console.log(`server running on port ${port}`);
    
});