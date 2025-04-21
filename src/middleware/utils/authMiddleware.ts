import { getPayloadJwt } from "@/hooks/useProfile";
import { AUTH_ROUTES } from "@/middleware";
import { ParamsUtil } from "../interface/paramsUtils.types";
import { ReturnedUtil } from "../interface/returnedUtils.types";

export default async function authMiddleware({ nextUrl, cookies, domain }: ParamsUtil): Promise<ReturnedUtil> {
  const { pathname, search } = nextUrl;

  // Check if the current route is an authentication-related route
  const isAuthRoute = pathname === "/" || AUTH_ROUTES.some((route) => pathname === route);

  const searchParams = new URLSearchParams(search);
  const searchMap = new Map(searchParams.entries());

  // Get tokens from cookies
  const accessToken = cookies.get("access_token");
  const refreshToken = cookies.get("refresh_token");

  // Extract the subdomain from the JWT payload
  const subDomain = getPayloadJwt(accessToken.value)?.domain || "app";
  console.log("subDomain", subDomain);

  // If no tokens are present, redirect to login for non-auth routes
  if (!accessToken?.value && !refreshToken?.value) {
    if (isAuthRoute) {
      return {
        action: "next",
        domain: domain,
      };
    }
    return {
      domain: domain,
      action: "redirect",
      path: "/login?session=1&next=" + pathname,
    };
  }

  // Set the default action to proceed to the requested route
  let action: { action: ReturnedUtil["action"]; path: string; domain: string } = {
    action: "next",
    path: pathname,
    domain: domain.startsWith("localhost") ? domain : [subDomain, ...domain.split(".")].join("."),
  };

  // If on an authentication route, redirect to the dashboard or the specified next path
  if (isAuthRoute) {
    let nextPath = searchMap.get("next") || "/dashboard";
    const isNextPathAuthRoute = AUTH_ROUTES.some((pathname) => pathname === nextPath);
    if (isNextPathAuthRoute) {
      nextPath = "/dashboard";
    }
    return {
      action: "redirect",
      path: nextPath,
      domain: action?.domain,
    };
  }

  return action;
}
