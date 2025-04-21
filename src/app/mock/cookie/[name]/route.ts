import { slug } from "@/helpers/string";
import { NextRequest } from "next/server";
import response from "../../helpers/response";

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const cookieList = req.cookies;

  try {
    const { name } = params;
    let errors = {};
    if (!name) {
      errors = Object.assign(errors, {
        name: "Tên không được để trống",
      });
    }
    if (Object.keys(errors).length) {
      return response({
        status: 400,
        errors,
      });
    }

    if (name === "all") {
      const allCookies = Object.keys(cookieList).reduce(
        (
          acc: {
            [key: string]: {
              name: string;
              value: string;
            };
          },
          cookieName
        ) => {
          acc[cookieName] = {
            name: cookieName,
            value: cookieList.get(cookieName)?.value || "",
          };
          return acc;
        },
        {}
      );
      return response({
        status: 200,
        message: "Lấy tất cả cookies thành công",
        data: allCookies,
      });
    } else {
      const cookieValue = cookieList.get(slug(name));
      if (!cookieValue?.value) {
        return response({
          status: 404,
          message: "Cookie không tồn tại",
        });
      }
      return response({
        status: 200,
        message: "Lấy cookie thành công",
        data: {
          [slug(name)]: cookieValue,
          name: slug(name),
          value: cookieValue.value,
        },
      });
    }
  } catch {
    return response({
      status: 400,
    });
  }
}
export async function PATCH(req: NextRequest, { params }: { params: { name: string } }) {
  const cookieList = req.cookies;

  try {
    const { name } = params;
    const body = await req.json();
    const { value: newValue } = body;
    if (!newValue) {
      return response({
        status: 400,
        message: "Giá trị mới cho cookie không được để trống",
        errors: {
          value: "Giá trị mới cho cookie không được để trống",
        },
      });
    }
    const existingCookie = cookieList.get(slug(name));
    if (!existingCookie) {
      return response({
        status: 404,
        message: "Cookie không tồn tại",
        errors: {
          name: "Key của cookie không tồn tại",
        },
      });
    }
    cookieList.set(slug(name), newValue);

    return response({
      status: 200,
      message: "Cập nhật cookie thành công",
      data: {
        [slug(name)]: newValue,
        name: slug(name),
        value: newValue.value,
      },
    });
  } catch (error) {
    return response({
      status: 400,
      message: "Có lỗi xảy ra trong quá trình cập nhật cookie",
    });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { name: string } }) {
  const cookieList = req.cookies;

  try {
    const { name } = params;
    let errors = {};
    if (!name)
      errors = Object.assign(errors, {
        names: "Tên không được để trống",
      });
    if (Object.keys(errors).length) {
      return response({
        status: 400,
        errors,
      });
    }
    const res = response({
      status: 200,
      message: name === "all" ? "Xóa tất cả cookies thành công" : "Xóa cookie thành công",
      data:
        name === "all"
          ? Object.keys(cookieList).map((name: string) => cookieList.get(slug(name)))
          : cookieList.get(slug(name)),
    });
    if (name === "all") {
      Object.keys(cookieList).forEach((name: string) => {
        res.cookies.delete(name);
      });
    } else {
      if (cookieList.has(slug(name))) {
        res.cookies.delete(slug(name));
      }
    }

    return res;
  } catch {
    return response({
      status: 400,
    });
  }
}
