export type ActionTypes = "redirect" | "next";

export interface ReturnedUtil {
  domain: string;
  action: ActionTypes;
  cookies?: {
    name: string;
    value: string;
    expire?: number | string;
  }[];
  path?: string;
}
