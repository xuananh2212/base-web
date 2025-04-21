"use client";

import useApplicationStore from "@/stores/application/application.store";
import { ThemeType } from "@/stores/application/types";
import type { RefSelectProps } from "antd";
import { Select } from "antd";
import { useRef, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useApplicationStore();
  const [open, setOpen] = useState(false);
  const selectRef = useRef<RefSelectProps>(null);

  const handleThemeChange = (value: ThemeType) => {
    console.log("e", value);
    setTheme(value);
    setOpen(false); // Close the dropdown after selection
  };

  const handleFocus = () => {
    setOpen(true); // Open the dropdown on focus
  };

  const themeOptions = [
    { value: "blue", label: "Xanh dương", color: "#12448a" },
    { value: "green", label: "Xanh lá", color: "#4fb1a1" },
    { value: "red", label: "Đỏ", color: "#cb6453" },
    { value: "orange", label: "Cam", color: "#d38049" },
  ];

  return (
    <div className="flex items-center gap-2 mr-4">
      <label className="cursor-pointer" htmlFor="theme-select" onClick={() => selectRef.current?.focus()}>
        Chọn màu chủ đề:
      </label>
      <Select
        id="theme-select"
        className="theme-select"
        ref={selectRef}
        defaultValue={theme}
        style={{ width: 150 }}
        onChange={handleThemeChange}
        onFocus={handleFocus}
        open={open}
        onBlur={() => setOpen(false)}
        options={themeOptions.map((option) => ({
          ...option,
          label: (
            <div className={`theme-option-${option.value} flex items-center gap-2`}>
              <div
                className="w-[20px] h-[20px] rounded-full"
                style={{
                  background: `${option.color}`,
                }}
              ></div>
              <span className="color-circle"> {option.label}</span>
            </div>
          ),
        }))}
      />
    </div>
  );
}
