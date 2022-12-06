// src/services/user.js

const User = require('../model/user');

// User login api 
exports.login = (req, res) => { 

    // Find user with requested email 
    User.findOne({ email : req.body.email }, function(err, user) { 
        if (user === null) { 
            return res.status(400).send({ 
                status: 400,
                message : "User not found."
            }); 
        } 
        else { 
            if (user.validPassword(req.body.password)) { 
                res.send({
                    status: 200,
                    data: {
                        token: 'test123',
                        id: user._id,
                        role: user.role,
                    }
                });
            } 
            else { 
                return res.status(400).send({ 
                    status: 400,
                    message : "Wrong Password"
                }); 
            } 
        } 
    }); 
};

// User signup api 
exports.signup = (req, res) => { 

    User.find({email: req.body.email}, (err, result) => {
        console.log('ssssssssssssssss', result.length)
        if (result.length > 0) {
            return res.status(400).send({
                status : 400,
                message : "User found with same email address."
            });
        } else {
            // Creating empty user object 
            let newUser = new User(); 
            
            // Initialize newUser object with request data 
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.mobile = req.body.mobile;
            newUser.role= req.body.role;

            // Call setPassword function to hash password 
            newUser.setPassword(req.body.password); 

            // Save newUser object to database 
            newUser.save((err, User) => { 
                if (err) { 
                    return res.status(400).send({
                        status: 400,
                        message : "Failed to add user."
                    }); 
                } 
                else { 
                    return res.status(201).send({
                        status: 201,
                        data:{...User},
                        message : "User added successfully."
                    }); 
                } 
            }); 
        }
    });
}; 

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a user
    const user = new User({
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all Users from the database.
exports.findAllClient = (req, res) => {
    User.find({role: "client"}, (err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while fetching the user."
            });
        } else {
            res.send(result);
        }
    })
};

// Find a single User with a userId
exports.findById = (req, res) => {
    const _id = req.params.userId;
    User.findById(_id, function(err, user) { 
        if (user === null) { 
            res.status(400).send({ 
                status: 400,
                message : "User not found."
            }); 
        } 
        else { 
            res.send({
                user
            });
        } 
    }); 
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    const _id = req.params.userId;
    User.findOneAndUpdate(_id, req.body, {upsert: true}, function(err, user) { 
        if (user === null) { 
            res.status(400).send({ 
                status: 400,
                message : "User not found."
            }); 
        } 
        else { 
            res.send({
                user
            });
        } 
    }); 
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {

};