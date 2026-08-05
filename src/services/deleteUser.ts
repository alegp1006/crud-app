import { URL_API } from "../constants/url";

export async function createUser(id: string) {
  try {
    const response = await fetch(`${URL_API}/posts/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (err) {
    throw new Error("error to create user", { cause: err });
  }
}
