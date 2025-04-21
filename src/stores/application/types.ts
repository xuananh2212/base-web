export type ThemeType = "blue" | "green" | "red" | "orange";

export interface ModalBaseProps<> {
  onClose?: () => void;
  loading?: boolean;
  onSubmit?: (...args: any) => Promise<any> | any;
}

export interface ModalInstance<T = any> {
  Component: React.ComponentType<T>;
  props: T;
  id: string;
}

export type ApplicationStore = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isDisabledKeyboardShortcut: boolean;
  setIsDisabledKeyboardShortcut: (isDisabledKeyboardShortcut: boolean) => void;
  openSidebar: boolean;
  setOpenSidebar: (openSidebar: boolean) => void;
  modals: ModalInstance[];
  setModals: (modals: ModalInstance[]) => void;
};
