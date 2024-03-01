import React, { forwardRef } from "react";

interface ModalInterface {
  title: string;
  message: string;
}

const Modal = forwardRef<HTMLDivElement, ModalInterface>(
  ({ title, message }, ref) => (
    <div
      id="default-modal-container"
      className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50"
    >
      <div
        id="default-modal"
        className="h-[136px] w-[512px] rounded-2xl bg-white p-5 "
        ref={ref}
      >
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="py-4">{message}</p>
      </div>
    </div>
  ),
);

export default Modal;
