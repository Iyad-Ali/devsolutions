const mongoose = require('mongoose');

const schema = mongoose.Schema;

const serviceSchema = new schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Service', serviceSchema);