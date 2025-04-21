import { FILE_SIZE_LIMIT } from "@/configs/upload.config";
import { toast } from "sonner";

export const validateFile = (file: any, size = FILE_SIZE_LIMIT) => {
  const isExcel =
    file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.type === "application/vnd.ms-excel" ||
    file.name.endsWith(".xls") ||
    file.name.endsWith(".xlsx") ||
    file.name.endsWith(".xlsb") ||
    file.name.endsWith(".xlsm");
  if (!isExcel) {
    toast.error("Chỉ hỗ trợ file có định dạng Excel!");
  }
  const isLt20M = file.size / 1024 / 1024 < size;
  if (!isLt20M) {
    toast.error(`File phải có dung lượng dưới ${size}MB!`);
  }
  return isExcel && isLt20M;
};
