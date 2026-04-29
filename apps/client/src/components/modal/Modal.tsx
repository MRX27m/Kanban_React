import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./style/style.css";
import { ConfirmModal } from "./ConfirmModal";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="modal">
        <div className="modal-overlay" onClick={() => setIsConfirmOpen(true)} />
        <div className="modal-content">
          <button
            className="close-button"
            type="button"
            onClick={() => setIsConfirmOpen(true)}
          >
            X
          </button>
          {children}
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          onClose();
        }}
      />
    </>,
    document.body,
  );
};
