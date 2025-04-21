import { axiosInstance } from "@/configs/axios.config";
import { API } from "@/configs/env.config";

class UploadService {
  static upload(files: any) {
    return axiosInstance.post("upload", null, {
      baseURL: API,
    });
  }
  static uploadImage(file: any) {
    return axiosInstance.post("/upload/v1/image", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      allowSpacing: true,
      baseURL: API,
    });
  }
  static uploadFileVideo(file: any) {
    return axiosInstance.post("/upload/v1", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      allowSpacing: true,
      baseURL: API,
    });
  }
  static uploadFileVideoV2(file: any) {
    return axiosInstance.post("/upload/v2", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      allowSpacing: true,
      baseURL: API,
    });
  }
  static uploadTemp(file: any) {
    return axiosInstance.post("file/upload-temp", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      allowSpacing: true,
      baseURL: API,
    });
  }
}

export default UploadService;
