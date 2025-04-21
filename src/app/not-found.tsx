import Loading from "@/components/Loading";

export function generateMetadata({ status = 404 }) {
  return {
    title: {
      default: "Ôi, lỗi " + status,
    },
    description: "Xin lỗi, trang web này không tồn tại",
    openGraph: {
      title: {
        default: "Ôi, lỗi" + status,
      },
      description: "Xin lỗi, trang web này không tồn tại",
    },
    // metadataBase: new URL(HOST_URL as string),
  };
}

const NotFound = ({ status = 404 }) => {
  const message = status.toString() || "Đang xử lý...";
  const description = status === 404 ? "Xin lỗi, trang web này không tồn tại" : "Lỗi của chúng tôi, không phải của bạn";
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full min-h-[300px]">
      <Loading message={message} description={description} />
    </div>
  );
};

export default NotFound;
