export enum LOCALE_STORAGE_KEYS {
  THEME = "theme",
  SAVE_ACCOUNT_INFO = "saf",
  TABLE_CONFIG = "table-config",
}
export const URL_IMAGE = "http://localhost:3000";

export enum TYPE_EXPORT {
  XLSX = "xlsx",
  PDF = "pdf",
}
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/gif", "image/svg+xml", "image/jpeg", "image/jpg", "image/png", "image/webp"];

export enum StatusAccount {
  InActive = "Ngưng sử dụng",
  Active = "Hoạt động",
  ValidateEmail = "Chờ",
  CreatePassword = "Chưa tạo mật khẩu",
}

export enum StatusAccountValue {
  InActive = "0",
  Active = "1",
  ValidateEmail = "2",
  CreatePassword = "3",
}

export const MONTH_OPTIONS = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
];

export const GENDER_OPTIONS = [
  {
    value: "male",
    label: "Nam",
  },
  {
    value: "female",
    label: "Nữ",
  },
];
