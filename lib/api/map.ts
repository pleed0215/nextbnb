import axios from ".";

type GetLocationInput = {
  latitude: number;
  longitude: number;
};
type GetLocationResponse = {
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  streetAddress: string;
  postcode: string;
  district: string;
};

export const getLocationInfoAPI = async ({
  latitude,
  longitude,
}: GetLocationInput) =>
  axios.get<GetLocationResponse>(
    `/api/map/location?latitude=${latitude}&longitude=${longitude}`
  );
