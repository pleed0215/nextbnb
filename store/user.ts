import { ActionType, createAction, createReducer } from "typesafe-actions";
import { UserState } from "../types/redux.state";
import { UserType } from "../types/user";

// initial state
const initialState: UserState = {
  id: 0,
  email: "",
  lastname: "",
  firstname: "",
  birthday: "",
  isLogged: false,
  profileImage: "",
};

// actions
const SET_LOGGED_USER = "user/SET_LOGGED_USER";
export const setLoggedUser = createAction(
  SET_LOGGED_USER,
  (user: UserType) => user
)();

const actions = { setLoggedUser };

type UserAction = ActionType<typeof actions>;

const user = createReducer<UserState, UserAction>(initialState, {
  [SET_LOGGED_USER]: (state, action) => ({ ...action.payload, isLogged: true }),
});
export default user;
