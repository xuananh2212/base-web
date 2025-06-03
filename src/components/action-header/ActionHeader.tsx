"use client";
import { Button, Dropdown } from "antd";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QuizResultModal from "./QuizResultModal";
const ACCESS_TOKEN = "aa29f44dfaf7bcca15d1dceddec343c66bc38924efe1cab7ebc9be6752f60192";
const REFRESH_TOKEN = "4330c60cef9f82ca0dcbf0485eb0e0cef7bcf79af8d965203c3464ef0479a93a";
const ActionHeader = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      const payload: any = jwt.decode(token, ACCESS_TOKEN as any);
      setUser({
        id: payload?.id,
        avatar: payload?.avatar,
        email: payload?.email,
        fullname: payload?.fullname,
      });
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogOut = async () => {
    try {
      const token = Cookies.get("token");
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      router.push("/login");
    } catch (e) {}
  };
  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center w-[200px]">
          <div className="relative flex p-[3px] items-center justify-center cursor-pointer rounded-full bg-gradient-to-r from-[#ffd900] to-[#b45264] w-[50px] h-[50px]">
            <div className="w-[44px] h-[44px] rounded-full bg-white text-[#b45264] text-[20px] font-bold uppercase flex items-center justify-center">
              {user?.fullname?.charAt(0) || ""}
            </div>
          </div>
          <div className="ml-3">
            <span className="text-[#292929] text-[16px] font-semibold">{user?.fullname || ""}</span>
          </div>
        </div>
      ),
    },
    // {
    //   key: "2",
    //   label: (
    //     <>
    //       <div className="my-2">
    //         <hr className="border-t border-solid border-[#0000000d]" />
    //       </div>
    //     </>
    //   ),
    //   disabled: true,
    // },
    // {
    //   key: "3",
    //   label: (
    //     <>
    //       <div>
    //         <Link className="block text-[14px] py-[10px] text-[#666] cursor-pointer hover:text-[#000] " href={"#"}>
    //           Trang cá nhân
    //         </Link>
    //       </div>
    //     </>
    //   ),
    // },
    {
      key: "4",
      label: (
        <div
          onClick={() => setShowResultModal(true)}
          className="block text-[14px] py-[10px] text-[#666] cursor-pointer hover:text-[#000]"
        >
          Xem kết quả học tập
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <div className="my-2">
          <hr className="border-t border-solid border-[#0000000d]" />
        </div>
      ),
      disabled: true,
    },
    {
      key: "7",
      label: (
        <div>
          <span
            onClick={handleLogOut}
            className="block bg-[transparent] text-[14px] py-[10px] text-[#666] cursor-pointer hover:text-[#000] "
          >
            Đăng Xuất
          </span>
        </div>
      ),
    },
  ];

  return !isLoggedIn ? (
    <div className="flex gap-2">
      <Link href="/login">
        <Button className="px-4 py-2 rounded border border-color-500 text-color-500 hover:bg-color-500 hover:text-white transition">
          Đăng nhập
        </Button>
      </Link>
      <Link href="/register">
        <Button className="px-4 py-2 rounded bg-color-600 text-white hover:bg-color-600 transition">Đăng ký</Button>
      </Link>
    </div>
  ) : (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <div className="relative flex p-[3px] items-center justify-center cursor-pointer rounded-full bg-gradient-to-r from-[#ffd900] to-[#b45264] w-[36px] h-[36px]">
          <button className="w-[30px] h-[30px] relative flex items-center justify-center rounded-full overflow-hidden bg-white">
            <span className="text-[14px] font-bold text-[#b45264] uppercase">{user?.fullname?.charAt(0) || ""}</span>
          </button>
        </div>
      </Dropdown>
      {showResultModal && (
        <QuizResultModal open={showResultModal} onClose={() => setShowResultModal(false)} userId={user?.id} />
      )}
    </>
  );
};

export default ActionHeader;
