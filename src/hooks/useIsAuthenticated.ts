import useProfile from "./useProfile";

const useIsAuthenticated = () => {
  const profile = useProfile();
  return !!profile;
};

export default useIsAuthenticated;
