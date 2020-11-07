const mongoose = require("mongoose");

const Note = mongoose.model("Note", {
    content: { type: String, required: true },
    createdAt: { type: Date, default: new Date() }
});

module.exports = Note;
