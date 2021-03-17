const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema( {
    name: {
        type: String,
        trim: true,
        required: [true, 'Product Name is required.'],
        maxlength: 32
    },

    description: {
        type: String,
        required: [true, 'Description is required.'],
        maxlength: 2000
    },

    price: {
        type: Number,
        trim: true,
        required: [true, 'Price is required.'],
        maxlength: 32
    },

    category: {
        type: ObjectId,
        ref: 'Category',
        required: [true, 'Category is required.']
    },

    _collection: {
        type: ObjectId,
        ref: 'Collection',
        required: [true, 'Collection is required.']
    },

    quantitySmall: {
        type: Number,
        default: 0
    },
    
    quantityMed: {
        type: Number,
        default: 0
    },

    quantityLarge: {
        type: Number,
        default: 0
    },

    quantityFree: {
        type: Number,
        default: 0
    },

    soldSmall: {
        type: Number,
        default: 0
    },

    soldMed: {
        type: Number,
        default: 0
    },

    soldLarge: {
        type: Number,
        default: 0
    },

    soldFree: {
        type: Number,
        default: 0
    },

    photo: {
        data: Buffer,
        contentType: String
    },

    shipping: {
        required: false,
        type: Boolean
    },

    sizeSmall: {
        type: Boolean,
        default: false
    },

    sizeMed: {
        type: Boolean,
        default: false
    },

    sizeLarge: {
        type: Boolean,
        default: false
    },

    sizeFree: {
        type: Boolean,
        default: false
    }
}, 
    {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);