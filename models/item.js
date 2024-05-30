const mongoose = require("mongoose");
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name : {type: String, required: true},
    description : {type: String, required: true},
    price :  {type: Number, required: true},
    weight : {type: Number, required: true},
    inStock : {type: Boolean, required: true, default: true},
    genre : [{type: Schema.Types.ObjectId, ref: 'Category', required: true}]
})

ItemSchema.virtual("url").get(function() {
    return `/catalog/item/${this._id}`;
});

ItemSchema.virtual("to_kg").get(function() {
    const weight = this.weight >= 1000 ? `${this.weight / 1000} кг` : `${this.weight} г`;
    return weight;
})

ItemSchema.virtual("formatted_price").get(function() {
    return formattedSum = this.price.toLocaleString('en-EN');
})


module.exports = mongoose.model("Item", ItemSchema);

