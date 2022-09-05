import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getNote } from "~/services/note.server";

export const loader = async ({ params }) => {
  const note = await getNote(params._id);
  return json(note);
};

export default function Note() {
  const note = useLoaderData();
  return (
    <>
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p>{note.body}</p>
      <div dangerouslySetInnerHTML={{ __html: note.html }} />
    </>
  );
}
