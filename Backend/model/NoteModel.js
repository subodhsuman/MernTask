import mongoose from 'mongoose';
const { Schema } = mongoose;
const noteSchema  = new Schema({
    title: String,
    content: String,
  });

  const Note = mongoose.model('Note', noteSchema);
  export default Note;
