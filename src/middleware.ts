import { NextRequest, NextResponse } from "next/server";

// Define the list of authentication-related routes
export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/register-success",
  "/forgot-password",
  "/verify-email",
  "/reset-password",
];

// Middleware function to handle authentication and redirection
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // const { pathname } = request.nextUrl;

  // // Extract the domain from the request headers
  // const domain = request.headers.get("Host") || "";
  // // Determine if the current domain has a subdomain
  // const hasSubdomain = domain.split(".").length > 2;
  // const domainParts = domain.split(".");

  // // Remove the subdomain from the current domain if it exists
  // if (hasSubdomain) {
  //   domainParts.shift();
  // }
  // // Construct the base domain without the subdomain
  // const baseDomain = domainParts.join(".");

  // // Logic to check and delete tokens when accessing /verify-email
  // if (["/forgot-password", "/verify-email"].includes(pathname)) {
  //   response.cookies.set("access_token", "", { path: "/", domain: `.${baseDomain}`, maxAge: 0 });
  //   response.cookies.set("refresh_token", "", { path: "/", domain: `.${baseDomain}`, maxAge: 0 });
  //   return response;
  // }

  // // Check authentication and get action details
  // const actionCheckAuth = await authMiddleware({
  //   domain: baseDomain,
  //   nextUrl: request.nextUrl,
  //   cookies: middlewareCookies(request),
  // });

  // // Handle redirection if authentication action requires it
  // if (actionCheckAuth.action === "redirect") {
  //   const redirectResponse = NextResponse.redirect(new URL(actionCheckAuth.path || "/", request.url));

  //   // If domain is different, construct a new URL for redirection
  //   if (domain !== actionCheckAuth.domain && !domain.startsWith("localhost")) {
  //     const currentUrl = new URL(request.url);
  //     const newUrl = `${currentUrl.protocol}//${actionCheckAuth.domain}${actionCheckAuth.path}`;
  //     return NextResponse.redirect(newUrl);
  //   }

  //   return redirectResponse;
  // }

  // // Handle domain mismatch by redirecting to the new domain
  // if (domain !== actionCheckAuth.domain && !domain.startsWith("localhost")) {
  //   const currentUrl = new URL(request.url);
  //   const pathname = currentUrl.pathname;
  //   const search = currentUrl.search;
  //   const newUrl = `${currentUrl.protocol}//${actionCheckAuth.domain}${pathname}${search}`;
  //   return NextResponse.redirect(newUrl);
  // }

  // Return the default response if no redirection is required
  return response;
}

// Configure middleware to apply to all paths except specified exclusions
export const config = {
  matcher: ["/((?!api|mock|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)"],
};
