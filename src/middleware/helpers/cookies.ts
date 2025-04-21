import dateToTime from "@/helpers/date";
import { slug } from "@/helpers/string";
import { NextRequest, NextResponse } from "next/server";
import { ParamsUtil } from "../interface/paramsUtils.types";

export default function middlewareCookies(request: NextRequest): ParamsUtil["cookies"] {
  function getCookies(key: string): { name: string; value: string } {
    const name = slug(key);
    const value = request.cookies.get(name)?.value || "";
    return {
      name,
      value,
    };
  }

  return {
    get: getCookies,
  };
}

export function manageCookies(
  response: NextResponse,
  cookies: Array<{ name: string; value: string; expire?: string | number }>
) {
  cookies.forEach(({ name, value, expire }) => {
    if (!expire) expire = "1 year";
    if (typeof expire === "string") {
      expire = dateToTime(expire);
    }
    const expires = new Date(Date.now() + expire * 1000);
    response.cookies.set(slug(name), value, {
      expires,
    });
  });
  return response;
}
