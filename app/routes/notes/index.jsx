import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { requireAuth } from '~/utils/auth.server';
import { getNotes } from '~/services/note.server';

export const loader = async ({ request }) => {
  await requireAuth(request);
  return json(await getNotes());
};

export default function Notes() {
  const notes = useLoaderData();
  return (
    <div className="flex flex-col">
      {!notes.length && <p>no notes yet</p>}
      {notes.map((note) => (
        <div className="m-4 p-4 bg-slate-300 rounded-lg" key={note._id}>
          <Link to={note._id}>
            <h1 className="text-blue-500 text-1xl font-bold">{note.title}</h1>
          </Link>
          <p>{note.body}</p>
        </div>
      ))}
    </div>
  );
}
