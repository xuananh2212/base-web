import ConfirmModal from "@/app/(private)/components/confirm-modal/ConfirmModal";
import { ModalBaseProps } from "@/stores/application";
import useApplicationStore from "@/stores/application/application.store";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import ModalWrapper from "./components/modal-wrapper";

const ModalProvider = () => {
  const { modals } = useApplicationStore();
  return (
    <>
      {modals.map((modalInstance) => (
        <ModalWrapper key={modalInstance.id} modalInstance={modalInstance} />
      ))}
    </>
  );
};
export const openModal = <P extends ModalBaseProps>(Component: React.ComponentType<P>, props: P) => {
  const { modals, setModals } = useApplicationStore.getState();
  setModals([...modals, { Component, props, id: uuidv4() }]);
};
export const openConfirmDeleteModal = (onSubmit: ModalBaseProps["onSubmit"], loading?: boolean) => {
  const { setIsDisabledKeyboardShortcut } = useApplicationStore.getState();
  setIsDisabledKeyboardShortcut(true);
  openModal(ConfirmModal, {
    title: "Bạn có chắc chắn muốn xóa dữ liệu này?",
    description: "Hành động này sẽ không thể hoàn tác.",
    confirmLabel: "Xóa",
    onSubmit,
    loading,
    onClose: () => setIsDisabledKeyboardShortcut(false),
  });
};

export default React.memo(ModalProvider);
