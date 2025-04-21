import validateDataPost from "@/apis/cookies/helpers/validate";
import { slug } from "@/helpers/string";
import moment from "moment";
import { NextRequest } from "next/server";
import response from "../helpers/response";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const cookies = body?.cookies;
  if (cookies && Array.isArray(cookies)) {
    if (!cookies.length) {
      return response({
        status: 400,
        errors: {
          cookies: "Cookies không được để trống",
        },
      });
    } else {
      const validate = cookies.map((cookie) => validateDataPost(cookie));
      if (validate.some((error) => error.status >= 400)) {
        return response({
          status: 400,
          errors: {
            cookies: "Dữ liệu không hợp lệ ở index thứ: " + validate.findIndex((error) => error.status >= 400),
          },
        });
      } else {
        const res = response({
          status: validate[0].status,
          message: validate[0].message,
          data: cookies,
        });
        cookies.forEach((cookie) => {
          res.cookies.set(slug(cookie.name), cookie.value, {
            // maxAge: moment(cookie.expire).diff(Date.now(), "milliseconds"),
            expires: moment(cookie.expire).toDate(),
            sameSite: "strict",
            priority: "high",
            httpOnly: false, //todo
            secure: false, //todo
            // todo: set domain for sub domain
          });
        });
        return res;
      }
    }
  }

  const { name, value, expire } = body;
  const validate = validateDataPost({ name, value, expire });
  if (validate.status >= 400) {
    return response({
      status: 400,
      errors: validate,
    });
  } else {
    const res = response({
      status: validate.status,
      message: validate.message,
      data: {
        name,
        value,
        expire,
      },
    });
    res.cookies.set(slug(name), value, {
      expires: moment(expire).toDate(),
      sameSite: "strict",
      priority: "high",
      httpOnly: false, //todo
      secure: false, //todo
      // todo: set domain for sub domain
    });
    return res;
  }
}
