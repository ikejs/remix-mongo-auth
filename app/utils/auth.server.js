import bcrypt from "bcryptjs";
import { json, createCookieSessionStorage, redirect } from "@remix-run/node";
import { createUser, getUser } from "~/services/user.server";

const storage = createCookieSessionStorage({
  cookie: {
    name: "app-session",
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
});

export const register = async (form) => {
  const exists = await getUser({ email: form.email });
  if(exists) {
    return json({ error: "An account with that email address already exists."}, { status: 400 });
  }

  const newUser = await createUser(form);
  if(!newUser) {
    return json(
      {
        error: "Something went wrong trying to create a new user",
        fields: { email: form.email, password: form.password }
      },
      {
        status: 400
      }
    )
  }

  return createUserSession(newUser._id, "/");
}

export const login = async (form, redirectTo) => {
  const user = await getUser({ email: form.email });

  if(!user || !(await bcrypt.compare(form.password, user.password))) {
    return json({ error: "Incorrect email/password" }, { status: 400 });
  }
  
  return createUserSession(user._id, redirectTo);
}

export const createUserSession = async (
  userId,
  redirectTo
) => {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    }
  });
}

export async function requireAuth(
  request,
  redirectTo = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if(!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }

  return userId;
}

function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}

async function getUserIdFromSession(request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if(!userId || typeof userId !== "string") return null;
  return userId;
}

export async function getUserFromSession(request) {
  const _id = await getUserIdFromSession(request);
  if(typeof _id !== "string") {
    return null;
  }

  try {
    const user = await getUser({ _id });
    return user;
  } catch (error) {
    console.log(error);
    throw logout(request);
  }
}

export async function logout(request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
}