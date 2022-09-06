import { Form } from "@remix-run/react";
import { register } from "~/utils/auth.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  return register({ email, name, password });
}

export default function SignUp() {
  return (
    <div className="flex justify-center items-center py-4 min-h-max">
      <main className="border rounded border-zinc-300 min-h-96 lg:w-5/12 md:w-6/12 w-10/12 p-2">
        <div className="text-center text-2xl my-2">Sign Up</div>
        <Form method="post">
          <div className="inp mb-2">
            <label htmlFor="name" className="block mb-2">Full Name</label>
            <input type="text" name="name" placeholder="John Doe" className="w-full border outline-none border-zinc-400 p-1 rounded" />
          </div>
          <div className="inp mb-2">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input type="email" name="email" placeholder="johndoe@example.com" className="w-full border outline-none border-zinc-400 p-1 rounded" />
          </div>
          <div className="inp mb-2">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input type="password" name="password"  placeholder="************" className="w-full border outline-none border-zinc-400 p-1 rounded" />
          </div>
          <div className="inp">
            <label htmlFor="confirm" className="block mb-2">Confirm Password</label>
            <input type="password" name="password"  placeholder="**************" className="w-full border outline-none border-zinc-400 p-1 rounded" />
          </div>
          <button type="submit" className="bg-black rounded text-white p-2 w-full mt-2 block">Submit</button>
        </Form>
      </main>
    </div>
  );
}