const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser'); 

const JWT_SECRET = "createdByDeeksha:)"; // Secret key for JWT signing

//Creating a user using POST (No login required)
// Route 1: /api/auth/createuser
router.post('/createuser', [
    body('name').isLength({ min: 3 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
],
    async (req, res) => {
        // Validate the request body
        // If there are validation errors, return a 500 status with the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        
            // Checking weather the user with the same email already exists
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry, a user with this email already exists" });
            }

            let salt = await bcrypt.genSalt(10); // Generate a salt for hashing
            const secPass = await bcrypt.hash(req.body.password, salt); // Hash the password with the salt

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass // Use the hashed password
            })
             //res.json(user) 

            // Create a JWT token
            const data = {
                user: {
                    id: user.id // Use the user's ID for the token payload
                }
            };
            const authToken = jwt.sign(data , JWT_SECRET);
            res.json({authToken: authToken}); // Send the token in the response
        }
        catch (error) {
                        console.error(error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }

            // As we are using async/await, we can handle errors with try/catch .. (no use of .then() and .catch())
            // .then(user => {
            //     res.json(user);
            // }).catch(err=> {
            //     console.error("Error creating user:", err);
            //     res.status(500).json({ error: 'Internal Server Error' });
            // })


            // check: If creation is successful, send the user object as a JSON response
            // obj = {
            //     name: "Inotebook",
            //     description: "This is a MERN stack inotebook app",
            // }
            //res.json(obj); // Send the object as a JSON response
            // console.log(req.body);
            // const user = User(req.body); // Create a new User instance with the request body
            // user.save(); // Save the user to the database
            // res.send(req.body); // Send the request body as a response
        });



// Authenticate a user using POST (No login required)
// Route 2: /api/auth/login
router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password','Password cant be blank').exists(),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body; // Destructure email and password from the request body
        try {
            let user = await User.findOne({ email }); // Find the user by email
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }
            
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }
            
            // Create a JWT token
            const data = {
                user: {
                    id: user.id // Use the user's ID for the token payload
                }
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken: authToken }); // Send the token in the response
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    




// Get logged in user details using POST (Login required)
// Route 3: /api/auth/getuser
router.post('/getuser', fetchuser, async (req, res) => {
        try {
            userId = req.user.id; // Get the user ID from the request object
            const user = await User.findById(userId).select("-password"); // Find the user by ID and exclude the password field
            res.send(user); // Send the user details as a response
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ error: "Internal Server Error" });
        }
    });


module.exports = router; 