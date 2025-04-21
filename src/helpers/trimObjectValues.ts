export function trimObjectValues(obj: { [key: string]: any }): { [key: string]: any } {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === "string") {
      obj[key] = value.trim();
    } else if (typeof value === "object" && value !== null) {
      // Nếu giá trị là một object, gọi đệ quy để trim các giá trị bên trong
      trimObjectValues(value);
    }
  });
  return obj;
}
