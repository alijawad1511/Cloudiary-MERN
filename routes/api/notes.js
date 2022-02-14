const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Note = require('../../models/Note');


//@route    GET api/notes/usernotes
//@desc     Fetch User Notes
//@access   private
router.get('/usernotes', auth, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error');
    }

});




//@route    POST api/notes/addnote
//@desc     Add a Note
//@access   private
router.post('/addnote', auth, [
    body('title', 'Title must be at least 3 characters long').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {

    try {

        const { title, description, tag } = req.body;

        // Bad Request 400
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        });

        // Return saved Note in Database
        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error');
    }



});



module.exports = router;