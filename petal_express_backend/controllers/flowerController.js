// since all the api methods are async, we need to use either try-catch or .then structure, to avoid using any of them
// we can alternatively use asyncHandler (simply wrap async in this)
const asyncHandler = require('express-async-handler')

//  @route GET /api/flowers
const getFlowers = asyncHandler(async (req,res) =>{
    res.status(200).json({ message: "Get all flowers!" });
})

// since mongoose methods return a promise, we need to use async for all of these methods

//  @route POST /api/flowers
const addFlower = asyncHandler(async (req,res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field!')
    }
    res.status(200).json({ message: "Add a flower!" });
})

//  @route PUT /api/flowers/:id
const updateFlowerById = asyncHandler(async (req,res) =>{
    res.status(200).json({ message: `Update flower ${req.params.id}` });
} )

//  @route DELETE /api/flowers/:id
const deleteFlowerById = asyncHandler(async (req,res) =>{
    res.status(200).json({ message: `Delete flower ${req.params.id}` });
})

module.exports = {getFlowers,addFlower,updateFlowerById,deleteFlowerById}