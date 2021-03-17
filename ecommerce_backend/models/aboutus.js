const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema( {
	description: {
        type: String,
        required: [true, 'Description is required.'],
        maxlength: 1000
    },
},
{timestamps: true}
	
);

module.exports = mongoose.model("AboutUs", AboutUsSchema);
