import Note from '~/models/Note';

export async function getNotes() {
  const notes = await Note.find();
  return notes;
}

export async function getNote(_id) {
  const note = await Note.findOne({ _id }).exec();
  return note;
}

export async function createPost(note) {
  const newNote = await Note.create(note);
  return newNote;
}

export async function updatePost(note) {
  const updatedPost = await Note.findOneAndUpdate(
    { slug: note.slug },
    note
  ).exec();
  return updatedPost;
}
