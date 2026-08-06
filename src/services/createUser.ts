import { URL_API } from "../constants/url";
import type { MockCreateUser } from "../hooks/useCreateUser";

export async function createUser(userData: MockCreateUser) {
  try {
    const response = await fetch(`${URL_API}/posts`, {
      method: "POST",
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
