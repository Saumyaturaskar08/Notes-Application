const Note = require("../model/Note");

// Add Note
let add_note = async (req, res) => {

  try {

    let note = new Note({
      title: req.body.title,
      content: req.body.content,
      userId: req.userId,
    });

    await note.save();

    res.json({ msg: "Added" });

  } catch {
    res.json({ msg: "Error" });
  }

};

// Get Single Note
let get_note = async (req, res) => {
    try {
        let data = await Note.findById(req.params._id);

        if (!data) {
            return res.json({ "msg": "Note not found." });
        }

        res.json({ "data": data });

    } catch (err) {
        res.json({ "msg": "Error in fetching note." });
    }
};

// Get All Notes
let get_all_note = async (req, res) => {

  try {

    let data = await Note.find({
      userId: req.userId,
    });

    res.json({ data });

  } catch {
    res.json({ msg: "Error" });
  }

};

// Update Note
let update_note = async (req, res) => {
    try {
        let data = await Note.findById(req.body._id);

        if (!data) {
            return res.json({ "msg": "Note not found." });
        }

        data.title = req.body.title || data.title;
        data.content = req.body.content || data.content;

        await data.save();

        res.json({ "msg": "Note updated successfully." });

    } catch (err) {
        res.json({ "msg": "Error in updating note." });
    }
};

// Delete Note
let delete_note = async (req, res) => {
    try {
        let data = await Note.findByIdAndDelete(req.params._id);

        if (!data) {
            return res.json({ "msg": "Note not found." });
        }

        res.json({ "msg": "Note deleted successfully." });

    } catch (err) {
        res.json({ "msg": "Error in deleting note." });
    }
};

module.exports = {
    add_note,
    get_note,
    get_all_note,
    update_note,
    delete_note
};