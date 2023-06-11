// since all the api methods are async, we need to use either try-catch or .then structure, to avoid using any of them
// we can alternatively use asyncHandler (simply wrap async in this)
const asyncHandler = require('express-async-handler')
// importing flowerModel (that holds the mongoDB db schema)
const flowerModel = require('../models/flowerModel')

// since mongoose methods return a promise, we need to use async for all of these methods
//  @route GET /api/flowers
const getFlowers = asyncHandler(async (req,res) =>{
    // set this filter from the parameter later
    const filter = {};
    const flowers = await flowerModel.find()
    .sort({ f_id: 1 }); // Sort by f_id in ascending order
    res.status(200).json(flowers);
})


//  @route POST /api/flowers
const addFlower = asyncHandler(async (req,res) =>{
    // if(!req.body.text){
    //     res.status(400)
    //     throw new Error('Please add a text field!')
    // }
    // const flowers = await flowerModel.create({
    //     flowers : req.body
    // })
    // res.status(200).json(flowers);
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