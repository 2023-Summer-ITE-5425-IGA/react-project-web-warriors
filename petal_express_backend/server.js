const express = require('express')
const app = express()
const cors = require('cors')
const server_port = 5000;


// enable cors (security mechanism which prevents (by default) cross-origin HTTP requests)
app.use(cors());

// api to display all flowers
app.get("/allflowers",(req,res) =>{
    res.json({"flowers":["rose","jasmine","sunflower"]})
})

app.listen(server_port,()=>{console.log(`Server listening to port ${server_port}`)})