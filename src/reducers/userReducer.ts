import type { UserAction } from "../context/users";
import type { User } from "../models/users";

export const initialState = [];

export function userReducer(state: User[], action: UserAction) {
  switch (action.type) {
    case "ADD_USER": {
      return [
        ...state,
        {
          userID: action.user.userID,
          name: action.user.name,
          github: action.user.github,
          gmail: action.user.gmail,
        },
      ];
    }

    case "UPDATE_USER": {
      return state.map((u: User) => {
        if (u.userID === action.user.userID) {
          return {
            userID: action.user.userID,
            name: action.user.name,
            github: action.user.github,
            gmail: action.user.gmail,
          };
        } else {
          return u;
        }
      });
    }

    case "DELETE_USER": {
      return state.filter((u: User) => {
        return u.userID !== action.userID;
      });
    }

    default:
      return state;
  }
}
