var mongoose = require("mongoose");
// Create the schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the noteSchema with the schema object
var noteSchema = new Schema({
  // The headline is the article associated with the note
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  },
  date: {
    type: Date,
    default: Date.now
  },
  noteText: String
});

// Create the Note model using the noteSchema
var Note = mongoose.model("Note", noteSchema);

module.exports = Note;
