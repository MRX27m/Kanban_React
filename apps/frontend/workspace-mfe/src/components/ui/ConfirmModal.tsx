import { FC } from "react";
import { createPortal } from "react-dom";

type ConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="modal confirm-modal">
      <div className="modal-overlay" onClick={onCancel} />
      <div className="modal-content confirm-content">
        <p>Ви впевнені, що хочете закрити?</p>
        <div className="confirm-buttons">
          <button className="confirm-yes" onClick={onConfirm}>
            Так
          </button>
          <button className="confirm-no" onClick={onCancel}>
            Ні
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
