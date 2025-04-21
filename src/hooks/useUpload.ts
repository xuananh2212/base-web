import UploadService from "@/services/upload/UploadService";
import { useMutation } from "@tanstack/react-query";

const useUpload = () => {
  return useMutation({
    mutationFn: (files: any[]) => {
      return UploadService.upload({});
    },
  });
};

export default useUpload;
