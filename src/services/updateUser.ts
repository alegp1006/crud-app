import { URL_API } from "../constants/url";
import type { MockUser } from "../hooks/useUpdateUser";

export async function upadteUserById(userData: MockUser) {
  try {
    const response = await fetch(`${URL_API}/posts/1`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        contentType: "application/json; charset=UTF-8",
      },
    });
    return response;
  } catch (err) {
    throw new Error("error to create user", { cause: err });
  }
}
