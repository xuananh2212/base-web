"use client";

import { LOCALE_STORAGE_KEYS } from "@/helpers/common.constant";
import { create } from "zustand";
import { ApplicationStore, ModalInstance, ThemeType } from "./types";

export const changeThemeDocument = (theme: ThemeType) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LOCALE_STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("style", `color-scheme: ${theme}`);
  }
};

const useApplicationStore = create<ApplicationStore>((set) => {
  let savedTheme: any =
    typeof window !== "undefined" ? window.localStorage.getItem(LOCALE_STORAGE_KEYS.THEME) || "green" : "green";
  if (savedTheme === "dark") {
    savedTheme = "blue";
  }

  return {
    theme: savedTheme,
    setTheme: (theme: ThemeType) => {
      changeThemeDocument(theme);
      set({ theme });
    },
    isDisabledKeyboardShortcut: false,
    setIsDisabledKeyboardShortcut: (isDisabledKeyboardShortcut: boolean) => set({ isDisabledKeyboardShortcut }),
    openSidebar: true,
    setOpenSidebar: (openSidebar: boolean) => set({ openSidebar }),
    modals: [],
    setModals: (modals: ModalInstance[]) => set({ modals }),
  };
});

export default useApplicationStore;
