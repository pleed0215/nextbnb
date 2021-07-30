import { ActionType, createAction, createReducer } from "typesafe-actions";

const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

export const startLoading = createAction(
  START_LOADING,
  (requestType: string) => requestType
)();
export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType: string) => requestType
)();
const initialState: any = {};

const actions = { startLoading, finishLoading };
type LoadingAction = ActionType<typeof actions>;
type LoadingState = typeof initialState;

const loading = createReducer<LoadingState, LoadingAction>(initialState, {
  [START_LOADING]: (state, action) => ({
    ...state,
    [action.payload]: true,
  }),
  [FINISH_LOADING]: (state, action) => ({
    ...state,
    [action.payload]: false,
  }),
});

export default loading;
