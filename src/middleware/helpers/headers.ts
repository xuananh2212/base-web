import { NextResponse } from "next/server";

export default function setResponseHeaders(
  response: NextResponse,
  headers: {
    pathname: string;
    search: string;
    [key: string]: string;
  }
) {
  (Object.keys(headers) as Array<keyof typeof headers>).forEach((key) => {
    response.headers.set(`x-${key}`, headers[key]);
  });
}
