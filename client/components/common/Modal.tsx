import { ModalProps } from "@/lib/hooks/useModal";
import React, { PropsWithChildren } from "react";

interface ModalComponentProps extends PropsWithChildren<ModalProps> {}

function Modal({ children, close, visible }: ModalComponentProps) {
  if (!visible) return null;

  return (
    <div
      className="w-full h-screen bg-black/35 fixed top-0 left-0 flex justify-center items-center"
      onClick={close}
    >
      <div
        className="bg-white p-4 rounded-md w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
