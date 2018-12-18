const student = require('../controller/student.controller.js');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config')
exports.checkStudent = function(req, res, next){
        if(student.findById){
            console.log('student with id ' + req.body.id + ' found');
            next();
        }
        else{
            console.log('error record not found')
            res.sendStatus(404);
        }
    };

    
exports.verifyToken = function(req,res,next){
        const bearerHeader = req.headers['getparam'];
        console.log(bearerHeader);
        if(typeof bearerHeader !== 'undefined' ){
            console.log("Token is present in header");
                req.token = bearerHeader;
                jwt.verify(req.token,db.key,(err,authdata) => {
                    req.authdata = authdata;
                    if(err){
                        res.sendStatus(403)
                    }
                    else{
                        next();
                    }
                });
            }
        else{
            console.log("Error in verify token"); 
            res.sendStatus(403);
            }
    };