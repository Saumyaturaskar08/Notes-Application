const express = require("express");
const router = express.Router();

const {
    add_note,
    get_note,
    get_all_note,
    update_note,
    delete_note
} = require("../controllers/noteController");

const {
    register,
    login
} = require("../controllers/authController");

const auth = require("../middleware/auth");


// ---------- AUTH ----------
router.post("/addnote", auth, add_note);

router.get("/getallnote", auth, get_all_note);

router.put("/updatenote", auth, update_note);

router.delete("/deletenote/:_id", auth, delete_note);


// Register
router.post("/register", register);

// Login
router.post("/login", login);


// ---------- NOTES ----------

// Add Note
router.post("/addnote", add_note);

// Get Single Note
router.get("/getnote/:_id", get_note);

// Get All Notes
router.get("/getallnote", get_all_note);

// Update Note
router.put("/updatenote", update_note);

// Delete Note
router.delete("/deletenote/:_id", delete_note);


module.exports = router;