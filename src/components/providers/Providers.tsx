"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { PropsWithChildren } from "react";
import ModalProvider from "./modal-provider/ModalProvider";
import QueryClientProvider from "./query-client-provider";
import ThemeProvider from "./theme-provider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ProgressBar
        height="2px"
        color="var(--color-300)"
        options={{ showSpinner: true }}
        shallowRouting={false} // Ensure correct usage
      />
      <QueryClientProvider>
        <ThemeProvider>
          <AntdRegistry>
            <ModalProvider />
            {children}
          </AntdRegistry>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;
