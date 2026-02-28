// const mongoose = require("mongoose");

// const noteSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Note", noteSchema);

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

});

module.exports = mongoose.model("Note", noteSchema);