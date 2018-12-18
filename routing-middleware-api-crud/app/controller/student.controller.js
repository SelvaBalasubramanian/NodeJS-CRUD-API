
const db = require('../config/db.config.js');
const Student = db.student;
const jwt =require('jsonwebtoken');
const md5 = require('md5');
 
// Post a Student
exports.create = (req, res) => {	
	// Save to MySQL database
	const encryptedPassword = md5(req.body.password);
	console.log(encryptedPassword);
	Student.create({  
		name : req.body.name,
		dob :  req.body.dob,
		age :  req.body.age,
		gender : req.body.gender,
		mark1 : req.body.mark1,
		mark2 : req.body.mark2,
		mark3 : req.body.mark3,
		avg : req.body.avg,
		result : req.body.result,
		password : encryptedPassword,
	}).then(Student => {		
		res.send(Student);
	});
};

//create with token 
// Fetch all student
exports.findAll = (req, res) => {
	Student.findAll().then(student => {
	  res.send(student);
	});
};
 
// Find a student by Name
exports.findByName = (req, res) => {	
	return Student.findOne({
		where : {
			name : req.body.name,
		}
	})
};
 
exports.findById = (req, res) => {	
	return Student.findOne({
		where : {
			id : req.body.id,
		}
	})
};
// Update a student
exports.update = (req, res) => {
	const id = req.body.id;
	Student.update( { name: req.body.name,  age: req.body.age }, 
					 { where: {id: req.body.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a student with id = " + id);
				   });
};
 
// Delete a student by Id
exports.delete = (req, res) => {
	const id = req.body.id;
	Student.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a student with id = ' + id);
	});
};

exports.setToken = (req,res) => {
		const student  = {
			name : req.body.name,
			age : req.body.age
		};
		console.log(req.body.name)
		console.log(req.body.age);
		jwt.sign({student} ,db.key, (err , token) => 
			res.json({
				token,
				authdata : req.authdata

			})
		);
		
};

exports.getStudent = (req,res,next) =>{
	const student =  this.findByName(req,res).then((students) => {
			res.json({
				students,
				authdata : req.authdata
			});
	});	
};

exports.getStudentById = (req,res,next) =>{
	const student =  this.findById(req,res).then((students) => {
			res.json({
				students,
				authdata : req.authdata
			});
	})
};

exports.login  = (req,res,next) => {
	this.findByName(req,res).then((students) => {
		if(md5(req.body.password) ==  students.password){
			res.json({
				Status : students.name + " sucessfully logged in",
				authdata : req.authdata
			});
		}
		else {
			res.sendStatus(403);
		}
	});
};