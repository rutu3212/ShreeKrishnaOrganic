import React from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";

const ConfirmDialog = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  danger = true,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#29321F]/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-[#E6E1D8] shadow-[0_20px_60px_rgba(40,50,30,0.18)] overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-[#777568] hover:bg-[#F1EFE5] hover:text-[#29321F] transition"
          aria-label="Close"
        >
          <X size={19} />
        </button>

        {/* Content */}
        <div className="p-6 sm:p-7">
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
              danger ? "bg-[#FAE9E4]" : "bg-[#E4EBD9]"
            }`}
          >
            {danger ? (
              <Trash2
                size={25}
                className="text-[#A6533D]"
                strokeWidth={1.8}
              />
            ) : (
              <AlertTriangle
                size={25}
                className="text-[#56663D]"
                strokeWidth={1.8}
              />
            )}
          </div>

          {/* Title */}
          <h2
            id="confirm-dialog-title"
            className="text-xl font-semibold text-[#29321F]"
          >
            {title}
          </h2>

          {/* Message */}
          <p className="mt-2 text-sm leading-6 text-[#777568]">
            {message}
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#DCD8CE] bg-white text-[#55574D] text-sm font-medium hover:bg-[#F5F3EC] transition"
            >
              {cancelText}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl text-white text-sm font-medium transition shadow-sm ${
                danger
                  ? "bg-[#A6533D] hover:bg-[#8F4534]"
                  : "bg-[#56663D] hover:bg-[#465532]"
              }`}
            >
              {danger && <Trash2 size={17} className="inline mr-2" />}
              {confirmText}
            </button>
          </div>
        </div>

        {/* Bottom Accent */}
        <div
          className={`h-1 ${
            danger ? "bg-[#A6533D]" : "bg-[#56663D]"
          }`}
        />
      </div>
    </div>
  );
};

export default ConfirmDialog;

