export const getSubdomain = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0];
    return subdomain;
  }
  return "";
};
