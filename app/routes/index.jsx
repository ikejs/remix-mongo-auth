import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <>
      <h1 className="text-3xl font-bold">
        Remix + MongoDB + Auth + Tailwind
      </h1>
      <ul>
        <li>
          <Link to="/notes" className="text-blue-500">View Notes</Link>
        </li>
      </ul>
    </>
  );
}
