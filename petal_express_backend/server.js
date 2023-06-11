const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const MongoDAO = require("./dao/dao.js");
const server_port = process.env.SERVER_PORT

const app = express()
const mongoDAOinstance = new MongoDAO();

// parse JSON data sent in the request body (for example in a post request)
app.use(express.json())
// parse URL-encoded data sent in the request body (for example in a post request)
app.use(express.urlencoded({extended:false}));

// enable cors (security mechanism which prevents (by default) cross-origin HTTP requests)
app.use(cors());

// mongodb atlast connection uri (change username and password in the uri to the actual mongodb credential)
const uri =
  "mongodb+srv://simul:root@simcluster.9t4a9ki.mongodb.net/?retryWrites=true&w=majority";

// api to display all flowers

// app.get("/getAllflowers", (req, res) => {
// const getAllFlowers = async () => {
//     mongoDAOinstance.initialize(uri);
//     await mongoDAOinstance
//       .getAllFlowers()
//       .then((savedFlowers) => {
//         console.log(savedFlowers);
//         if (savedFlowers.length === 0) {
//           // If no flowers found, send 204 status code
//           res.status(204).send("No flowers found!");
//         //   console.log("not found!");
//         } else {
//           // If flowers found, send success response with 201 status code
//           res.status(200).json(savedFlowers);
//         }
//       })
//       .catch((err) => {
//         // Send error response with 500 status code
//         res.status(500).send("Error 500: Data could not be fetched!");
//       });
//   };
//     getAllFlowers();
// })

app.use('/api/flowers', require('./routes/flowerRoutes.js'))

app.listen(server_port,()=>{console.log(`Server listening to port ${server_port}`)})