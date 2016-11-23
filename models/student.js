var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    name: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    phones: {
        name: {type: String},
        address: {type: String}
    }
});

studentSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Student', studentSchema);
