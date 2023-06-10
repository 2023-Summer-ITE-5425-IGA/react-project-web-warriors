
const mongoose = require("mongoose");

class MongoDAO {
    FlowerModel = null;

    initialize = uri => {
        // Establish a connection with the MongoDB server and initialize the "Flower" model with the "Flower" collection

        mongoose
            .connect(uri, { dbName: "Flower" }) // collection
            .then(() => console.log("Database connection initialized"))
            .catch(console.error);

        const flowerSchema = new mongoose.Schema({
            f_id : Number,
            name : String,
            category: String,
            color:String,
            price:Number,
            stock:Number,
            description: String,
            image: String,
        });

        // Compile the flower model only if it doesn't already exist
        this.FlowerModel =
            this.FlowerModel ||
            mongoose.model("Flower", flowerSchema);
    };

    addNewFlower = data => {
        //  Create a new flower in the collection using the object passed in the "data" parameter
        const flower = new this.FlowerModel(data);
        return flower.save();
    };

    getAllFlowers = (filter = {}) => {
        // const filter = {}; // Empty filter to retrieve all flowers
      
        return this.FlowerModel.find(filter)
          .sort({ f_id: 1 }) // Sort by f_id in ascending order
          .exec()
          .then(flowers => {
            return flowers;
          })
          .catch(error => {
            throw new Error('Failed to get all flowers');
          });
      };

    getFlowerById = id => {
        // Return a single flower object whose "_id" value matches the "Id" parameter
        return this.FlowerModel.findOne({ _id: id }).exec();

        // Mongoose way
        // return this.FlowerModel.findById(id).exec();
    };

    updateFlowerById = (data, id) => {
        // console.log("data is : " + data);
        // console.log("id is" + id);
        // Overwrite an existing flower whose "_id" value matches the "Id" parameter, using the object passed in the "data" parameter.

        return this.FlowerModel.findOneAndUpdate({ _id: id }, data)
            .exec()
            .then(() => this.getFlowerById(id));

        // Mongoose way
        // return this.FlowerModel.findByIdAndUpdate(id, data).exec();
    };

    deleteFlowerById = id => {
        // Delete an existing flower whose "_id" value matches the "Id" parameter
        return this.FlowerModel.deleteOne({ _id: id })
            .exec()
            .then(() => id);

        // Mongoose way
        // return this.FlowerModel.findByIdAndDelete(id).exec();
    };
}

module.exports = MongoDAO;