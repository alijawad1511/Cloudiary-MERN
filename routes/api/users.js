const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');



//@route    POST api/auth
//@desc     User registration
//@access   public
router.post('/register', async (req, res) => {
    
    const { name, email, password } = req.body;

    let newUser = new User({
        name,
        email,
        password
    });

    // Password Hashing
    const hash = await bcrypt.hash(newUser.password, 10);
    newUser.password = hash;

    newUser.save();
    res.json({
        message: "User regsitered successfully"
    });

});



module.exports = router;