const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name : {type: String, required: true},
    description : {type: String, required: true},
    year_of_release : {type: Date, required: true},
    price :  {type: Number, required: true},
    genre : [{type: Schema.Types.ObjectId, ref: 'Genre'}],
    author : [{type: Schema.Types.ObjectId, ref: 'Author'}]
})

GameSchema.virtual("url").get(function() {
    return `catalog/game/${this._id}`;
});

module.exports = mongoose.model("Game", GameSchema);

