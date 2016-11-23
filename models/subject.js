var mongooseUniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose');



var subjectSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    students: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
});

subjectSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Subject', subjectSchema);
