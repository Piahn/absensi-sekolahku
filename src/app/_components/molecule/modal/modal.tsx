import React from "react";
import ModalIcon from "../../atoms";

interface ModalProps {
  title: string;
  content: string;
  type: "success" | "error" | "warning";
  isOpen: boolean;
  buttonText1?: string;
  buttonType1?: "primary" | "secondary";
  buttonText2?: string;
  buttonType2?: "primary" | "secondary";
  onConfirm?: () => void;
  onClose?: () => void;
}

function Modal(props: Readonly<ModalProps>) {
  const {
    title,
    content,
    type,
    isOpen,
    buttonText1,
    buttonType1,
    buttonText2,
    buttonType2,
    onClose,
    onConfirm,
  } = props;

  return (
    <div
      className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen z-50"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="w-screen h-screen fixed top-0 left-0 bg-duniakoding-primary opacity-70 z-40 flex items-center justify-center"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 flex flex-col items-center z-50">
        <ModalIcon type={type} />
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-4 text-disable text-center font-normal">{content}</p>
        <div className="flex justify-end space-x-2 mt-4">
          {buttonText1 && (
            <button
              className={`px-4 py-2 rounded-2xl min-w-24 ${
                buttonType1 === "primary"
                  ? "bg-error text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={onConfirm}
            >
              {buttonText1}
            </button>
          )}
          {buttonText2 && (
            <button
              className={`px-4 py-2 rounded-2xl min-w-24 ${
                buttonType2 === "primary"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={onClose}
            >
              {buttonText2}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
