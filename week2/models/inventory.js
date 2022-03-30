const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Inventory Schema
const inventorySchema = new Schema ({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: 1600,
    }
})

module.exports = mongoose.model("Inventory", inventorySchema);