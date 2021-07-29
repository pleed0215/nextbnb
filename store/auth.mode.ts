import { ActionType, createAction, createReducer } from "typesafe-actions";

const SET_AUTH_MODE = "auth/SET_AUTH_MODE";

type AuthMode = "signup" | "login";

export const setAuthMode = createAction(
  SET_AUTH_MODE,
  (mode: AuthMode) => mode
)();
const actions = { setAuthMode };

type AuthModeAction = ActionType<typeof actions>;
type AuthModeState = {
  authMode: AuthMode;
};

const initialState: AuthModeState = {
  authMode: "signup",
};

const authMode = createReducer<AuthModeState, AuthModeAction>(initialState, {
  [SET_AUTH_MODE]: (state, action) => ({ ...state, authMode: action.payload }),
});

export default authMode;
