var express = require('express');
var router = express.Router();

var Subject = require('../models/subject');
var Student = require('../models/student');

/**Get list of subjects**/
router.get('/subjects', function (req, res) {
    Subject.find({})
        .populate('students')
        .exec(function (err, subjects) {
            res.status(200).jsonp(subjects);
        })
});

/**Get details of a particular subject**/
router.get('/subjects/:name', function (req, res) {
    Subject.find({name: req.params.name}, function (err, subject) {
        if (err) res.send(500, err.message);
        console.log(subject);
        res.status(200).jsonp(subject);
    });
});

/**See detail of a student inside a particular subject
 /**Work in Progress**/
router.get('/subjects/:subjectName/:studentid', function (req, res) {
    Subject.find({name: req.params.subjectName}, function (err, subject) {
        Student.find({id: req.params.studentid}, function (err, student) {
            if (err) res.send(500, err.message);
            console.log(student);
            res.status(200).jsonp(student);
        });
    });
});

//Añadir alumno a asignatura
router.post('/subjects/:name/student', function (req, res) {
    var student = new Student
    ({
        name: req.body.name,
        address: req.body.address,
        phones: [{
            name: req.body.name2,
            address: req.body.address2
        }]
    });
    student.save(function (err, student) {
        if (err) return res.send(500, err.message);
        Subject.find({
            name: req.params.name
        }, function (err, subject) {
            if (err) return res.send(500, err.message);
            Subject = subject[0];
            subject.students.push(student._id);
            subject.save(function (err, subject) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(subject);
            });
        });
    });
});

module.exports = router;
