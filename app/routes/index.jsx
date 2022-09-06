import { Link, useLoaderData } from '@remix-run/react';
import { getUserFromSession } from '~/utils/auth.server';

export const loader = async ({ request }) => await getUserFromSession(request);

export default function Index() {
  const user = useLoaderData();

  return (
    <>
      <h1 className="text-3xl font-bold">Remix + MongoDB + Auth + Tailwind</h1>
      {user && (
        <>
          <p>
            Signed in as <strong>{user.email}</strong>
            <small>
              <Link to="/logout" className="text-blue-500 ml-2">
                Logout
              </Link>
            </small>
          </p>
          <hr />
        </>
      )}
      <ul>
        {!user && (
          <>
            <li>
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-blue-500">
                Signup
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/notes" className="text-blue-500">
            View Notes
          </Link>
        </li>
      </ul>
    </>
  );
}
