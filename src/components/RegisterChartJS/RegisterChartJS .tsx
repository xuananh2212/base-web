"use client";
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale } from "chart.js";
import { useEffect } from "react";

const RegisterChartJS = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Chỉ chạy trên client-side
      ChartJS.register(CategoryScale, LinearScale, BarElement);
    }
  }, []);

  return null; // Component này chỉ đăng ký các thành phần ChartJS
};

export default RegisterChartJS;
