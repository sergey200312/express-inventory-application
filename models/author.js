const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name : {type: String, required: true},
    description : {type: String},
})

AuthorSchema.virtual("url").get(function() {
    return `catalog/author/${this._id}`;
})

module.exports = mongoose.model("Author", AuthorSchema);