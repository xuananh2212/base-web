export interface ParamsUtil {
  domain: string;
  nextUrl: { pathname: string; search: string };
  cookies: {
    get: (key: string) => {
      name: string;
      value: string;
    };
  };
}
