function formatCurrency(amount: number | string | null, separator: string = "."): string {
  // Chuyển số thành chuỗi để xử lý
  if (!amount) {
    if (amount === 0) return "0";
    return "";
  }
  let amountStr = amount.toString().replace(".", ",");

  // Sử dụng biểu thức chính quy để thêm dấu phân cách hàng ngàn
  let regex = new RegExp("\\B(?=(\\d{3})+(?!\\d))", "g");
  let formattedAmount = amountStr.replace(regex, separator);

  return formattedAmount;
}

function parseCurrency(formattedAmount: string, separator: string = "."): number {
  // Tạo biểu thức chính quy để tìm và thay thế dấu phân cách
  let regex = new RegExp("\\" + separator, "g");

  // Loại bỏ tất cả các dấu phân cách khỏi chuỗi
  let amountStr = formattedAmount?.toString()?.replace(regex, "");

  // Chuyển chuỗi thành số
  let amount = parseInt(amountStr, 10);

  return amount;
}

const formatterMoney = (value: string | number | null): string => {
  if (!value) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const parserMoney = (value: any) => value.replace(/\./g, "");

export { formatterMoney, parserMoney, formatCurrency, parseCurrency };
