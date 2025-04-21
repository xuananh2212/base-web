"use client";

import useApplicationStore from "@/stores/application/application.store";
import { ModalInstance } from "@/stores/application/types";
import { useCallback, useState } from "react";

interface ModalWrapperProps {
  modalInstance: ModalInstance;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ modalInstance }) => {
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    const { modals, setModals } = useApplicationStore.getState();
    modalInstance.props.onClose?.();
    setModals(modals.filter((modal) => modal.id !== modalInstance.id));
  }, []);

  const handleConfirm = useCallback(
    async (...values: any[]) => {
      if (modalInstance.props.onSubmit) {
        setLoading(true);
        try {
          await modalInstance.props.onSubmit(...values);
        } catch (e) {
          throw e;
        } finally {
          handleClose();
        }
      } else {
        handleClose();
      }
    },
    [handleClose]
  );

  return (
    <modalInstance.Component
      {...modalInstance.props}
      loading={loading}
      onClose={handleClose}
      onSubmit={handleConfirm}
    />
  );
};
export default ModalWrapper;
