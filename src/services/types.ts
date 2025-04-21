export interface File {
  id?: string;
  filename?: string;
  length?: number;
  temp_filename?: string;
}

export interface BaseListResponse<T> {
  totalItems: number;
  pageSize: number;
  pageIndex: number;
  items: T[];
}

export interface IDefaultSearchParam {
  from_date?: string;
  to_date?: string;
  filters?: any;
  sort?: any;
  page_size?: number;
  page_index?: number;
  keyword?: string;
}
