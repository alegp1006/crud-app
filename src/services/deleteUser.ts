import { URL_API } from "../constants/url";

export async function deleteUserById(id: string) {
  try {
    const response = await fetch(`${URL_API}/posts/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (err) {
    throw new Error("error to delete user", { cause: err });
  }
}
