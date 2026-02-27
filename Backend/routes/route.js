const express = require("express");
const router = express.Router();

const {
    add_note,
    get_note,
    get_all_note,
    update_note,
    delete_note
} = require("../controllers/noteController");

// Add Note
router.post("/addnote", add_note);

// Get Single Note
router.get("/getnote/:_id", get_note);

// Get All Notes
router.get("/getallnote", get_all_note);

// Update Note
router.put("/update_note", update_note);

// Delete Note
router.delete("/delete_note/:_id", delete_note);

module.exports = router;