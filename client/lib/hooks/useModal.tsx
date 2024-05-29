import { useState } from "react";

export interface ModalProps {
  visible: boolean;
  close: () => void;
  open: () => void;
}

const useModal = (): ModalProps => {
  const [visible, setVisible] = useState(false);

  const close = () => setVisible(false);

  const open = () => setVisible(true);

  return {
    visible,
    close,
    open,
  };
};

export default useModal;
