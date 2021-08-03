import { ActionType, createAction, createReducer } from "typesafe-actions";
import { BedType } from "../types/room";
import produce from "immer";

export type RegisterRoomType = "entire" | "private" | "public";
export type BathroomType = "private" | "public" | null;
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
  bathroomCount: number;
  bathroomType: BathroomType;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  longitude: number;
  latitude: number;
  amenities: string[];
  conveniences: string[];
  photos: string[];
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
  bathroomCount: 1,
  bathroomType: null,
  country: "",
  city: "",
  district: "",
  streetAddress: "",
  detailAddress: "",
  postcode: "",
  longitude: 0,
  latitude: 0,
  amenities: [],
  conveniences: [],
  photos: [],
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
const SET_BATHROOM_COUNT = "register.room/SET_BATHROOM_COUNT";
const SET_BATHROOM_TYPE = "register.room/SET_BATHROOM_TYPE";
const SET_COUNTRY = "register.room/SET_COUNTRY";
const SET_CITY = "register.room/SET_CITY";
const SET_DISTRICT = "register.room/SET_DISTRICT";
const SET_STREET_ADDRESS = "register.room/SET_STREET_ADDRESS";
const SET_DETAIL_ADDRESS = "register.room/SET_DETAIL_ADDRESS";
const SET_POSTCODE = "register.room/SET_POST_CODE";
const SET_LATITUDE = "register.room/SET_LATITUDE";
const SET_LONGITUDE = "register.room/SET_LONGITUDE";
const SET_AMENITIES = "register.room/SET_AMENITIES";
const SET_CONVENIENCES = "register.room/SET_CONVENIENCES";
const SET_PHOTOS = "register.room/SET_PHOTOS";

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

export const setBathroomCount = createAction(
  SET_BATHROOM_COUNT,
  (count: number) => count
)();
export const setBathroomType = createAction(
  SET_BATHROOM_TYPE,
  (type: BathroomType) => type
)();

export const setCountry = createAction(
  SET_COUNTRY,
  (payload: string) => payload
)();
export const setCity = createAction(SET_CITY, (payload: string) => payload)();
export const setDistrict = createAction(
  SET_DISTRICT,
  (payload: string) => payload
)();
export const setStreetAddress = createAction(
  SET_STREET_ADDRESS,
  (payload: string) => payload
)();
export const setDetailAddress = createAction(
  SET_DETAIL_ADDRESS,
  (payload: string) => payload
)();
export const setPostcode = createAction(
  SET_POSTCODE,
  (payload: string) => payload
)();
export const setLongitude = createAction(
  SET_LONGITUDE,
  (payload: number) => payload
)();
export const setLatitude = createAction(
  SET_LATITUDE,
  (payload: number) => payload
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

export const setAmenities = createAction(
  SET_AMENITIES,
  (payload: string[]) => payload
)();
export const setConveniences = createAction(
  SET_CONVENIENCES,
  (payload: string[]) => payload
)();
export const setPhotos = createAction(
  SET_PHOTOS,
  (payload: string[]) => payload
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
  setBathroomCount,
  setBathroomType,
  setCountry,
  setCity,
  setDistrict,
  setStreetAddress,
  setDetailAddress,
  setPostcode,
  setLongitude,
  setLatitude,
  setAmenities,
  setConveniences,
  setPhotos,
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
    [SET_BATHROOM_COUNT]: (state, { payload }) => ({
      ...state,
      bathroomCount: payload,
    }),
    [SET_BATHROOM_TYPE]: (state, { payload }) => ({
      ...state,
      bathroomType: payload,
    }),
    [SET_COUNTRY]: (state, { payload }) => ({ ...state, country: payload }),
    [SET_CITY]: (state, { payload }) => ({ ...state, city: payload }),
    [SET_DISTRICT]: (state, { payload }) => ({ ...state, district: payload }),
    [SET_STREET_ADDRESS]: (state, { payload }) => ({
      ...state,
      streetAddress: payload,
    }),
    [SET_DETAIL_ADDRESS]: (state, { payload }) => ({
      ...state,
      detailAddress: payload,
    }),
    [SET_POSTCODE]: (state, { payload }) => ({ ...state, postcode: payload }),
    [SET_LATITUDE]: (state, { payload }) => ({ ...state, latitude: payload }),
    [SET_LONGITUDE]: (state, { payload }) => ({ ...state, longitude: payload }),
    [SET_AMENITIES]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.amenities = payload;
      }),
    [SET_CONVENIENCES]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.conveniences = payload;
      }),
    [SET_PHOTOS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.photos = payload;
      }),
  }
);

export default registerRoom;
