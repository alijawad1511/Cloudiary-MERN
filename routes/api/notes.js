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



//@route    PUT api/notes/updatenote
//@desc     Update a Note
//@access   private
router.put('/updatenote/:id', auth, async (req, res) => {

    try {

        const { title, description, tag } = req.body;

        let updatedNote = {};

        // Check either field is updated or not by user
        if (title) { updatedNote.title = title };
        if (description) { updatedNote.description = description };
        if (tag) { updatedNote.tag = tag };


        // Find Note to be Updated and Update
        let note = await Note.findById(req.params.id);

        if (!note) {
            // 404 Not Found Error
            return res.status(404).json({ error: "Note not found!" });
        }

        // Checking User is authorized or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Unauthorized Access!" });
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: updatedNote},{new: true});
        res.json({ note });



    } catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error');
    }



});



//@route    DELETE api/notes/deletenote
//@desc     Delete a Note
//@access   private
router.delete('/deletenote/:id', auth, async (req, res) => {

    // Find Note to be Deleted and Delete
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).json({ error: "Note not found" }) };


     // Authenticating Logged In User   
    if (note.user.toString()!== req.user.id) {
        return res.status(401).json({ error: "Unauthorized Access!" });
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted successfully" });

});



module.exports = router;