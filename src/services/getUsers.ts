import { URL_API } from "../constants/url";
import type { User } from "../models/usersService";

export async function getUsers() {
  try {
    const res = await fetch(`${URL_API}/users`);
    if (!res.ok) {
      throw new Error("error to get user" + res.status);
    }
    const users = await res.json();
    return users.map((u: User) => {
      return {
        userID: u.id,
        name: u.name,
        gmail: u.email,
        github: u.username,
      };
    });
  } catch (err) {
    throw new Error(`Error to fetch user`, { cause: err });
  }
}
