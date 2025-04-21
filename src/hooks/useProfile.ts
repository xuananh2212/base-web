"use client";

import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const useProfile = () => {
  const token = Cookies.get("access_token") as any;
  if (!token) return null;
  return getPayloadJwt(token);
};

export default useProfile;

export const getPayloadJwt = (token: string) => {
  try {
    const decoded = jwt.decode(token, { complete: true });
    return decoded?.payload as any;
  } catch (e) {
    return null;
  }
};
