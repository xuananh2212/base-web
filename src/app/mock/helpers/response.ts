import { NextResponse } from "next/server";

export function statusRes(status: number): string {
  const statusMessages: { [key: number]: string } = {
    // Thành công
    200: "Thành công",
    201: "Đã tạo",

    // Chuyển hướng
    301: "Đã chuyển vĩnh viễn",
    302: "Tìm thấy",

    // Lỗi Client
    400: "Yêu cầu không hợp lệ",
    401: "Chưa xác thực",
    403: "Bị cấm truy cập",
    404: "Không tìm thấy",
    405: "Phương thức không được cho phép",
    408: "Yêu cầu timeout",
    429: "Yêu cầu quá nhiều",

    // Lỗi Server
    500: "Có lỗi xảy tra vui lòng thử lại sau",
    501: "Chưa được thực hiện",
    503: "Dịch vụ không khả dụng",
    504: "Hết giờ hành chính!",
  };

  return statusMessages[status] || "Lỗi không xác định";
}

function response(
  body: {
    status: number;
    statusCode?: number;
    message?: string;
    errors?: {
      [key: string]: any;
    };
    data?: {
      [key: string]: any;
    };
  },
  init?: ResponseInit | object
) {
  if (!body.message) {
    body.message = statusRes(body.status);
  }

  if (body.status >= 400) {
    if (body.message && !body.errors)
      body.errors = {
        message: body.message,
      };
    else
      body.errors = {
        message: "Lỗi không xác định",
        ...body.errors,
      };
  }

  body.statusCode = body.status;

  init = Object.assign({ status: body.status }, init);
  return NextResponse.json(body, init);
}

export default response;
