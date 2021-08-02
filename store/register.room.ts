import { ActionType, createAction, createReducer } from "typesafe-actions";
import { BedType } from "../types/room";
import produce from "immer";

export type RegisterRoomType = "entire" | "private" | "public";
type BedsType = {
  type: BedType;
  count: number;
};
export type BedListType = {
  id: number;
  beds: BedsType[];
};
type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: RegisterRoomType | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: BedListType[];
  publicBedList: BedsType[];
};

const initialState: RegisterRoomState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isSetUpForGuest: null,
  maximumGuestCount: 1,
  bedroomCount: 0,
  bedCount: 1,
  bedList: [],
  publicBedList: [],
};

const SET_LARGE_BUILDING_TYPE = "register.room/SET_LARGE_BUILDING_TYPE";
const SET_BUILDING_TYPE = "register.room/SET_BUILDING_TYPE";
const SET_ROOM_TYPE = "register.room/SET_ROOM_TYPE";
const SET_IS_SETUP_FOR_GUEST = "register.room/SET_IS_SETUP_FOR_GUEST";
const SET_MAXIMUM_GUEST_COUNT = "register.room/SET_MAXIMUM_GUEST_COUNT";
const SET_BEDROOM_COUNT = "register.room/SET_BEDROOM_COUNT";
const SET_BED_COUNT = "register.room/SET_BED_COUNT";
const SET_BED_TYPE_COUNT = "register.room/SET_BED_TYPE_COUNT";
const SET_PUBLIC_BED_TYPE_COUNT = "register.room/SET_PUBLIC_BED_TYPE_COUNT";

export const setLargeBuildingType = createAction(
  SET_LARGE_BUILDING_TYPE,
  (type: string) => type
)();
export const setBuildingType = createAction(
  SET_BUILDING_TYPE,
  (type: string) => type
)();

export const setRoomType = createAction(
  SET_ROOM_TYPE,
  (type: RegisterRoomType) => type
)();

export const setIsSetupForGuest = createAction(
  SET_IS_SETUP_FOR_GUEST,
  (value: boolean) => value
)();
export const setMaximumGuestCount = createAction(
  SET_MAXIMUM_GUEST_COUNT,
  (count: number) => count
)();

export const setBedroomCount = createAction(
  SET_BEDROOM_COUNT,
  (count: number) => count
)();

export const setBedCount = createAction(
  SET_BED_COUNT,
  (count: number) => count
)();

type BedTypeCountInput = { id: number; type: BedType; count: number };
export const setBedTypeCount = createAction(
  SET_BED_TYPE_COUNT,
  (input: BedTypeCountInput) => input
)();

export const setPublicBedTypeCount = createAction(
  SET_PUBLIC_BED_TYPE_COUNT,
  (input: Omit<BedTypeCountInput, "id">) => input
)();

const actions = {
  setLargeBuildingType,
  setBuildingType,
  setRoomType,
  setIsSetupForGuest,
  setMaximumGuestCount,
  setBedroomCount,
  setBedCount,
  setBedTypeCount,
  setPublicBedTypeCount,
};
type RegisterRoomAction = ActionType<typeof actions>;

const registerRoom = createReducer<RegisterRoomState, RegisterRoomAction>(
  initialState,
  {
    [SET_LARGE_BUILDING_TYPE]: (state, action) => ({
      ...state,
      largeBuildingType: action.payload,
    }),
    [SET_BUILDING_TYPE]: (state, action) => ({
      ...state,
      buildingType: action.payload,
    }),
    [SET_ROOM_TYPE]: (state, { payload }) => ({ ...state, roomType: payload }),
    [SET_IS_SETUP_FOR_GUEST]: (state, { payload }) => ({
      ...state,
      isSetUpForGuest: payload,
    }),
    [SET_MAXIMUM_GUEST_COUNT]: (state, { payload }) => ({
      ...state,
      maximumGuestCount: payload,
    }),
    [SET_BEDROOM_COUNT]: (state, { payload }) =>
      state.bedroomCount >= payload
        ? {
            ...state,
            bedroomCount: payload,
            bedList: state.bedList.slice(0, payload),
          }
        : {
            ...state,
            bedroomCount: payload,
            bedList: [
              ...state.bedList,
              ...Array.from(
                new Array(payload - state.bedroomCount),
                (_, i) => ({
                  id: state.bedList[state.bedroomCount - 1]
                    ? state.bedList[state.bedroomCount - 1].id + i + 1
                    : i + 1,
                  beds: [],
                })
              ),
            ],
          },
    [SET_BED_COUNT]: (state, { payload }) => ({ ...state, bedCount: payload }),
    [SET_BED_TYPE_COUNT]: (state, { payload }) =>
      produce(state, (draft) => {
        const { id, type, count } = payload;
        const bedroom = draft.bedList[id - 1];
        const prevBed = bedroom.beds;
        const index = prevBed.findIndex((bed) => bed.type === type);
        if (index === -1) {
          bedroom.beds = [...prevBed, { type, count }];
          return;
        }

        if (count === 0) {
          bedroom.beds.splice(index, 1);
        } else {
          bedroom.beds[index].count = count;
        }
      }),
    [SET_PUBLIC_BED_TYPE_COUNT]: (state, { payload }) =>
      produce(state, (draft) => {
        const { type, count } = payload;
        const bedroom = draft.publicBedList;
        const index = bedroom.findIndex((bed) => bed.type === type);
        if (index === -1) {
          draft.publicBedList = [...bedroom, { type, count }];

          return;
        }

        if (count === 0) {
          bedroom.splice(index, 1);
        } else {
          bedroom[index].count = count;
        }
      }),
  }
);

export default registerRoom;
