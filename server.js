require('dotenv').config({path:"./config.env"});
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const multer = require('multer');

// require('dotenv').config()

// Connect DB
connectDB(); 
console.log(process.env.PORT, process.env.MONGO_URI)

// https://www.youtube.com/watch?v=YocRq-KesCM


const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());



app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));

// Error Handler (Should be last piece of middleware)

app.use(errorHandler);


const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// process.on("unhandledRejection",(err, promise) => {
//     console.log(`Logged Error: ${err}`);
//     server.close(() => process.exit(1));
// })