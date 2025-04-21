import Cookies from "js-cookie"; // Import js-cookie
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();

  return async () => {
    // Xóa các cookie "access_token" và "refresh_token"
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

    // Điều hướng về trang chủ
    router.push("/");
  };
};

export default useLogout;
