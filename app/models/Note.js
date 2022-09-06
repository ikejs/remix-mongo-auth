import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
});

export default mongoose.models.Note || mongoose.model('Note', noteSchema);
