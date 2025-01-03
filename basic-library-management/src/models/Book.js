const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  publishedYear: {
    type: Number,
  },
  genre: {
    type: String,
  },
});

module.exports = mongoose.model("Book", bookSchema);
