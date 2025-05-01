export interface Course {
  id: string;
  title: string;
  desc: string;
  thumb: string;
  status: number;
  price: number;
  amount_learn: number;
  discounted_price: number;
  slug: string;
  category_id: string;
  dicount_id: string; // Lưu ý: có thể bạn muốn sửa tên thành discountId (vì dicountId có thể là typo)
  type_course_id: string;
}
