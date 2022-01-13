const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');



//@route    POST api/auth
//@desc     User registration
//@access   public
router.post('/register', [
    body('name','Name must be at least 3 characters long').isLength({min: 3}),
    body('email','Invalid Email!').isEmail(),
    body('password','Password must be at least 5 characters long').isLength({min: 4}),
] ,async (req, res) => {
    
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
        res.json(user);
        
    }catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error');
    }

});


module.exports = router;