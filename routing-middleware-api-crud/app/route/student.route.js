module.exports = function(app) {
 
    const student = require('../controller/student.controller.js');
 
    // Create a new Customer
    app.post('/api/student', student.create);
 
    // Retrieve all Customer
    app.get('/api/student', student.findAll);
 
    // Retrieve a single Customer by Id
    app.get('/api/student/:studentID', student.findById);
 
    // Update a Customer with Id
    app.put('/api/student/:studentID', student.update);
 
    // Delete a Customer with Id
    app.delete('/api/student/:studentID', student.delete);
}