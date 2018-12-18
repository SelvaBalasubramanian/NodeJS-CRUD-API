var express = require('express');
var router = express.Router();

const student = require('../controller/student.controller.js');
const middleware = require('./student.middleware.js');

router.post('/api/student/insert',student.create);
router.get('/api/student/getStudentById',[middleware.checkStudent , middleware.verifyToken],student.getStudentById);
router.delete('/api/student/deleteById',[middleware.checkStudent  , middleware.verifyToken],student.delete);
router.put('/api/student/updateById',[middleware.checkStudent , middleware.verifyToken],student.update);

router.post('/api/setToken',student.setToken);
router.get('/api/student/getStudent',[middleware.verifyToken],student.getStudent);
router.get('/api/student/login',[middleware.checkStudent , middleware.verifyToken] ,student.login);
module.exports = router;
