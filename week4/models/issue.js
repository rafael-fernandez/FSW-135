const mongoose = require("mongoose")
const Schema = mongoose.Schema

const IssueSchema = new Schema({
    IssueBody: {
        type: String,
        required:true,
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

module.exports = mongoose.model('Issue', IssueSchema) 