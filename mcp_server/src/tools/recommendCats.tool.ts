import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const getBackendApiUrl = (): string => {
  const url = process.env.BACKEND_API_URL || "https://backend-1b2o.onrender.com/api";
  return url.replace(/\/$/, "");
};

export const recommendCatsTool = async (
  kidsFriendly: boolean,
  apartmentFriendly: boolean
) => {
  const baseUrl = getBackendApiUrl();
  const res = await axios.post(`${baseUrl}/cats/recommend`, {
    kidsFriendly,
    apartmentFriendly,
  });

  return res.data;
};

export const getAllCatsTool = async () => {
  const baseUrl = getBackendApiUrl();
  const res = await axios.get(`${baseUrl}/cats`);

  return res.data;
};