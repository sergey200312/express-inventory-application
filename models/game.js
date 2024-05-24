const mongoose = require("mongoose");
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name : {type: String, required: true},
    description : {type: String, required: true},
    year_of_release : {type: Date, required: true},
    price :  {type: Number, required: true},
    genre : [{type: Schema.Types.ObjectId, ref: 'Genre', required: true}],
    author : [{type: Schema.Types.ObjectId, ref: 'Author', required: true}],
})

GameSchema.virtual("url").get(function() {
    return `/catalog/game/${this._id}`;
});

GameSchema.virtual("release_yyyy_mm_dd").get(function () {
    return DateTime.fromJSDate(this.year_of_release).toLocaleString(DateTime.DATE_MED); // format 'YYYY-MM-DD'
  });

module.exports = mongoose.model("Game", GameSchema);

