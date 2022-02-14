const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { route } = require('express/lib/application');
const auth = require('../../middleware/auth');



const JWT_SECRET = 'jwt_scret';


//@route    POST api/users/register
//@desc     User registration
//@access   public
router.post('/register', [
    body('name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
    body('email', 'Invalid Email!').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 4 }),
], async (req, res) => {

    // Bad Request 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;
        // Check Email already exist
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Sorry, this email can't be registered. Let's try another one." });
        }

        let newUser = new User({
            name,
            email,
            password
        });

        // Password Hashing
        const hash = await bcrypt.hash(newUser.password, 10);
        newUser.password = hash;

        // Create new User in DB
        user = await newUser.save();
        res.json({ user });

    } catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error');
    }

});


//@route    POST api/users/login
//@desc     User Login
//@access   public
router.post('/login', [
    body('email', 'Invalid Email!').isEmail(),
    body('password', 'Password Field is empty').exists(),
], async (req, res) => {

    // Bad Request 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ error: "Invalid Username or Password" });
        } else {

            // Password Matching
            const isMatched = await bcrypt.compare(password, user.password);
            if (isMatched) {

                // JWT
                const payload = {
                    user: {
                        id: user._id
                    }
                };
                const token = jwt.sign(payload, JWT_SECRET);
                res.json({ token });

            } else {

                // 401 : Unauthorized Access / Invalid Credentials
                res.status(401).json({ error: "Invalid Username or Password" });

            }

        }




    } catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error');
    }

});



//@route    GET api/users/profile:id
//@desc     User Profile
//@access   private
router.post('/profile', auth, async (req, res) => {

    try {

        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            res.status(401).json({ error: "Unauthorized Person! Access Denied" });
        }

        res.send(user);


    } catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error!');
    }

})


module.exports = router;