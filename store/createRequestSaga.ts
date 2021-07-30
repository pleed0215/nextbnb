import { call, put } from "redux-saga/effects";
import { PayloadAction } from "typesafe-actions";
import { startLoading, finishLoading } from "./loading";

export const createRequestActionTypes = (type: string) => [
  type,
  `${type}_SUCCESS`,
  `${type}_FAILURE`,
];

export default function createRequestSaga<TRequestFn, TPayload = any>(
  type: string,
  request: TRequestFn
) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action: PayloadAction<typeof type, TPayload>) {
    yield put(startLoading(type));
    try {
      // @ts-ignore
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
