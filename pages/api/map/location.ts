import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      res.statusCode = 400;
      return res.send("위치 정보가 없습니다.");
    }
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
      const { data } = await axios.get(url);
      const address = data.results[0].address_components;
      const { lat, lng } = data.results[0].geometry.location;
      const result = {
        latitude: lat,
        longitude: lng,
        country: address[4].long_name,
        city: address[3].long_name,
        district: address[2].long_name,
        streetAddress: `${address[1].long_name} ${address[0].long_name}`,
        postcode: address[5].long_name,
      };
      res.statusCode = 200;
      return res.send(result);
    } catch (e) {
      res.statusCode = 404;
      return res.send(e);
    }
  }
  res.statusCode = 405;
  return res.end();
};

export default api;
