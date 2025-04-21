"use client";

import LoadingOverLay from "@/components/loading-overlay/LoadingOverlay";
import { LOCALE_STORAGE_KEYS } from "@/helpers/common.constant";
import useApplicationStore from "@/stores/application/application.store";
import { ConfigProvider, ThemeConfig } from "antd";
import { merge } from "antd/es/theme/util/statistic";
import viVN from "antd/lib/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";

dayjs.locale("vi");

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { theme, setTheme } = useApplicationStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let savedTheme = window.localStorage.getItem(LOCALE_STORAGE_KEYS.THEME) || "green";
    if (savedTheme === "dark") {
      savedTheme = "blue";
    }
    setTheme(savedTheme as any);
    setLoading(false);
  }, [setTheme]);

  const themeConfig = useMemo<ThemeConfig>(() => {
    const partialTheme: Partial<ThemeConfig> = {
      token: {
        colorError: "#f65757",
        colorSuccess: "#00c65b",
        colorWarning: "#ff9443",
        colorInfo: "#45C8F1",
      },
      components: {
        Typography: {
          lineHeight: 1.5,
          lineHeightHeading1: 1.5,
          lineHeightHeading2: 1.5,
          lineHeightHeading3: 1.5,
          lineHeightHeading4: 1.5,
          lineHeightHeading5: 1.5,
          titleMarginBottom: 0,
          titleMarginTop: 0,
        },
        Form: {
          verticalLabelPadding: "0 0 0.125rem 0",
          labelFontSize: 14,
          labelColor: "#4B5563",
          itemMarginBottom: 0,
        },
        TreeSelect: {},
        Tabs: {
          margin: 0,
        },
      },
      hashed: true,
    };

    switch (theme) {
      case "blue":
        return merge(partialTheme, {
          token: {
            colorPrimary: "#12448a",
          },
        });
      case "orange":
        return merge(partialTheme, {
          token: {
            colorPrimary: "#e88d50",
          },
        });
      case "red":
        return merge(partialTheme, {
          token: {
            colorPrimary: "#df6e5b",
          },
        });
      default:
        return merge(partialTheme, {
          token: {
            colorPrimary: "#4fb1a1",
          },
        });
    }
  }, [theme]);

  if (loading) {
    return <LoadingOverLay />;
  }

  return (
    <ConfigProvider
      locale={viVN}
      input={{ className: "input-style" }}
      datePicker={{ className: "date-picker-style" }}
      form={{ className: "form-style" }}
      theme={themeConfig}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
